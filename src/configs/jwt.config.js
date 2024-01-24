"use strict";

const jwtConfig = {
  /*
  |--------------------------------------------------------------------------
  | JWT
  |--------------------------------------------------------------------------
  */
  jwtSecret: process.env.JWT_SECRET_KEY,
  tokenExpiration: process.env.TOKEN_EXPIRATION,
};
module.exports = jwtConfig;
