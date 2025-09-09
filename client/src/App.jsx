import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <Navbar />
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Route>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;