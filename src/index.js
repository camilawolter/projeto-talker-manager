const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./utils/talkers');
const generatorToken = require('./utils/generatorToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
    const talker = await readFile();
    return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readFile();
  const talker = talkers.find(({ id }) => id === Number(req.params.id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const token = generatorToken();
  res.status(200).json({ token });
});