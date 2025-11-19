import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente Button
const Button = ({ onClick, children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'w-full px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105 duration-300 ease-in-out';
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary': return 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-600';
      case 'danger': return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      default: return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
    }
  };
  return (
    <button onClick={onClick} className={`${baseStyles} ${getVariantStyles()} ${className}`} {...props}>
      {children}
    </button>
  );
};

const IniciarSesion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const correo = email.trim();

    if (!correo) return;

    if (correo.endsWith('@duocuc.cl')) {
      navigate('/administrador'); // Redirige a Administrador
    } else {
      navigate('/'); // Redirige al inicio u otra página de usuario
    }
  };

  return (
    <main className="container">
      <section className="form-wrap">
        <h2>Iniciar Sesión</h2>
        <form id="form-login" onSubmit={handleSubmit} autoComplete="on">
          <div className="field">
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Tu contraseña"
            />
          </div>
          
          <Button type="submit">Iniciar sesión</Button>
        </form>
      </section>
    </main>
  );
};

export default IniciarSesion;
