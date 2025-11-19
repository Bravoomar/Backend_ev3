import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './assets/components/header';
import Footer from './assets/components/Footer';

// Páginas
import Inicio from './assets/pages/Inicio';
import Producto from './assets/pages/Producto';
import Carrito from './assets/pages/Carrito';
import Contacto from './assets/pages/Contacto';
import Nosotros from './assets/pages/Nosotros';
import Registro from './assets/pages/Registro';
import IniciarSesion from './assets/pages/IniciarSesion';
import GestionUsuario from './assets/pages/GestionUsuario';
import GestionProducto from './assets/pages/GestionProducto';
import Administrador from './assets/pages/Administrador';

function App() {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  // Sincronizar carrito con localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <>
      <BrowserRouter>
        <Header carrito={carrito} />
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="producto" element={<Producto carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="registro" element={<Registro />} />
          <Route path="iniciar-sesion" element={<IniciarSesion />} />
          <Route path="gestion-usuario" element={<GestionUsuario />} />
          <Route path="gestion-producto" element={<GestionProducto />} />
          <Route path="administrador" element={<Administrador />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
