import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hola desde express!");
});

export default router;


