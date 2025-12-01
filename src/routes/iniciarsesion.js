import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // ¡Importante! Para hashing de contraseñas
import { userService } from '../services/userService.js'; // Importa el servicio de DB

const router = express.Router(); 
const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta_super_segura_2024";

router.post("/", async (req, res) => { // La función debe ser ASÍNCRONA
    const { email, password } = req.body; 

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    try {
        // 1. 🔍 Buscar usuario en la BASE DE DATOS usando el servicio (IE3.1.1)
        const usuario = await userService.getUserByEmail(email.trim()); // Debes crear este método en userService.js

        if (!usuario) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // 2. 🔑 Verificar contraseña con HASHING (IE3.3.1)
        // Comparar la contraseña ingresada con el hash almacenado en la columna 'passwordHash'
        const isPasswordValid = await bcrypt.compare(password, usuario.passwordHash); 

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // 3. 🚀 Generar el Token JWT (IE3.3.1)
        const payload = {
            run: usuario.run,
            correo: usuario.correo,
            nombre: usuario.nombre,
            tipo: usuario.tipo.toLowerCase() // Usamos el rol de la DB
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

        // 4. ✅ Respuesta exitosa
        res.json({ 
            success: true, 
            token: token, 
            tipo: usuario.tipo.toLowerCase(),
            usuario: {
                run: usuario.run, nombre: usuario.nombre, apellidos: usuario.apellidos, 
                correo: usuario.correo, tipo: usuario.tipo.toLowerCase()
            },
            message: `Inicio de sesión exitoso como ${usuario.tipo.toLowerCase()}` 
        });

    } catch (e) {
        console.error("Error en el inicio de sesión:", e);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

export default router;