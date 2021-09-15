const pool = require('../infra/database');
require('dotenv').config();
const { Pool } = require('pg');


const getDespesas = async (req, res) => {

            try {
                const response = await pool.query('SELECT * FROM despesas_pessoais WHERE date_delete is null')
                res.status(200).json(response.rows);
                } catch (e) {
                console.log(e);
            }

}

const cadastrarDespesas = async (req, res) => {

    const { nome_categoria } = req.body;
    console.log(nome_categoria)

    const compare = await pool.query(`SELECT * FROM categorias WHERE nome_categoria = $1 AND date_delete is null`, [nome_categoria])


    if (compare.rowCount === 1 || compare.rowCount > 1) {
        const compare2 = await pool.query(`SELECT * FROM categorias WHERE nome_categoria = $1 AND date_delete is null`, [nome_categoria])

        console.log(compare2)
        
        const id_categoria = compare2.rows[0].id_categoria
        const { id_usuario, data_lancamento, total, data_vencimento } = req.body;
        console.log(id_usuario)
        console.log(data_vencimento)
        console.log(total)
        console.log(data_vencimento)

        const response = await pool.query(`INSERT INTO despesas_pessoais (id_usuario, id_categoria, data_lancamento, data_vencimento, total, date_create) 
        VALUES ($1, $2, $3, $4, $5, $6) returning *`, 
        [id_usuario, id_categoria, data_lancamento, data_vencimento, total, date_create = new Date()])

        res.status(201).json({
            message: 'Categoria cadastrada com sucesso!',
            body: {
                Categoria: {nome_categoria, date_create}
            },
            message: 'Despesas cadastrada com sucesso!',
            body: {
                Despesas: {id_usuario, id_categoria, data_lancamento, data_vencimento, total, date_create}
            }
        })
    } else {

    
        const response1 = await pool.query(`INSERT INTO categorias (nome_categoria, date_create) 
        VALUES ($1, $2) returning *`, 
        [nome_categoria, date_create = new Date()])

        const compare2 = await pool.query(`SELECT * FROM categorias WHERE nome_categoria = $1 AND date_delete is null`, [nome_categoria])

    console.log(compare2)
    
    const id_categoria = compare2.rows[0].id_categoria
    const { id_usuario, data_lancamento, total, data_vencimento } = req.body;
    console.log(id_usuario)
    console.log(data_vencimento)
    console.log(total)
    console.log(data_vencimento)

    const response = await pool.query(`INSERT INTO despesas_pessoais (id_usuario, id_categoria, data_lancamento, data_vencimento, total, date_create) 
    VALUES ($1, $2, $3, $4, $5, $6) returning *`, 
    [id_usuario, id_categoria, data_lancamento, data_vencimento, total, date_create = new Date()])

    res.status(201).json({
        message: 'Categoria cadastrada com sucesso!',
        body: {
            Categoria: {nome_categoria, date_create}
        },
        message: 'Despesas cadastrada com sucesso!',
        body: {
            Despesas: {id_usuario, id_categoria, data_lancamento, data_vencimento, total, date_create}
        }
    })
}       

}

const deleleDespesas = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('UPDATE despesas_pessoais SET date_delete = $1 WHERE id_despesas = $2 AND date_delete is null', [date_delete = new Date(), id]);
    res.status(204).json(`Despesa ${id} deletada com sucesso!`)
};

const alterarDespesas = async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_categoria ,data_vencimento, data_lancamento, total } = req.body;
    const response = await pool.query(`UPDATE despesas_pessoais 
    SET id_categoria = $1, data_vencimento = $2, data_lancamento = $3 , total = $4, date_update = $5 where id_despesas = $6 AND date_delete is null returning *`, 
    [id_categoria ,data_vencimento, data_lancamento, total, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getDespesas,
    cadastrarDespesas,
    deleleDespesas,
    alterarDespesas,
}