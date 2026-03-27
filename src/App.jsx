import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DailyLearning from './pages/DailyLearning';
import InterviewMode from './pages/InterviewMode';
import AskDoubt from './pages/AskDoubt';
import Profile from './pages/Profile';
import Login from './pages/Login';

// Mock Authentication Guard component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('devguide_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Inner layout — simplified to treat the Login page as a slide-in drawer
function AppLayout({ isAuthenticated }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {/* Navbar is always visible now to maintain context */}
      <Navbar isAuthenticated={isAuthenticated} />

      <main className="page-content">
        {/* The main content always renders in the background */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname === '/login' ? 'login' : 'main'}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learning" element={<DailyLearning />} />
            <Route path="/interview" element={<ProtectedRoute><InterviewMode /></ProtectedRoute>} />
            <Route path="/ask-doubt" element={<ProtectedRoute><AskDoubt /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* If we are at /login, we still want to show the Dashboard in the background */}
            <Route path="/login" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* The Login drawer appears as an overlay when the path is /login */}
      <AnimatePresence>
        {isLoginPage && (
          <Login />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('devguide_auth') === 'true'
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(localStorage.getItem('devguide_auth') === 'true');
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(() => {
      const isAuth = localStorage.getItem('devguide_auth') === 'true';
      if (isAuth !== isAuthenticated) setIsAuthenticated(isAuth);
    }, 500);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  return (
    <Router>
      <AppLayout isAuthenticated={isAuthenticated} />
    </Router>
  );
}

export default App;
