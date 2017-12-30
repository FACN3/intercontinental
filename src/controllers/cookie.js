const session = require('express-session');

const cookie = () => {
  session({
    secret: 'cookie secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 }
  });
};

module.exports = cookie;
