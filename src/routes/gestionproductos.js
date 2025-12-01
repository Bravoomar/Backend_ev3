import express from "express"; // esto importa express para crear un router de rutas
import { verificarToken, verificarAdmin } from "../middleware/auth.js"; // Importa los middlewares de autenticación y autorización

const router = express.Router(); // esto crea el router de gestión de productos

// esto almacena los productos en memoria (en producción usarías una base de datos)
const productosData = [
  { codigo: "PROD001", nombre: "Cpu Ryzen 5 5600g", descripcion: "Procesador AMD Ryzen 5 5600G", precio: 109990, stock: 10, categoria: "hardware", imagen: "/img/amd-5600g-1.png" },
  { codigo: "PROD002", nombre: "Placa Madre B460M DS3H V2", descripcion: "Placa madre compatible con Intel", precio: 136990, stock: 5, categoria: "hardware", imagen: "/img/img.webp" },
  { codigo: "PROD003", nombre: "Tarjeta de video NVIDIA GeForce RTX 5090", descripcion: "Tarjeta gráfica de alta gama", precio: 89990, stock: 3, categoria: "hardware", imagen: "/img/img1.webp" }
];

// ==========================================
// 🔒 RUTAS PRIVADAS (Administración de Inventario)
// IE3.3.3: SOLO Administrador puede ACCEDER A TODO EL CRUD.
// ==========================================

// 1. Middleware de Autenticación: Verifica que el JWT sea válido.
router.use(verificarToken);

// 2. Middleware de Autorización: Verifica que el rol sea 'administrador'
router.use(verificarAdmin);


// esto define el endpoint GET /gestionproductos para listar todos los productos
router.get("/", (req, res) => {
  res.json(productosData); // esto responde con la lista de productos
});

// esto define el endpoint GET /gestionproductos/:codigo para obtener un producto por código
router.get("/:codigo", (req, res) => {
  const { codigo } = req.params; // esto extrae el código de los parámetros
  const producto = productosData.find(p => p.codigo === codigo); // esto busca el producto

  if (!producto) {
    // esto retorna error si no se encuentra el producto
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto); // esto responde con el producto encontrado
});

// esto define el endpoint POST /gestionproductos para crear un nuevo producto
router.post("/", (req, res) => {
  const { codigo, nombre, descripcion, precio, stock, categoria, imagen } = req.body; // esto extrae los datos del body

  // esto valida que los campos requeridos estén presentes
  if (!codigo || !nombre || precio === undefined || stock === undefined || !categoria) {
    return res.status(400).json({ error: "Código, nombre, precio, stock y categoría son requeridos" });
  }

  // esto valida que el código tenga al menos 3 caracteres
  if (codigo.length < 3) {
    return res.status(400).json({ error: "El código debe tener al menos 3 caracteres" });
  }

  // esto verifica si el código ya existe
  const productoExistente = productosData.find(p => p.codigo === codigo);
  if (productoExistente) {
    return res.status(400).json({ error: "El código de producto ya está registrado" });
  }

  // esto valida que precio y stock sean números positivos
  if (precio < 0 || stock < 0) {
    return res.status(400).json({ error: "El precio y stock deben ser números positivos" });
  }

  // esto crea el nuevo producto
  const nuevoProducto = { 
    codigo, 
    nombre, 
    descripcion: descripcion || "", 
    precio: Number(precio), 
    stock: Number(stock), 
    categoria, 
    imagen: imagen || "" 
  };
  productosData.push(nuevoProducto); // esto agrega el producto a la lista

  res.status(201).json({ message: "Producto creado exitosamente", producto: nuevoProducto });
});

// esto define el endpoint PUT /gestionproductos/:codigo para actualizar un producto
router.put("/:codigo", (req, res) => {
  const { codigo } = req.params; // esto extrae el código de los parámetros
  const { nombre, descripcion, precio, stock, categoria, imagen } = req.body; // esto extrae los datos del body

  // esto busca el índice del producto
  const productoIndex = productosData.findIndex(p => p.codigo === codigo);

  if (productoIndex === -1) {
    // esto retorna error si no se encuentra el producto
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  // esto valida que precio y stock sean números positivos si se proporcionan
  if (precio !== undefined && precio < 0) {
    return res.status(400).json({ error: "El precio debe ser un número positivo" });
  }
  if (stock !== undefined && stock < 0) {
    return res.status(400).json({ error: "El stock debe ser un número positivo" });
  }

  // esto actualiza los datos del producto (mantiene el código original)
  productosData[productoIndex] = {
    ...productosData[productoIndex],
    nombre: nombre || productosData[productoIndex].nombre,
    descripcion: descripcion !== undefined ? descripcion : productosData[productoIndex].descripcion,
    precio: precio !== undefined ? Number(precio) : productosData[productoIndex].precio,
    stock: stock !== undefined ? Number(stock) : productosData[productoIndex].stock,
    categoria: categoria || productosData[productoIndex].categoria,
    imagen: imagen !== undefined ? imagen : productosData[productoIndex].imagen
  };

  res.json({ message: "Producto actualizado exitosamente", producto: productosData[productoIndex] });
});

// esto define el endpoint DELETE /gestionproductos/:codigo para eliminar un producto
router.delete("/:codigo", (req, res) => {
  const { codigo } = req.params; // esto extrae el código de los parámetros

  // esto busca el índice del producto
  const productoIndex = productosData.findIndex(p => p.codigo === codigo);

  if (productoIndex === -1) {
    // esto retorna error si no se encuentra el producto
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  // esto elimina el producto de la lista
  productosData.splice(productoIndex, 1);

  res.json({ message: "Producto eliminado exitosamente" });
});

export default router; // esto exporta el router para usarlo en index.js