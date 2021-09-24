const express = require('express');
const Species = require('../models/species');
const router = express.Router();


// all species route
router.get('/', async(req, res) => {
    let searchOptions = {};

    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const species = await Species.find(searchOptions);
        res.render('species/index', {species: species, searchOptions: req.query});
    } catch {
        res.redirect('/');
    }
});

// new species route
router.get('/new', (req, res) => {
    res.render('species/new', {species: new Species()});
});


//create species route
router.post('/', async(req, res) => {
    const kind = new Species({
        name: req.body.name
    });
    
    try {
        const newKind = await kind.save();
        res.redirect('species');
    } catch {
        res.render('species/new', {
            species: kind,
            errorMessage: 'Error creating species'
        });
    }
});

module.exports = router;