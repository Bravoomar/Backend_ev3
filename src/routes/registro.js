import express from "express"; // esto importa express para crear un router de rutas

const router = express.Router(); // esto crea el router de registro

// esto almacena los usuarios en memoria (en producción usarías una base de datos)
// NOTA: En producción, esto debería compartir la misma base de datos que gestionusuario.js
const usuariosData = [
  { run: "11-1", nombre: "Juan", apellidos: "Pérez", correo: "juan.perez@duoc.cl", tipo: "Administrador", direccion: "Av. Siempre Viva 123", password: "admin123" },
  { run: "22-2", nombre: "Ana", apellidos: "García", correo: "ana.garcia@duoc.cl", tipo: "Vendedor", direccion: "Calle Falsa 456", password: "vendedor123" }
];

// esto define el endpoint POST /registro para registrar un nuevo usuario
router.post("/", (req, res) => {
  const { run, nombre, apellidos, correo, password, direccion } = req.body; // esto extrae los datos del body

  // esto valida que todos los campos requeridos estén presentes
  if (!run || !nombre || !apellidos || !correo || !password || !direccion) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // esto valida formato básico de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: "El formato del correo electrónico no es válido" });
  }

  // esto valida que la contraseña tenga al menos 6 caracteres
  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  // esto verifica si el RUN ya existe
  const usuarioExistentePorRun = usuariosData.find(u => u.run === run);
  if (usuarioExistentePorRun) {
    return res.status(400).json({ error: "El RUN ya está registrado" });
  }

  // esto verifica si el correo ya existe
  const usuarioExistentePorCorreo = usuariosData.find(u => u.correo === correo);
  if (usuarioExistentePorCorreo) {
    return res.status(400).json({ error: "El correo electrónico ya está registrado" });
  }

  // esto crea el nuevo usuario con tipo "Cliente" por defecto para registros públicos
  const nuevoUsuario = { 
    run, 
    nombre, 
    apellidos, 
    correo, 
    password, // esto guarda la contraseña (en producción debería estar encriptada)
    tipo: "Cliente", // esto asigna tipo Cliente por defecto
    direccion 
  };
  
  usuariosData.push(nuevoUsuario); // esto agrega el usuario a la lista

  // esto retorna el usuario sin la contraseña por seguridad
  const usuarioSinPassword = { ...nuevoUsuario };
  delete usuarioSinPassword.password;

  res.status(201).json({ 
    message: "Usuario registrado exitosamente", 
    usuario: usuarioSinPassword 
  });
});

export default router; // esto exporta el router para usarlo en index.js

