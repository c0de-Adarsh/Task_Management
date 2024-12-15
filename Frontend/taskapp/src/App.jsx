import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Dashboard';
import Analytics from './Components/Analytics/Analytics';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));  // Track token in state

  // Check for token presence on component mount and update state
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);  // Update token state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);  // Update state to reflect logout
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!token ? <Signup setToken={setToken} /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard handleLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
