const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный формат _id пользователя'));
      }
      next(err);
    }).catch(next);
};

module.exports.updateUserById = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Неверный формат _id пользователя'));
      }
      if (err.name === 'MongoError') {
        next(new ConflictError('Указанный email принадлежит другому пользователю'));
      }
      next(err);
    }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неправильные почта или пароль'));
      }
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          next(new UnauthorizedError('Неправильные почта или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : '63e8e9465bab2b7fc5b2b88d8d5c6854c9e734d02696c6364b833b5b6615c261', { expiresIn: '7d' });
        return res.send({ token });
      }).catch(next);
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильные почта или пароль'));
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.status(200).send({
      data: {
        name, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
      next(err);
    })
    .catch(next);
};
