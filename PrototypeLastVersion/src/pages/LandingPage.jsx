import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsernameInput from '../components/UsernameInput';

function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Credenciales de prueba
  const VALID_USER = "Diana";
  const VALID_PASS = "miau123";

  const handleEnter = () => {
    if (username === VALID_USER && password === VALID_PASS) {
      localStorage.setItem('username', username);
      navigate('/room');
    } else {
      alert("Credenciales incorrectas. Intenta de nuevo :c");
    }
  };

  return (
   /* <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', backgroundColor: 'black',
      color: 'white', textAlign: 'center'
    }}>*/
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center', 
      height: '100vh', 
      width: '100vw', // Aseguramos el ancho completo
      
      // --- CONFIGURACIÓN DEL FONDO ---
      backgroundImage: 'url("/FondoLogin.png")', // Ruta a la carpeta public
      backgroundSize: 'cover',     // La imagen cubre todo el espacio
      backgroundPosition: 'center', // Centra la imagen
      backgroundRepeat: 'no-repeat',
      // -------------------------------
      
      color: 'white', 
      textAlign: 'center'
    }}>



      <UsernameInput 
        label="Usuario"
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />

  
      <UsernameInput 
        label="Contraseña"
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      
      <button
        onClick={handleEnter}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          border: '2px solid white',
          backgroundColor: 'black',
          color: 'white',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}
      >
        Iniciar Sesión
      </button>
    </div>
  );
}

export default LandingPage;