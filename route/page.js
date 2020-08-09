const express = require('express');
const { Router } = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;