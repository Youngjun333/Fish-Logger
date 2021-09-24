const express = require('express');
const Fish = require('../models/fish');
const router = express.Router();


// all fish route
router.get('/', async(req, res) => {
    let query = Fish.find();
    if(req.query.name != null && req.query.name != '') {
        query = query.regex('name', new RegExp(req.query.name, 'i'));
    }
    if(req.query.location != null && req.query.location != '') {
        query = query.regex('location', new RegExp(req.query.location, 'i'));
    }
    if(req.query.bait != null && req.query.bait != '') {
        query = query.regex('bait', new RegExp(req.query.bait, 'i'));
    }
    if(req.query.lineColor != null && req.query.lineColor != '') {
        query = query.regex('lineColor', new RegExp(req.query.lineColor, 'i'));
    }
    if(req.query.length != null && req.query.length != '') {
        query = query.lte('length', req.query.length);
    }
    if(req.query.length != null && req.query.length != '') {
        query = query.gte('length', req.query.length);
    }
    if(req.query.tide != null && req.query.tide != '') {
        query = query.lte('tide', req.query.tide);
    }
    if(req.query.tide != null && req.query.tide != '') {
        query = query.gte('tide', req.query.tide);
    }
    if(req.query.sinkerWeight != null && req.query.sinkerWeight != '') {
        query = query.lte('sinkerWeight', req.query.sinkerWeight);
    }
    if(req.query.sinkerWeight != null && req.query.sinkerWeight != '') {
        query = query.gte('sinkerWeight', req.query.sinkerWeight);
    }
    if(req.query.caughtDate != null && req.query.caughtDate != '') {
        query = query.lte('caughtDate', req.query.caughtDate);
    }
    if(req.query.caughtDate != null && req.query.caughtDate != '') {
        query = query.gte('caughtDate', req.query.caughtDate);
    }
    if(req.query.waterTemp != null && req.query.waterTemp != '') {
        query = query.lte('waterTemp', req.query.waterTemp);
    }
    if(req.query.caughtDate != null && req.query.waterTemp != '') {
        query = query.gte('waterTemp', req.query.waterTemp);
    }


    try {
        const fishes = await query.exec();
        res.render('fish/index', {
            fishes: fishes,
            searchOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});

// new Fish route
router.get('/new', (req, res) => {
    res.render('fish/new', {fish: new Fish()});
});


//create Fish route
router.post('/', async(req, res) => {
    const fish = new Fish({
        name: req.body.name,
        location: req.body.location,
        caughtDate: new Date(req.body.caughtDate),
        length: req.body.length,
        waterTemp: req.body.waterTemp,
        lineColor: req.body.lineColor,
        sinkerWeight: req.body.sinkerWeight,
        tide: req.body.tide,
        rig: req.body.rig,
        bait: req.body.bait
    });

    try {
        const newFish = await fish.save();
        res.redirect(`fish/${newFish.id}`)
    } catch {
        res.render('fish/new', {
            fish: fish,
            errorMessage: 'Error creating fish'
        })
    }
});

router.get('/:id', async(req,res) => {
    try {
        const fish = await Fish.findById(req.params.id);
        res.render('fish/show', {
            fish: fish
        });
    } catch {
        res.redirect('/');
    }
});

router.get('/:id/edit', async(req,res) => {
    try {
        const fish = await Fish.findById(req.params.id);
        res.render('fish/edit', {fish: fish});
    } catch {
        res.render('/fish');
    }
});

router.put('/:id', async(req,res) => {
    let fish;
    try {
        fish = await Fish.findById(req.params.id);
        fish.name = req.body.name;
        fish.location = req.body.location;
        fish.caughtDate = new Date(req.body.caughtDate);
        fish.length = req.body.length;
        fish.waterTemp = req.body.waterTemp;
        fish.lineColor = req.body.lineColor;
        fish.sinkerWeight = req.body.sinkerWeight;
        fish.tide = req.body.tide;
        fish.rig = req.body.rig;
        fish.bait = req.body.bait;
        await fish.save();
        res.redirect(`/fish/${fish.id}`);
    } catch {
        if(fish == null) {
            res.redirect('/');
        } else {
            res.render('fish/edit', {
                fish: fish,
                errorMessage: 'Error updating fish'
            });
        }
    }
});

router.delete('/:id', async(req,res) => {
    let fish;
    try {
        fish = await Fish.findById(req.params.id);
        await fish.remove();
        res.redirect('/fish');
    } catch {
        if(fish == null) {
            res.redirect('/');
        } else {
            res.redirect(`/fish/${fish.id}`)
        }
    }
});

module.exports = router;