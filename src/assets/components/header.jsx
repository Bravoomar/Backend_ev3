import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ carrito }) => {
  return (
    <header className="site-header">
      <div className="container header-flex">
        {/* LOGO */}
        <img src="/img/img1.png" alt="Logo de MiTienda" className="logo-img" />
        <h1 className="logo">PC STORE</h1>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="main-nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/producto" end>Productos</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>

        {/* SESIÓN Y CARRITO */}
        <div className="session">
          <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink> | 
          <NavLink to="/registro">Registrar usuario</NavLink>
          <NavLink to="/carrito" className="cart">
            Carrito 🛒 ({carrito.length})
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
