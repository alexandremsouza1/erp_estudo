const express = require('express');
const router = express.Router();
const usuarioService = require("../services/usuario-service");

router.post("/post", usuarioService.salvarUsuarioRoute);
router.get("/by/:id", usuarioService.buscarUsuarioPorIDRoute);
router.get("/all", usuarioService.listarTodosUsuarios);

module.exports = router;