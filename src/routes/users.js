import express from "express"; 
import { userService } from '../services/userService.js'; // Importa el servicio de lógica de negocio
import { verificarToken } from "../middleware/auth.js"; // Importa el middleware de token (si aplica)

const router = express.Router(); 

// OPCIONAL: Si solo los usuarios logueados pueden acceder a esta lista, aplica el token.
// Si es público, omite esta línea.
// router.use(verificarToken); 

// esto define el endpoint GET /users para listar todos los usuarios
router.get("/", async (req, res) => {
    try {
        // Llama al servicio para obtener los datos de la DB
        const usuarios = await userService.getAllUsers();
        
        // OPCIONAL: Filtrar campos sensibles (Ej: passwordHash) antes de enviar
        const usuariosSeguros = usuarios.map(user => {
            const { passwordHash, ...rest } = user.dataValues;
            return rest;
        });
        
        res.json(usuariosSeguros);
        
    } catch (e) {
        console.error("Error al obtener lista de usuarios:", e);
        res.status(500).json({ error: "Error interno del servidor al obtener usuarios." });
    }
});

// Puedes agregar GET /users/:run para obtener un usuario específico (sin ser admin)
router.get("/:run", async (req, res) => {
    try {
        const usuario = await userService.getUserByRun(req.params.run);
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        // Filtra la contraseña antes de responder
        const { passwordHash, ...usuarioSeguro } = usuario.dataValues;
        res.json(usuarioSeguro);
        
    } catch (e) {
        res.status(500).json({ error: "Error al buscar usuario." });
    }
});

export default router;