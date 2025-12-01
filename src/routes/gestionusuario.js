import express from "express"; // esto importa express para crear un router de rutas
import { verificarToken, verificarAdmin } from "../middleware/auth.js"; // esto importa los middlewares de autenticación

const router = express.Router(); // esto crea el router de gestión de usuarios

// esto aplica los middlewares de autenticación a todas las rutas de gestión de usuarios
// primero verifica el token JWT y luego verifica que sea administrador
// solo los administradores pueden acceder a estas rutas
router.use(verificarToken);
router.use(verificarAdmin);

// esto almacena los usuarios en memoria (en producción usarías una base de datos)
const usuariosData = [
  { run: "11-1", nombre: "Juan", apellidos: "Pérez", correo: "juan.perez@duoc.cl", tipo: "Administrador", direccion: "Av. Siempre Viva 123" },
  { run: "22-2", nombre: "Ana", apellidos: "García", correo: "ana.garcia@duoc.cl", tipo: "Vendedor", direccion: "Calle Falsa 456" }
];

// esto define el endpoint GET /gestionusuario para listar todos los usuarios
router.get("/", (req, res) => {
  res.json(usuariosData); // esto responde con la lista de usuarios
});

// esto define el endpoint GET /gestionusuario/:run para obtener un usuario por RUN
router.get("/:run", (req, res) => {
  const { run } = req.params; // esto extrae el RUN de los parámetros
  const usuario = usuariosData.find(u => u.run === run); // esto busca el usuario

  if (!usuario) {
    // esto retorna error si no se encuentra el usuario
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario); // esto responde con el usuario encontrado
});

// esto define el endpoint POST /gestionusuario para crear un nuevo usuario
router.post("/", (req, res) => {
  const { run, nombre, apellidos, correo, tipo, direccion } = req.body; // esto extrae los datos del body

  // esto valida que todos los campos requeridos estén presentes
  if (!run || !nombre || !apellidos || !correo || !tipo || !direccion) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  // esto verifica si el RUN ya existe
  const usuarioExistente = usuariosData.find(u => u.run === run);
  if (usuarioExistente) {
    return res.status(400).json({ error: "El RUN ya está registrado" });
  }

  // esto crea el nuevo usuario
  const nuevoUsuario = { run, nombre, apellidos, correo, tipo, direccion };
  usuariosData.push(nuevoUsuario); // esto agrega el usuario a la lista

  res.status(201).json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
});

// esto define el endpoint PUT /gestionusuario/:run para actualizar un usuario
router.put("/:run", (req, res) => {
  const { run } = req.params; // esto extrae el RUN de los parámetros
  const { nombre, apellidos, correo, tipo, direccion } = req.body; // esto extrae los datos del body

  // esto busca el índice del usuario
  const usuarioIndex = usuariosData.findIndex(u => u.run === run);

  if (usuarioIndex === -1) {
    // esto retorna error si no se encuentra el usuario
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // esto actualiza los datos del usuario (mantiene el RUN original)
  usuariosData[usuarioIndex] = {
    ...usuariosData[usuarioIndex],
    nombre: nombre || usuariosData[usuarioIndex].nombre,
    apellidos: apellidos || usuariosData[usuarioIndex].apellidos,
    correo: correo || usuariosData[usuarioIndex].correo,
    tipo: tipo || usuariosData[usuarioIndex].tipo,
    direccion: direccion || usuariosData[usuarioIndex].direccion
  };

  res.json({ message: "Usuario actualizado exitosamente", usuario: usuariosData[usuarioIndex] });
});

// esto define el endpoint DELETE /gestionusuario/:run para eliminar un usuario
router.delete("/:run", (req, res) => {
  const { run } = req.params; // esto extrae el RUN de los parámetros

  // esto busca el índice del usuario
  const usuarioIndex = usuariosData.findIndex(u => u.run === run);

  if (usuarioIndex === -1) {
    // esto retorna error si no se encuentra el usuario
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // esto elimina el usuario de la lista
  usuariosData.splice(usuarioIndex, 1);

  res.json({ message: "Usuario eliminado exitosamente" });
});

export default router; // esto exporta el router para usarlo en index.js

