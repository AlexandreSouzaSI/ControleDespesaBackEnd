const { Router } = require('express');
const router = Router();


const { getTotalPorPessoa, getTotalaPagar } = require('../controller/relatoriosController');

router.post('/despesaPessoa', getTotalPorPessoa);
router.post('/totalapagar', getTotalaPagar);


module.exports = router;