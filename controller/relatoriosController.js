const pool = require('../infra/database');
require('dotenv').config();
const { Pool } = require('pg');


const getTotalPorPessoa = async (req, res) => {
                const { id_usuario } = req.body;
                const response = await pool.query(`SELECT 
                                                        usuarios.id_usuario,
                                                        despesas_pessoais.id_despesas,							
                                                        name,
                                                        email,
                                                        telefone,
                                                        nome_categoria,
                                                        SUBSTRING(CAST(despesas_pessoais.data_vencimento AS varchar), 1, 10) as data_vencimento,
                                                        SUBSTRING(CAST(despesas_pessoais.data_vencimento AS varchar), 1, 10) as data_lancamento,
                                                        total
                                                    FROM despesas_pessoais 
                                                    JOIN categorias ON categorias.id_categoria = despesas_pessoais.id_categoria
                                                    JOIN usuarios ON usuarios.id_usuario = despesas_pessoais.id_usuario WHERE usuarios.id_usuario = $1 AND despesas_pessoais.date_delete is null
                                                `, [id_usuario])
                res.status(200).json(response.rows);
} 

const getTotalaPagar = async (req, res) => {
    const { id_usuario } = req.body;
    const response = await pool.query(`SELECT
                                            SUM(total) as TOTAL
                                            from (
                                        SELECT 
                                            name,
                                            email,
                                            telefone,
                                            nome_categoria,
                                            data_vencimento,
                                            data_lancamento,
                                            total
                                        FROM despesas_pessoais 
                                        JOIN categorias ON categorias.id_categoria = despesas_pessoais.id_categoria
                                        JOIN usuarios ON usuarios.id_usuario = despesas_pessoais.id_usuario WHERE usuarios.id_usuario = $1 AND despesas_pessoais.date_delete is null
                                        Group By name, email, telefone, nome_categoria, data_vencimento, data_lancamento, total
                                                ) as SOMA`, [id_usuario])
                res.status(200).json(response.rows);
}



module.exports = {
    getTotalPorPessoa,
    getTotalaPagar,
}