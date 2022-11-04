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
  await fs.writeFile(talkerPath, JSON.stringify([...talkers, newTalker]));
};

const newId = async () => {
  const talkers = await readFile();
  const nextId = Math.max(...talkers.map(({ id }) => id)) + 1;
  return nextId;
};

module.exports = {
  readFile,
  writeFile,
  newId,
};