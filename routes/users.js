const express = require("express");
const userRouter = express.Router();
const {
  getUser, updateUserById,
} = require('../controllers/users');
const {celebrate, Joi} = require("celebrate");

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserById);

module.exports = userRouter;
