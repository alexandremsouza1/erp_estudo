const express = require('express');
const router = express.Router();
const usuarioService = require("../services/usuario-service");

router.post("/post", usuarioService.salvarUsuarioRoute);
router.get("/:id", usuarioService.getUserById);
router.get("/", usuarioService.listarTodosUsuarios);

module.exports = router;