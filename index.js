import cors from "cors"; // esto habilita CORS para permitir peticiones desde el front
import express from "express"; // esto importa express para crear el servidor HTTP
import swaggerUi from "swagger-ui-express"; // esto sirve y renderiza la UI de swagger
import usersRouter from "./src/routes/users.js"; // esto trae las rutas de usuarios
import { readFileSync } from "fs"; // esto me permite leer archivos del sistema

const app = express(); // esto crea la app de express

app.use(express.json()); // esto hace que el servidor entienda JSON en los request
app.use(cors({ origin: "http://localhost:5173" })); // esto permite requests desde mi front en 5173

app.use("/users", usersRouter); // esto monta todas las rutas de usuarios en /users

const swaggerFile = JSON.parse(readFileSync("./swagger-output.json")); // esto carga el JSON de swagger generado
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // esto expone la doc en /api-docs

const PORT = 3000; // esto define el puerto del servidor
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}/api-docs`)); // esto inicia el server


