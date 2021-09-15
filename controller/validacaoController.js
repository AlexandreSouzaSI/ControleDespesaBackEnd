const pool = require('../infra/database');
const jwt = require('jsonwebtoken');


const getValidacao = async (req, res) => {

    const token = req.cookies['token']

    console.log(token)

    console.log('get', token);
    jwt.verify(token, process.env.SECRET, async (err, tokenUsuario) => {

        if (err) {
            return res.sendStatus(403);
        } else {
            telefone = tokenUsuario.telefone;
            user = tokenUsuario.name;
            userEmail = tokenUsuario.email;
            userId = tokenUsuario.id_usuario;

            try {

                const response = await pool.query('SELECT * FROM usuarios WHERE date_delete is null')
                console.log(userEmail, userId, user, telefone);
                res.status(200).json(response.rows);

                if (response.rows[0].userAdmin == true){
                    res.json(0)
                }

            } catch (e) {
                console.log(e);
            }

            return true;
        }
    })
}

const getValidacaoName = async (req, res) => {

    const token = req.cookies['token']

    console.log(token)

    console.log('get', token);
    jwt.verify(token, process.env.SECRET, async (er, tokenUsuario) => {

        if (er) {
            return res.sendStatus(403);
        } else {
            telefone = tokenUsuario.telefone;
            user = tokenUsuario.name;
            userEmail = tokenUsuario.email;
            userId = tokenUsuario.id;

            try {

                const response = await pool.query('SELECT name, email, telefone, id_usuario FROM usuarios WHERE id_usuario = $1', [userId])
                console.log(userEmail, userId, user, telefone);
                res.status(200).json(response.rows);

            } catch (e) {
                console.log(e);
            }
            return true;
        }
    })
}



module.exports = {
    getValidacao,
    getValidacaoName,
}