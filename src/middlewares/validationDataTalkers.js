const validateName = (name) => {
  if (!name) {
    return 'O campo "name" é obrigatório';
  }
  if (name.length < 3) {
    return 'O "name" deve ter pelo menos 3 caracteres';
  }
  return true;
};

const validateAge = (age) => {
  if (!age) {
    return 'O campo "age" é obrigatório';
  }
  if (age < 18) {
    return 'A pessoa palestrante deve ser maior de idade';
  }
  return true;
};

const validateNumberRate = (number) => {
  if (!Number.isInteger(number) || number < 1 || number > 5) return false;
  return true;
};

const validateDateAndRate = (date, rate) => {
  const dateRegex = /\d{2}\/\d{2}\/\d{4}/g;
  if (!dateRegex.test(date)) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
  if (!validateNumberRate(rate)) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return true;
};

const validateTalk = (talk) => {
  if (!talk) {
    return 'O campo "talk" é obrigatório';
  }
  if (!talk.watchedAt) {
    return 'O campo "watchedAt" é obrigatório';
  }
  if (!talk.rate && talk.rate !== 0) {
    return 'O campo "rate" é obrigatório';
  }
  return validateDateAndRate(talk.watchedAt, talk.rate);
};

const validateDataTalkers = (req, res, next) => {
  const { name, age, talk } = req.body;
  const nameValid = validateName(name);
  const ageValid = validateAge(age);
  const talkValid = validateTalk(talk);

  if (nameValid !== true) {
    return res.status(400).json({ message: nameValid });
  }
  if (ageValid !== true) {
    return res.status(400).json({ message: ageValid });
  }
  if (talkValid !== true) {
    return res.status(400).json({ message: talkValid });
  }
  next();
};

module.exports = validateDataTalkers;