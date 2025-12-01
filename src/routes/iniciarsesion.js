import express from "express"; // esto importa express para crear un router de rutas
import jwt from "jsonwebtoken"; // esto importa jsonwebtoken para generar tokens JWT

const router = express.Router(); // esto crea el router de inicio de sesión

// esto obtiene la clave secreta desde variables de entorno o usa una por defecto
const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta_super_segura_2024";

// esto almacena los usuarios en memoria (en producción usarías una base de datos)
// NOTA: Esto debería compartir la misma base de datos que registro.js y gestionusuario.js
const usuariosData = [
  { run: "11-1", nombre: "Juan", apellidos: "Pérez", correo: "juan.perez@duoc.cl", tipo: "Administrador", direccion: "Av. Siempre Viva 123", password: "admin123" },
  { run: "22-2", nombre: "Ana", apellidos: "García", correo: "ana.garcia@duoc.cl", tipo: "Vendedor", direccion: "Calle Falsa 456", password: "vendedor123" }
];

// esto define el endpoint POST /iniciarsesion para autenticar usuarios y generar JWT
router.post("/", (req, res) => {
  const { email, password } = req.body; // esto extrae email y password del body

  if (!email || !password) {
    // esto valida que se envíen ambos campos
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const correo = email.trim(); // esto limpia espacios del email

  // esto busca el usuario en la base de datos
  const usuario = usuariosData.find(u => u.correo === correo);

  // esto valida si el usuario existe y la contraseña es correcta
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // esto determina el tipo de usuario basado en el correo o el tipo almacenado
  let tipoUsuario = usuario.tipo.toLowerCase();
  if (correo.endsWith("@duocuc.cl")) {
    tipoUsuario = "administrador";
  }

  // esto crea el payload del JWT con la información del usuario
  const payload = {
    run: usuario.run,
    correo: usuario.correo,
    nombre: usuario.nombre,
    tipo: tipoUsuario
  };

  // esto genera el token JWT con expiración de 24 horas
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

  // esto retorna el token y la información del usuario
  res.json({ 
    success: true, 
    token: token, // esto retorna el JWT para que el frontend lo guarde
    tipo: tipoUsuario,
    usuario: {
      run: usuario.run,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      tipo: tipoUsuario
    },
    message: tipoUsuario === "administrador" 
      ? "Inicio de sesión exitoso como administrador" 
      : "Inicio de sesión exitoso" 
  });
});

export default router; // esto exporta el router para usarlo en index.js

