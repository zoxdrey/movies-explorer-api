const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { login, createUser } = require('../controllers/users');

const authRouter = express.Router();

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30)
      .email()
      .required(),
    password: Joi.string().required().min(2).max(30)
      .required(),
  }),
}),
login);

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30)
      .email()
      .required(),
    password: Joi.string().required().min(2).max(30)
      .required(),
  }),
}),
createUser);

module.exports = authRouter;
