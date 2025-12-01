import express from "express";
import { verificarToken, verificarAdmin } from "../middleware/auth.js";
import { productService } from "../services/productService.js";

const router = express.Router();

router.use(verificarToken);
router.use(verificarAdmin);

// GET /gestionproductos → todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await productService.getAllProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos." });
  }
});

// GET /gestionproductos/:codigo → producto específico
router.get("/:codigo", async (req, res) => {
  try {
    const producto = await productService.getProductByCode(req.params.codigo);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado." });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto." });
  }
});

// POST /gestionproductos → crear producto
router.post("/", async (req, res) => {
  try {
    const producto = await productService.createProduct(req.body);
    res.status(201).json({ message: "Producto creado", producto });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /gestionproductos/:codigo → actualizar producto
router.put("/:codigo", async (req, res) => {
  try {
    const producto = await productService.updateProduct(req.params.codigo, req.body);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado." });
    res.json({ message: "Producto actualizado", producto });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /gestionproductos/:codigo → eliminar producto
router.delete("/:codigo", async (req, res) => {
  try {
    const eliminado = await productService.deleteProduct(req.params.codigo);
    if (!eliminado) return res.status(404).json({ error: "Producto no encontrado." });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto." });
  }
});

export default router;
