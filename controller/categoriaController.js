const pool = require('../infra/database');
require('dotenv').config();
const { Pool } = require('pg');


const getCategoria = async (req, res) => {

            try {
                const response = await pool.query('SELECT * FROM categorias WHERE date_delete is null')
                res.status(200).json(response.rows);
                } catch (e) {
                console.log(e);
            }

}

const cadastrarCategoria = async (req, res) => {
    const { nome_categoria } = req.body;

    const compare = await pool.query(`SELECT * FROM categorias WHERE nome_categoria = $1 AND date_delete is null`, [nome_categoria])


    if (compare.rowCount === 1 || compare.rowCount > 1) {
        console.log("Categoria já cadastrada")
        res.json(0)
    }
    
    else if (compare.rowCount === 0) {
    const response = await pool.query(`INSERT INTO categorias (nome_categoria, date_create) 
    VALUES ($1, $2) returning *`, 
    [nome_categoria, date_create = new Date()])
    res.status(201).json({
        message: 'Categoria cadastrada com sucesso!',
        body: {
            Categoria: {nome_categoria, date_create}
        }
    })
    }
};

const deleleCategoria = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('UPDATE categorias SET date_delete = $1 WHERE id_Categoria= $2', [date_delete = new Date(), id]);
    res.status(204).json(`Categoria ${id} deletada com sucesso!`)
};

const alterarCategoria = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome_categoria } = req.body;
    const response = await pool.query(`UPDATE categorias 
    SET nome_categoria = $1, date_update = $2 where id_categoria = $3 returning *`, 
    [nome_categoria, date_update = new Date(), id])
    res.status(204).json(response)
};


module.exports = {
    getCategoria,
    cadastrarCategoria,
    deleleCategoria,
    alterarCategoria,
}