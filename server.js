import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App.js';

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My SSR App</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `);
});

// Получение списка всех пользователей
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Получение пользователя по id
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send('User not found');
  else res.json(user);
});


app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.status(201).send(user);
});

app.put('/api/users/:id', (req, res) => {
  let user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send('User not found');
  else {
    user.name = req.body.name;
    res.send(user);
  }
});


app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
