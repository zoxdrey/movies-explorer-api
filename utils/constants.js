const ERROR_CODE_404 = '404';
const ERROR_CODE_500 = '500';
const ERROR_CODE_400 = '400';
const ERROR_CODE_401 = '401';
const ERROR_CODE_409 = '409';
const ERROR_CODE_403 = '403';
const MONGO_CONNECTION_STRING = 'mongodb+srv://root:root@cluster0.de1p8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const LINK_REGEXP_VALIDATION_STRING = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
module.exports = {
  ERROR_CODE_404,
  ERROR_CODE_500,
  ERROR_CODE_400,
  MONGO_CONNECTION_STRING,
  LINK_REGEXP_VALIDATION_STRING,
  ERROR_CODE_401,
  ERROR_CODE_409,
  ERROR_CODE_403,
};
