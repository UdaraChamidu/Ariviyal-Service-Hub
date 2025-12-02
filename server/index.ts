import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Export the app for Vercel
export default app;

// Initialize routes
(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
  }

  // Only listen if run directly (not imported)
  // In Vercel, this file is imported, so we don't listen here.
  // We check if we are in a production environment and NOT in Vercel (or just check if port is set and we are main)
  // A simple check is to see if we are running via 'npm run dev' or 'npm start' vs being imported.
  // However, for Vercel, we can just rely on the fact that Vercel imports it.
  
  // But wait, esbuild bundles this.
  // If we run `node dist/index.cjs`, we want it to listen.
  // If Vercel imports it, we want it to NOT listen?
  // Actually, Vercel will import `api/index.ts` which imports this.
  
  // Let's just check an env var or simply always listen IF we are the main module?
  // In ESM/TS, checking main is hard.
  
  // Alternative: Just listen. Vercel serverless functions usually don't fail if you listen, 
  // but it's better to export the handler.
  
  const port = parseInt(process.env.PORT || "3000", 10);
  // Only start server if not running in Vercel (Vercel sets VERCEL=1)
  if (process.env.VERCEL !== "1") {
      httpServer.listen(port, () => {
        log(`serving on port ${port}`);
      });
  }
})();
