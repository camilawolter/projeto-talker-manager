const express = require('express');
const bodyParser = require('body-parser');
const { readFile, writeFile, newId, updateTalker } = require('./utils/talkers');
const generatorToken = require('./utils/generatorToken');
const { validateEmail, validatePassword } = require('./middlewares/validationLogin');
const validateToken = require('./middlewares/validationToken');
const validateDataTalkers = require('./middlewares/validationDataTalkers');

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

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = generatorToken();
  return res.status(200).json({ token });
});

app.post('/talker', validateToken, validateDataTalkers, async (req, res) => {
  const dataTalker = req.body;
  const newTalker = { id: await newId(), ...dataTalker };
  await writeFile(newTalker);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', validateToken, validateDataTalkers, async (req, res) => {
  const { id } = req.params;
  const dataTalker = req.body;
  const newTalker = { id: Number(id), ...dataTalker };
  await updateTalker(newTalker);
  return res.status(200).json(newTalker);
});