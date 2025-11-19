import React from 'react';
import { useNavigate } from 'react-router-dom';

const Administrador = () => {
  const navigate = useNavigate();

  return (
    <main style={{ 
      textAlign: 'center', 
      padding: '50px 20px', 
      minHeight: 'calc(100vh - 160px)' /* Ajusta esto según la altura de tu Header/Footer */
    }}>
      <h2 style={{ fontSize: '2.5rem', color: '#333' }}>Selecciona qué gestionar</h2>
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <button
          // Corregido: La ruta ahora es '/gestion-usuario' (singular)
          onClick={() => navigate('/gestion-usuario')}
          style={{ 
            padding: '20px 40px', 
            backgroundColor: '#007BFF', 
            color: 'white', 
            borderRadius: '8px', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Gestionar Usuarios
        </button>
        <button
          // Corregido: La ruta ahora es '/gestion-producto' (singular)
          onClick={() => navigate('/gestion-producto')}
          style={{ 
            padding: '20px 40px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            borderRadius: '8px', 
            border: 'none', 
            fontSize: '1.2rem', 
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Gestionar Productos
        </button>
      </div>
    </main>
  );
};

export default Administrador;



