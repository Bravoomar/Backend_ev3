// src/pages/Nosotros.jsx
import React from 'react';

const Nosotros = () => {
  return (
    <main className="container">
      <h1>Nosotros</h1>
      
      {/* SOBRE LA TIENDA */}
      <section className="about-us">
        <p>
          Bienvenido a PC STORE, tu tienda de confianza en componentes y equipos de alto rendimiento.
          Nos apasiona la tecnología y nos dedicamos a ofrecer productos de calidad a nuestros clientes.
        </p>
        
        <p>
          Nuestro equipo está conformado por expertos en hardware y software, siempre listos para asesorarte
          y ayudarte a encontrar la mejor solución para tu PC, ya sea para gaming, trabajo o estudio.
        </p>

        <p>
          En PC STORE nos esforzamos por brindar un servicio personalizado, garantizando satisfacción,
          confiabilidad y una experiencia de compra segura.
        </p>
      </section>

      {/* NUESTRO EQUIPO */}
      <section className="our-team">
        <h2>Nuestro Equipo</h2>
        <div className="team-grid">
          {/* Miembro del equipo */}
          <div className="team-member">
            <img src="img/momoingeniero.jpg" alt="Juan Pérez" />
            <h3>Juan Pérez</h3>
            <p>Fundador & Especialista en Hardware</p>
          </div>
          <div className="team-member">
            <img src="img/nayita.avif" alt="María López" />
            <h3>María López</h3>
            <p>Gerente de Ventas & Especialista en Marketing</p>
          </div>
          {/* Puedes añadir más miembros aquí */}
        </div>
      </section>
    </main>
  );
};

export default Nosotros;
