import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

// Hero
const Hero = ({ irAProductos }) => (
  <section
    style={{
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
      backgroundColor: "#f3f4f6",
    }}
  >
    <div style={{ textAlign: "center", maxWidth: "600px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        TIENDA ONLINE PC STORE
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Descubre nuestras mejores ofertas y productos destacados a los mejores precios.
      </p>
      <Button onClick={irAProductos}>Ver productos</Button>
    </div>
    <div style={{ marginBottom: "2rem" }}>
      <img
        src="/img/BANNER-pc_componentes_celular.webp"
        alt="Promocional"
        style={{ borderRadius: "8px", width: "100%", maxWidth: "600px" }}
      />
    </div>
  </section>
);

// Productos Destacados
const ProductGrid = () => {
  const productos = [
    {
      id: 1,
      nombre: "Placa Madre M-atx X99",
      precio: 49990,
      imagen: "/img/shopping2.webp",
    },
    {
      id: 2,
      nombre: "Disipador para CPU",
      precio: 14990,
      imagen: "/img/shoppin.webp",
    },
    {
      id: 3,
      nombre: "Teclado Mecánico RGB",
      precio: 29990,
      imagen: "/img/71FSIp+tDNL._AC_SL1500_.jpg",
    },
  ];

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
        padding: "4rem 2rem",
        backgroundColor: "#fff",
      }}
    >
      {productos.map((producto) => (
        <div
          key={producto.id}
          style={{
            backgroundColor: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
          className="producto-card"
        >
          {/* Contenedor para centrar y mostrar la imagen completa */}
          <div
            style={{
              width: "100%",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
            />
          </div>

          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "0.5rem" }}>
            {producto.nombre}
          </h3>
          <p style={{ color: "#555", marginTop: "0.25rem" }}>
            ${producto.precio.toLocaleString()}
          </p>
        </div>
      ))}
    </section>
  );
};


const Inicio = () => {
  const navigate = useNavigate();

  const irAProductos = () => {
    navigate("/producto");
  };

  return (
    <div>
      <Hero irAProductos={irAProductos} />
      <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginTop: "2rem" }}>
        Productos Destacados
      </h2>
      <ProductGrid />
      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <Button onClick={irAProductos}>Ver todos los productos</Button>
      </div>
    </div>
  );
};

export default Inicio;
