import { useState, useCallback } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { Navbar } from "@/components/Navbar";
import { LoginModal } from "@/components/LoginModal";
import { PostAdModal } from "@/components/PostAdModal";
import { ChatBot } from "@/components/ChatBot";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import MapPage from "@/pages/MapPage";
import Community from "@/pages/Community";
import Emergency from "@/pages/Emergency";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

import { LanguageProvider } from "@/lib/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

function AppContent() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPostAdModal, setShowPostAdModal] = useState(false);
  const [pendingPostAd, setPendingPostAd] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { isAuthenticated } = useAuth();

  const handlePostAdClick = () => {
    if (isAuthenticated) {
      setShowPostAdModal(true);
    } else {
      setPendingPostAd(true);
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    if (pendingPostAd) {
      setPendingPostAd(false);
      setShowPostAdModal(true);
    }
  };

  const handlePostAdSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar onPostAdClick={handlePostAdClick} />
      
      <main className="flex-grow pt-16">
        <Switch>
          <Route path="/" component={() => <Home key={refreshKey} />} />
          <Route path="/map" component={MapPage} />
          <Route path="/community" component={Community} />
          <Route path="/emergency" component={Emergency} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <ChatBot />
      <Footer />

      <LoginModal
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingPostAd(false);
        }}
        onSuccess={handleLoginSuccess}
      />

      <PostAdModal
        open={showPostAdModal}
        onClose={() => setShowPostAdModal(false)}
        onSuccess={handlePostAdSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <LanguageSelector />
            <AppContent />
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
