const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app= express();
const PORT= 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnetction({
    host: 'localhost',
    port: 3306,
    user: 'root',
    passaword: '',
    database: 'aulabd'
});

//Conectando ao banco de dados
db.connect((erro) => {
    if(erro) {
        console.error('Erro ao conectar ao MySQL:',erro);
    } else {
        console.log('Conectando ao MySQl com sucesso');
    
    }
});

//Rota para cadastrar usuário
app.post('/alunos', (req,res) => {
    const {nome,cidade,estado} = req.body;

    const sql = 'INSERT INTO alunos (nome,cidade,estado) VALUES (?,?,?)';

    db.query(sql, [nome,cidade,estado],(err,result)) => {
        if (err)
        {
            return res.status(500).json({ error: 'Erro ao cadastrar aluno !' });

        }
        res.status(201).json({ message: 'Aluno cadastro com sucesso!', id: result.insertId});
    });
