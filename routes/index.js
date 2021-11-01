const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const NotFoundError = require('../errors/not-found-error');

const auth = require('../middlewares/auth');

router.use('/', authRoutes);

router.use(auth);

router.use('/', userRoutes);
router.use('/', movieRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден.'));
});
module.exports = router;
