const express = require('express');
const router = express.Router();
const login = require('./login');
const error = require('./error');
const continents = require('./continents');

const auth = (req, res, next) => {
  if (Object.keys(req.signedCookies).includes('userid')) {
    next();
  } else {
    console.log(3);
    res.status(404).render('error', {
      layout: 'error',
      statusCode: 404,
      errorMessage: 'Not Found'
    });
  }
  // next();

  // }elseif (req.headers.cookie == )
};

module.exports = auth;
