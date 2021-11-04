const { ERROR_CODE_500 } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_500;
  }
}

module.exports = InternalServerError;
