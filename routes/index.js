const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.use('/', userRoutes);
router.use('/', movieRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден.'));
});
module.exports = router;
