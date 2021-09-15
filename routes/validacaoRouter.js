const { Router } = require('express');
const router = Router();


const { getValidacao, getValidacaoName} = require('../controller/validacaoController');

router.get('/validacao', getValidacao);
router.get('/validacaonome', getValidacaoName);

module.exports = router;