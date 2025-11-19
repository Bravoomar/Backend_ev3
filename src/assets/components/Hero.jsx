import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  const navigate = useNavigate();

  const irAProductos = () => {
    navigate('/producto'); // Ruta definida en App.jsx
  };

  return (
    <section
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a PC Store</h1>
        <p className="text-xl mb-6">
          Encuentra los mejores setups y accesorios para tu experiencia gamer
        </p>
        <Button onClick={irAProductos}>
          Explorar Productos
        </Button>
      </div>
    </section>
  );
};

export default Hero;

