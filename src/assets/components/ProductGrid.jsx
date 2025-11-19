// ProductGrid.jsx
import React from 'react';

const ProductGrid = () => {
  const productos = [
    {
      nombre: 'Placa Madre M-atx X99',
      precio: '$49.990',
      img: '/img/ASUS-X99-M-WS-With-Retail-Box.jpg',
      alt: 'Placa Madre M-atx X99',
    },
    {
      nombre: 'Disipador para CPU',
      precio: '$14.990',
      img: '/img/1745951660248-MKIPY1UB65-1-1.webp',
      alt: 'Disipador para CPU',
    },
    {
      nombre: 'Teclado Mecánico RGB',
      precio: '$29.990',
      img: '/img/71FSIp+tDNL._AC_SL1500_.jpg',
      alt: 'Teclado Mecánico RGB',
    },
  ];

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '4rem 2rem',
        backgroundColor: '#fff',
      }}
    >
      {productos.map((producto, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#f9f9f9',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Contenedor de imagen con proporción fija */}
          <div style={{ width: '100%', paddingTop: '75%', position: 'relative', marginBottom: '1rem' }}>
            <img
              src={producto.img}
              alt={producto.alt}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>{producto.nombre}</h3>
          <p style={{ color: '#555' }}>{producto.precio}</p>
        </div>
      ))}
    </section>
  );
};

export default ProductGrid;
