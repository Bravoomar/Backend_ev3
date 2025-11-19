import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate(); // Para redirigir
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
    tyc: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones simples
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.password2 ||
      !formData.tyc
    ) {
      alert("Por favor completa todos los campos y acepta los términos.");
      return;
    }

    if (formData.password !== formData.password2) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (formData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Cuenta creada correctamente
    alert("Cuenta creada exitosamente!");
    console.log("Datos del formulario:", formData);

    // Redirigir a inicio
    navigate("/"); // "/" es la ruta de Inicio
  };

  return (
    <main className="container">
      <section className="form-wrap">
        <h2>Crea tu cuenta</h2>
        <form id="form-registro" noValidate autoComplete="on" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Daniela Pérez"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="password2">Repite la contraseña</label>
            <input
              id="password2"
              name="password2"
              type="password"
              value={formData.password2}
              onChange={handleChange}
            />
          </div>

          <div className="field checkbox">
            <input
              id="tyc"
              name="tyc"
              type="checkbox"
              checked={formData.tyc}
              onChange={handleChange}
            />
            <label htmlFor="tyc">Acepto Términos y Condiciones</label>
          </div>

          <button type="submit">Crear cuenta</button>
        </form>
      </section>
    </main>
  );
};

export default Registro;
