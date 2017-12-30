const express = require('express');
const router = express.Router();
const home = require('./home');
const login = require('./login');
const error = require('./error');
const queries = require('../model/queries');
const bodyParser = require('body-parser');



router.get('/', home.get);
router.post('/login', login.post);







router.use(error.client);
router.use(error.server);


module.exports = router;
