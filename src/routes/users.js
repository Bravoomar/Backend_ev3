import express from "express"; // esto importa express para crear un router de rutas

const router = express.Router(); // esto crea el router de usuarios

router.get("/", (req, res) => { // esto define el endpoint GET /users
  res.json("Hola desde express!"); // esto responde un JSON de texto
});

export default router; // esto exporta el router para usarlo en index.js


