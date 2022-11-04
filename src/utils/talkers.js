const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  const data = await fs.readFile(talkerPath, 'utf-8');
  const response = JSON.parse(data);
  return response;
};

module.exports = {
  readFile,
};