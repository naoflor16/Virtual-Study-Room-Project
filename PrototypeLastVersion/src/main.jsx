import React from 'react'
import { createRoot } from 'react-dom/client'
//import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <--- Que esto esté apuntando a tu App
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container); // Aquí es donde se usa la función

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);