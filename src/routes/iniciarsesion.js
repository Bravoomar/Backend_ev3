import express from "express"; // esto importa express para crear un router de rutas

const router = express.Router(); // esto crea el router de inicio de sesión

// esto define el endpoint POST /iniciarsesion para autenticar usuarios
router.post("/", (req, res) => {
  const { email, password } = req.body; // esto extrae email y password del body

  if (!email || !password) {
    // esto valida que se envíen ambos campos
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  const correo = email.trim(); // esto limpia espacios del email

  // esto valida si el correo termina en @duocuc.cl para determinar si es administrador
  if (correo.endsWith("@duocuc.cl")) {
    // esto retorna éxito si es administrador
    res.json({ 
      success: true, 
      tipo: "administrador",
      message: "Inicio de sesión exitoso como administrador" 
    });
  } else {
    // esto retorna éxito si es usuario normal
    res.json({ 
      success: true, 
      tipo: "usuario",
      message: "Inicio de sesión exitoso" 
    });
  }
});

export default router; // esto exporta el router para usarlo en index.js

