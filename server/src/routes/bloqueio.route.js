const express = require('express')
const router = express.Router()

const bloqueioService = require('../services/bloqueio-service')

router.post('/', bloqueioService.salvarUsuarioListaNegra)
router.get('/', bloqueioService.listarTodosUsuariosListaNegra)
router.delete('/:user_id', bloqueioService.removerUsuarioListaNegra)
router.get('/nickname/:nickname', bloqueioService.buscarUsuarioPorNickName)

module.exports = router