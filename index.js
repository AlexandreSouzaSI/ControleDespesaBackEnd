const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')


app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./routes/usuarioRouter'));
app.use(require('./routes/categoriaRouter'));
app.use(require('./routes/despesasRouter'));
app.use(require('./routes/relatoriosRouter'));

app.listen(4000);
console.log('Server on port 4000')