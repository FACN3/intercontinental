const queries = require('../model/queries');

exports.post = (req, res, next) => {
  console.log('in exports.post');
  console.log(req.body);
  const { username } = req.body;
  const { pass } = req.body;

  queries.addUser(username, pass, (err, result) => {
    if (err) res.status(500).json('server error');
    else {
      res
        .status(200)
        .json('login successful')
        .cookie('id', result.id, { signed: true });
    }
  });
  // .then(res => {
  //   console.log('res.rows is', res.rows);
  //   return res.rows;
  // })
  // .catch(err => {
  //   console.log(err);
  //   return res.status(500).json('error in adduser query');
  // });
  // console.log('credentials are ', credentials);
  // if (credentials) {
  //   res
  //     .status(200)
  //     .json('login successful')
  //     .cookie('id', credentials.id, { signed: true });
  // } else {
  //   res.status(200).json('username already exists');
  // }
};
