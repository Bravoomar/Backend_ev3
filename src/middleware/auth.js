import jwt from "jsonwebtoken"; // esto importa jsonwebtoken para verificar tokens

// esto obtiene la clave secreta desde variables de entorno o usa una por defecto
const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_secreta_super_segura_2024";

// esto es un middleware para verificar si el usuario está autenticado (tiene un JWT válido)
export const verificarToken = (req, res, next) => {
  try {
    // esto obtiene el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // esto retorna error si no se envía el token
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    // esto extrae el token del formato "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      // esto retorna error si el formato del token es incorrecto
      return res.status(401).json({ error: "Formato de token inválido" });
    }

    // esto verifica y decodifica el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // esto agrega la información del usuario al request para usarla en las rutas
    req.usuario = decoded;

    // esto continúa con el siguiente middleware o ruta
    next();
  } catch (error) {
    // esto retorna error si el token es inválido o expiró
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token inválido" });
    }
    return res.status(401).json({ error: "Error al verificar token" });
  }
};

// esto es un middleware para verificar si el usuario es administrador
// este middleware debe usarse después de verificarToken
export const verificarAdmin = (req, res, next) => {
  try {
    // esto verifica si el usuario tiene rol de administrador
    if (req.usuario && req.usuario.tipo === "administrador") {
      // esto continúa si es administrador
      next();
    } else {
      // esto retorna error si no es administrador
      return res.status(403).json({ error: "Acceso denegado. Se requiere rol de administrador" });
    }
  } catch (error) {
    return res.status(403).json({ error: "Error al verificar permisos de administrador" });
  }
};

