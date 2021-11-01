const express = require('express');
const { celebrate, Joi } = require('celebrate');

const movieRouter = express.Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailer: Joi.string().uri().required(),

    thumbnail: Joi.string().uri().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}),
createMovie);

movieRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }).unknown(true),
}), deleteMovie);

module.exports = movieRouter;
