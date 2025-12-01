import express from "express";
import { userService } from '../services/userService.js';

const router = express.Router();

// GET /users - lista todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await userService.getAllUsers();
        const usuariosSeguros = usuarios.map(u => {
            const { passwordHash, ...rest } = u.dataValues;
            return rest;
        });
        res.json(usuariosSeguros);
    } catch (e) {
        res.status(500).json({ error: "Error interno del servidor al obtener usuarios." });
    }
});

// GET /users/:id - obtiene usuario por id
router.get("/:id", async (req, res) => {
    try {
        const usuario = await userService.getUserById(req.params.id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        const { passwordHash, ...usuarioSeguro } = usuario.dataValues;
        res.json(usuarioSeguro);
    } catch (e) {
        res.status(500).json({ error: "Error al buscar usuario." });
    }
});

// POST /users - crear usuario
router.post("/", async (req, res) => {
    try {
        const nuevoUsuario = await userService.createUser(req.body);
        const { passwordHash, ...usuarioSeguro } = nuevoUsuario.dataValues;
        res.status(201).json(usuarioSeguro);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// PUT /users/:id - actualizar usuario
router.put("/:id", async (req, res) => {
    try {
        const usuarioActualizado = await userService.updateUser(req.params.id, req.body);
        if (!usuarioActualizado) return res.status(404).json({ error: "Usuario no encontrado" });
        const { passwordHash, ...usuarioSeguro } = usuarioActualizado.dataValues;
        res.json(usuarioSeguro);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// DELETE /users/:id - eliminar usuario
router.delete("/:id", async (req, res) => {
    try {
        const eliminado = await userService.deleteUser(req.params.id);
        if (!eliminado) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado exitosamente" });
    } catch (e) {
        res.status(500).json({ error: "Error al eliminar usuario." });
    }
});

export default router;
