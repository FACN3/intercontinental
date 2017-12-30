const continent = require('../model');

exports.get = (req, res) => {
  console.log('in controllers/continents.js');
  res.render('continents', { continent });
};
