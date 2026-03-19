import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RoomPage from './pages/RoomPage';

// Esta función verifica si el usuario ya ingresó su nombre
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('username');
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: El Login */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Ruta de la sala: Protegida para que no entren sin nombre */}
        <Route 
          path="/room" 
          element={
            <ProtectedRoute>
              <RoomPage />
            </ProtectedRoute>
          } 
        />

        {/* Si intentan entrar a cualquier otra ruta, los manda al login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;