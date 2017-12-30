exports.get = (req, res) => {
  console.log('req.params', req.params);
  const { continent } = req.params;
  res.render('singleContinent', { continent });
};
