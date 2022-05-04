import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  return res.send('Teste');
});

app.listen(3333, () => {
  console.log('SERVER RUNNING...');
});
