require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { MONGO_CONNECTION_STRING } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30)
      .email()
      .required(),
    password: Joi.string().required().min(2).max(30)
      .required(),
  }),
}),
login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().min(2).max(30)
      .email()
      .required(),
    password: Joi.string().required().min(2).max(30)
      .required(),
  }),
}),
createUser);
app.use(auth);
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
});
