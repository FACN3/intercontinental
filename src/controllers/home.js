const express = require('express');

/* GET home page. */
exports.get= (req, res) =>{
  res.render('index', { activePage:{home:true} });
};

