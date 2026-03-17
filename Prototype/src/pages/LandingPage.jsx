import React, { useState } from 'react';
import UsernameInput from '../components/UsernameInput';

function LandingPage() {
  const [username, setUsername] = useState('');

 const handleEnter = () => {
  localStorage.setItem('username', username);
  window.location.href = '/room'; 
};


   return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center'
    }}>
      <h1>Bienvenid@ a Study Room :3</h1>
      <UsernameInput
  value={username}
  onChange={(e) => setUsername(e.target.value)} 
/>


      
      <button
        onClick={handleEnter}
        style={{
          padding: '10px 20px',
          border: '2px solid white',
          backgroundColor: 'black',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Ingresa a la sala
      </button>
    </div>
  );
}

export default LandingPage;



