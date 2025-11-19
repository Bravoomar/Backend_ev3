import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email suscrito:", email);
    alert("Gracias por suscribirte!");
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Redes Sociales */}
        <div>
          <h4>Redes Sociales</h4>
          <a href="#">Instagram</a><br />
          <a href="#">Facebook</a><br />
          <a href="#">Tik Tok</a>
        </div>

        {/* Newsletter */}
        <div>
          <h4>Newsletter</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Suscribirse</button>
          </form>
        </div>

        {/* Copyright */}
        <div>
          <p>&copy; 2025 PCSTORE. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
