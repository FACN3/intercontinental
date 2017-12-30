/* GET home page. */
exports.get = (req, res) => {
  res.render('index', { layout: 'login', activePage: { home: true } });
};
