import express from "express"; 

const router = express.Router(); 

// 💾 Simulación temporal de datos de productos para el catálogo (Reemplazar con DB)
// Esta data es de solo lectura y debe ser reemplazada con llamadas a un 'productService' que consulte la Base de Datos.
const productosData = [
    { id: 1, nombre: "Cpu Ryzen 5 5600g", precio: 109990, imagen: "/img/amd-5600g-1.png", descripcion: "Procesador de alto rendimiento con gráficos integrados." },
    { id: 2, nombre: "Placa Madre B460M DS3H V2", precio: 136990, imagen: "/img/img.webp", descripcion: "Placa base Micro-ATX ideal para sistemas Intel de décima generación." },
    { id: 3, nombre: "Tarjeta de video NVIDIA GeForce RTX 5090", precio: 89990, imagen: "/img/img1.webp", descripcion: "Tarjeta gráfica de última generación, rendimiento extremo." },
    { id: 4, nombre: "PC Gamer V6 AMD Ryzen 5 5500", precio: 499990, imagen: "/img/IMG2.webp", descripcion: "Sistema de escritorio pre-ensamblado optimizado para gaming." },
    { id: 5, nombre: "Kingston Memoria RAM FURY Beast DDR5", precio: 19990, imagen: "/img/imagen1.webp", descripcion: "Módulo de memoria rápida para juegos y multitarea." },
    { id: 6, nombre: "Procesador Intel Core Ultra 5 245KF", precio: 319990, imagen: "/img/imagen2.webp", descripcion: "Procesador de alta eficiencia y rendimiento para estaciones de trabajo." },
    { id: 7, nombre: "Ventilador Gabinete PC Kronos Eurus", precio: 19990, imagen: "/img/imagen3.webp", descripcion: "Ventilador ARGB de 120mm con control PWM para una refrigeración silenciosa." },
    { id: 8, nombre: "Fuente de Poder Corsair RM1000e", precio: 219990, imagen: "/img/imagen4.webp", descripcion: "Fuente de poder modular de 1000W con certificación 80 PLUS Gold." },
    { id: 9, nombre: "Placa Madre M-atx X99", precio: 49990, imagen: "/img/shopping2.webp", descripcion: "Placa base económica con chipset X99, ideal para proyectos." },
    { id: 10, nombre: "Disipador para CPU", precio: 14990, imagen: "/img/shoppin.webp", descripcion: "Sistema de enfriamiento básico por aire para procesadores." },
    { id: 11, nombre: "Placa Madre E-atx", precio: 20000, imagen: "/img/shoppi.webp", descripcion: "Placa base de formato extendido, ideal para múltiples GPUs o componentes." },
    { id: 12, nombre: "Combo Setup Gamer: PC Warrior 3050", precio: 499990, imagen: "/img/sh.webp", descripcion: "Set completo que incluye PC, monitor, silla y periféricos." },
];
// 🚫 FIN de Simulación

// GET /productos (Ruta pública para el catálogo)
// Este endpoint es de solo lectura y accesible sin JWT.
router.get("/", (req, res) => { 
    res.json(productosData); 
});

// Nota: La funcionalidad POST para agregar productos se ha movido al archivo
// 'gestionproductos.js' donde está protegida con verificación de JWT y rol (Vendedor/Admin).
// Esta es una acción CRUD y no debe ser pública.

export default router;