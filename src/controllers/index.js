const express = require('express');
const router = express.Router();
const home = require('./home');
const login = require('./login');
const error = require('./error');
const continents = require('./continents');
const singCont = require('./singleContinent');
const logout = require('./logout');
const signup = require('./signup');

router.get('/', home.get);
router.post('/login', login.post);
// router.get('/error', error.server);
router.post('/signup', signup.post);
router.get('/auth/continents', continents.get);
router.get('/auth/continents/:continent', singCont.get);
router.get('/logout', logout.get);

router.use(error.client);
router.use(error.server);

module.exports = router;
