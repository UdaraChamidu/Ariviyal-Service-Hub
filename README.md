# Ariviyal Service Hub

Ariviyal Service Hub is a full-stack web application designed to connect users with various services and community resources. It features a modern, responsive frontend built with React and a robust backend powered by NestJS.

## 🚀 Features

- **User Authentication**: Secure login and registration system.
- **Service Ads**: Users can post and browse advertisements for services like Boarding, Food, Transport, and more.
- **Community**: A space for users to share posts, comments, and interact with the community.
- **Emergency Services**: Dedicated section for emergency contacts and information.
- **Interactive Map**: specific map-based features for locating services (implied).
- **ChatBot**: Integrated chatbot for user assistance.
- **Responsive Design**: Built with Tailwind CSS and Shadcn UI for a seamless experience across devices.
- **Multi-language Support**: Integrated language selection.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Routing**: [wouter](https://github.com/molefrog/wouter)
- **Forms**: React Hook Form + Zod

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: Passport.js + JWT

## 📂 Project Structure

```
Ariviyal-Service-Hub/
├── backend/            # NestJS backend application
│   ├── src/            # Source code
│   ├── prisma/         # Database schema and migrations
│   └── ...
├── frontend/           # React frontend application
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   └── ...
└── README.md           # Project documentation
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Ariviyal-Service-Hub
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Environment Variables:
   Create a `.env` file in the `backend` root and configure your database URL:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   JWT_SECRET="your-super-secret-key"
   ```
4. Run Database Migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the Backend Server:
   ```bash
   npm run start:dev
   ```
   The backend runs on `http://localhost:3000` (default NestJS port).

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Development Server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` (default Vite port).

## 📜 Scripts

### Frontend
- `npm run dev`: Start the development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build.
- `npm run check`: Run TypeScript type checking.

### Backend
- `npm run start`: Start the application.
- `npm run start:dev`: Start in watch mode.
- `npm run build`: Build the application.
- `npm run test`: Run tests.
- `npm run lint`: Lint the code.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
