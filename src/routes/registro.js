import express from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/userService.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta_super_segura_2024";

// POST /registro → crear nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, email, password, apellidos } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Nombre, correo y contraseña son requeridos" });
    }

    const usuario = await userService.createUser({ nombre, email, password, apellidos });

    // Generar JWT
    const payload = { id: usuario.id, correo: usuario.correo, nombre: usuario.nombre, tipo: usuario.tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    const usuarioSeguro = { ...usuario.dataValues };
    delete usuarioSeguro.passwordHash;

    res.status(201).json({ message: "Usuario registrado exitosamente", token, usuario: usuarioSeguro });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
