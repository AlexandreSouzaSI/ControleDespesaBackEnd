const { Router } = require('express');
const router = Router();


const { getTotalPorPessoa, getTotalaPagar } = require('../controller/relatoriosController');

router.post('/totalPessoa', getTotalPorPessoa);
router.post('/totalapagar', getTotalaPagar);


module.exports = router;