const queries = require('../model/queries');

exports.get = (req, res, next) => {
  console.log('req.headers.cookie is ', req.headers.cookie);
  console.log('req.signedCookies is ', req.signedCookies);
  const { userid } = req.signedCookies;
  res.clearCookie('userid', userid, { signed: true });
  res.redirect('/');
};
