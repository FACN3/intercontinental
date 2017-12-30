const queries = require('../model/queries');
// const cookie = require('./cookie');

exports.post = (req, res) => {
  // console.log('Inside post login', req.body);
  const { username } = req.body;
  const { pass } = req.body;
  console.log('req.body is ', req.body);
  queries.loginUser(username, pass, (err, result) => {
    console.log('error is', err);
    console.log('in login.js');
    if (err == false) {
      res.status(200).json('incorrect user/pass combo');
    } else if (err) {
      res.status(500).json('query error');
    } else {
      res
        .cookie('userid', result.id, { signed: true })
        .json('login successful')
        .status(200);
    }
  });

  // next();
  //give cookie
  //redirect to auth
  //redirect to continents page

  // if (queries.loginUser(username, password) == 'user not found') {
  //   res.status(200).send('user not found');
  // } else {user not found
  //   console.log(`congrats${username}! successful password`);
  //   res.status(200).send();
  // }
  // res.send(req.body);
  // check user password combo
  // add cookie with userid and username
  // send to the continents page
  // if (//pasword is wrong){}
};
