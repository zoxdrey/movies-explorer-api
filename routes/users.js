const express = require("express");
const userRouter = express.Router();
const {
  getUser, updateUserById,
} = require('../controllers/users');
const {celebrate, Joi } = require("celebrate");

userRouter.get('/users', getUser);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserById);

module.exports = userRouter;