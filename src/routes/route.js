const express = require('express');

const router = express.Router();

const Name = require('../logger/logger')

const Date = require('../util/helper')

const Trim = require('../validator/formattor')

router.get('/test-me', function (req, res) {
    res.send('My latest and this first ever api!')
    Name.Welcome()
    Date.printDate()
    Date.printMonth()
    Date.getBatchInfo()
    Trim.trim()
    Trim.changetoLowerCase()
    Trim.changetoUpperCase()


});




module.exports = router;
// adding this comment for no reason