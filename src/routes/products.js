import express from "express"; // esto importa express para crear un router de rutas

const router = express.Router(); // esto crea el router de usuarios

const productosData = [
  { id: 1, nombre: "Cpu Ryzen 5 5600g", precio: 109990, imagen: "/img/amd-5600g-1.png" },
  { id: 2, nombre: "Placa Madre B460M DS3H V2", precio: 136990, imagen: "/img/img.webp" },
  { id: 3, nombre: "Tarjeta de video NVIDIA GeForce RTX 5090", precio: 89990, imagen: "/img/img1.webp" },
  { id: 4, nombre: "PC Gamer V6 AMD Ryzen 5 5500", precio: 119990, imagen: "/img/IMG2.webp" },
  { id: 5, nombre: "Kingston Memoria RAM FURY Beast DDR5", precio: 19990, imagen: "/img/imagen1.webp" },
  { id: 6, nombre: "Procesador Intel Core Ultra 5 245KF", precio: 319990, imagen: "/img/imagen2.webp" },
  { id: 7, nombre: "Ventilador Gabinete PC Kronos Eurus, ARGB, 120mm, PWM, Black", precio: 19990, imagen: "/img/imagen3.webp" },
  { id: 8, nombre: "Fuente de Poder Corsair RM1000e", precio: 219990, imagen: "/img/imagen4.webp" },
  { id: 9, nombre: "Placa Madre M-atx X99", precio: 49990, imagen: "/img/shopping2.webp" },
  { id: 10, nombre: "Disipador para CPU", precio: 14990, imagen: "/img/shoppin.webp" },
  { id: 11, nombre: "Placa Madre E-atx", precio: 20000, imagen: "/img/shoppi.webp" },
  { id: 12, nombre: "Combo Setup Gamer: PC Warrior 3050, Monitor, Silla gamer, Alfombra, y periférico", precio: 499990, imagen: "/img/sh.webp" },
];

router.get("/", (req, res) => { // esto define el endpoint GET /users
  res.json(productosData); // esto responde un JSON de texto
});

router.post("/", (req, res) => {
    const dataProducto = req.body;
    productosData.push(dataProducto);
    res.json("Producto agregado")
})

export default router; // esto exporta el router para usarlo en index.js


