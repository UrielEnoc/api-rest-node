const express = require("express");
const router = express.Router();

const articuloControlador = require("../controladores/articulo");

// Rutas de pruebas
router.get("/ruta-de-prueba", articuloControlador.prueba);
router.get("/cursos", articuloControlador.cursos);

// Rutas útiles
router.post("/crear", articuloControlador.crear)
router.get("/articulos/:ultimos?", articuloControlador.listar)
router.get("/articulo/:id", articuloControlador.uno)

module.exports = router;