import express from "express";
import { verificarToken, verificarAdmin } from "../middleware/auth.js";
import { userService } from "../services/userService.js";

const router = express.Router();

router.use(verificarToken);
router.use(verificarAdmin);

// GET /gestionusuario → todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await userService.getAllUsers();
    const usuariosSeguros = usuarios.map(u => {
      const { passwordHash, ...rest } = u.dataValues;
      return rest;
    });
    res.json(usuariosSeguros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// GET /gestionusuario/:id → usuario específico
router.get("/:id", async (req, res) => {
  try {
    const usuario = await userService.getAllUsers().then(users => users.find(u => u.id == req.params.id));
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    const { passwordHash, ...usuarioSeguro } = usuario.dataValues;
    res.json(usuarioSeguro);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// PUT /gestionusuario/:id → actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const usuario = await userService.updateUser(req.params.id, req.body);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    const { passwordHash, ...usuarioSeguro } = usuario.dataValues;
    res.json({ message: "Usuario actualizado", usuario: usuarioSeguro });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /gestionusuario/:id → eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await userService.deleteUser(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
