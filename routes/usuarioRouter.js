const { Router } = require('express');
const router = Router();


const { getUsuario, cadastrarUsuario, deleleUsuario, alterarUsuario, loginUsuario } = require('../controller/usuarioController');

router.get('/usuarios', getUsuario);
router.post('/login', loginUsuario)
router.post('/usuarios', cadastrarUsuario)
router.delete('/usuarios/:id', deleleUsuario)
router.put('/usuarios/:id', alterarUsuario)

module.exports = router;