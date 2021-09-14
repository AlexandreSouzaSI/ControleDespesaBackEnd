const { Router } = require('express');
const router = Router();


const { getDespesas, cadastrarDespesas, deleleDespesas, alterarDespesas } = require('../controller/despesasController');

router.get('/despesas', getDespesas);
router.post('/despesas', cadastrarDespesas)
router.delete('/despesas/:id', deleleDespesas)
router.put('/despesas/:id', alterarDespesas)

module.exports = router;