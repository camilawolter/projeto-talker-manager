const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  const data = await fs.readFile(talkerPath, 'utf-8');
  const response = JSON.parse(data);
  return response;
};

const writeFile = async (newTalker) => {
  const talkers = await readFile();
  await fs.writeFile(talkerPath, JSON.stringify([...talkers, newTalker], null, 2));
};

const newId = async () => {
  const talkers = await readFile();
  const nextId = Math.max(...talkers.map(({ id }) => id)) + 1;
  return nextId;
};

const updateTalker = async (updTalker) => {
  const talkers = await readFile();
  const newDataTalker = talkers.map((talk) => {
    if (talk.id === updTalker.id) return updTalker;
    return talk;
  });
  await fs.writeFile(talkerPath, JSON.stringify(newDataTalker, null, 2));
};

const deleteTalker = async (id) => {
  const talkers = await readFile();
  const newDataTalker = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(talkerPath, JSON.stringify(newDataTalker, null, 2));
};

module.exports = {
  readFile,
  writeFile,
  newId,
  updateTalker,
  deleteTalker,
};