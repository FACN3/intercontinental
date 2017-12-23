const queries = require('../model/queries');

exports.post = (req, res) => {
  console.log('Inside post login', req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(req.body);
  // queries.loginUser(
  // 	req.body.username,
  // 	req.body.password).then((result)=>{
  // 		console.log(result);
  // 	}).catch((error)=>{
  // 		console.log("Login catch", error);
  // 	});
};
