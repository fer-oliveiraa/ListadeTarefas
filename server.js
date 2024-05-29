const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'yourpassword',
    database: 'todo_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, title, description, status: false });
    });
});

// Rota para atualizar uma tarefa
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Rota para deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
