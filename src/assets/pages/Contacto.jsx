// src/pages/Contacto.jsx
import React from 'react';

const Contacto = () => {
  return (
    <main className="container contact-page">
      {/* HERO CONTACTO */}
      <section className="contact-hero">
        <h2>Contacto y Ayuda</h2>
        <p>Estamos aquí para responder tus dudas y consultas.</p>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="faq">
        <h3>Preguntas Frecuentes</h3>
        <ul>
          <li>
            <strong>Horario Atención:</strong> Lunes - Viernes 10:00 a 19:00hrs, Sábado 10:00 a 17:00hrs, Colación 14:30 - 15:30hrs
          </li>
          <li>
            <strong>¿Cuáles son los tiempos de espera y despacho?</strong> 4 a 10 días hábiles una vez completada la compra, luego fase de testeo de 72h, envío pagado por parte de PC STORE.
          </li>
          <li><strong>¿Cómo funciona el sistema de órdenes para las Build?</strong></li>
          <li><strong>¿Cuáles son los medios de pago?</strong></li>
          <li><strong>¿Cómo funciona el sistema de reembolso?</strong></li>
          <li><strong>¿Cuál es la cuenta bancaria para realizar el pago?</strong></li>
          <li><strong>¿Cuánto es el tiempo de espera para la devolución?</strong></li>
          <li><strong>¿Obtengo boleta o factura de forma inmediata?</strong></li>
          <li><strong>¿Cuáles son los beneficios de comprar con PC STORE?</strong></li>
          <li><strong>¿Cuáles son los métodos de entrega disponibles?</strong></li>
        </ul>
      </section>

      {/* FORMULARIO DE CONTACTO */}
      <section className="form-wrap">
        <h3>Envía tus dudas</h3>
        <form id="contact-form">
          <div className="field">
            <label htmlFor="name">Nombre Completo:</label>
            <input type="text" id="name" name="name" placeholder="Tu nombre" required />
          </div>

          <div className="field">
            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" placeholder="Tu correo" required />
          </div>

          <div className="field">
            <label htmlFor="subject">Asunto:</label>
            <input type="text" id="subject" name="subject" placeholder="Motivo de tu consulta" required />
          </div>

          <div className="field">
            <label htmlFor="message">Mensaje:</label>
            <textarea id="message" name="message" placeholder="Escribe tu consulta aquí..." required></textarea>
          </div>

          <button type="submit">Enviar Mensaje</button>
        </form>
      </section>
    </main>
  );
};

export default Contacto;
