const express = require('express');
const router = express.Router();
const Fish = require('../models/fish');

router.get('/', async(req, res) => {
    let fishes;
    try {
        fishes = await Fish.find().sort({createdAt: 'desc'}).exec();
    } catch {
        fishes  = []
    }
    res.render('index', {fishes: fishes});
});



module.exports = router;