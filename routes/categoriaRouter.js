const { Router } = require('express');
const router = Router();


const { getCategoria, cadastrarCategoria, deleleCategoria, alterarCategoria } = require('../controller/categoriaController');

router.get('/categorias', getCategoria);
router.post('/categorias', cadastrarCategoria)
router.delete('/categorias/:id', deleleCategoria)
router.put('/categorias/:id', alterarCategoria)

module.exports = router;