import "dotenv/config"; // Carga variables de entorno desde .env
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { connectDB } from "./src/config/db.js"; // Conexión a SQLite

// Rutas
import usersRouter from "./src/routes/users.js";
import productsRouter from "./src/routes/products.js";
import registroRouter from "./src/routes/registro.js";
import iniciarSesionRouter from "./src/routes/iniciarsesion.js";
import gestionUsuarioRouter from "./src/routes/gestionusuario.js";
import gestionProductosRouter from "./src/routes/gestionproductos.js";

const app = express();

// Middleware
app.use(express.json()); // Para interpretar JSON en requests
app.use(cors({ origin: "http://localhost:5173" })); // Permite requests desde frontend

// Montaje de rutas
app.use("/users", usersRouter); // GET /users, etc.
app.use("/products", productsRouter); // GET /products (catálogo)
app.use("/registro", registroRouter); // POST /registro
app.use("/iniciarsesion", iniciarSesionRouter); // POST /iniciarsesion
app.use("/gestionusuario", gestionUsuarioRouter); // CRUD usuarios (Admin)
app.use("/gestionproductos", gestionProductosRouter); // CRUD productos (Admin)

// Swagger UI
try {
  const swaggerFile = JSON.parse(readFileSync("./swagger-output.json"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (error) {
  console.warn("⚠️ No se encontró swagger-output.json, la documentación no se cargará.");
}

// Conexión a base de datos y arranque del servidor
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error("❌ Error iniciando la DB o servidor:", err);
});
