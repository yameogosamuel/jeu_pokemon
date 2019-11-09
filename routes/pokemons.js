let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Pokemon = require('./../models/Pokemon');
let Type = require('./../models/Type');


router.get('/', (req, res) => // displaying all pokemons sorted by pokedex number
{
    Pokemon.find({}).sort({number: 1}).populate('types').then(pokemons =>
    {
        res.render('pokemons/index.html', {pokemons: pokemons});
    });
});


router.get('/new', (req, res) =>// when creating a new pokemon
{
    Type.find({}).then(types =>
    {
        let pokemon = new Pokemon();
        res.render('pokemons/edit.html', {pokemon: pokemon, types: types, endpoint: '/'});
    })
});


router.get('/edit/:id', (req, res) => // when editing an existing pokemon
{
    if (mongoose.Types.ObjectId.isValid(req.params.id)) // if pokemon exists
    {
        Type.find({}).then(types =>
        {
            Pokemon.findById(req.params.id).then(pokemon =>
            {
                res.render('pokemons/edit.html', {pokemon: pokemon, types: types, endpoint: '/'+pokemon._id.toString()});
            });
        })
    }
    else // else redirecting user to the home page
        res.redirect('/');
});


router.get('/:id', (req, res) => // when clicking on a pokemon page
{
    if (mongoose.Types.ObjectId.isValid(req.params.id)) // if pokemon id exists
    {
        Pokemon.findById(req.params.id).populate('types').then(pokemon =>
        {
            res.render('pokemons/show.html', {pokemon: pokemon});
        });
    }
    else // else redirecting user to the home page
        res.redirect('/');
});

router.get("/delete/:id", (req, res) =>
{
    Pokemon.findOneAndRemove({_id: req.params.id}).then(() =>
    {
        res.redirect('/');
    });
});


router.post('/:id?', (req, res) => // when submitting form, determining if it's an edit or a new pokemon
{
    new Promise((resolve, reject) =>
    {
        if (req.params.id)
            Pokemon.findById(req.params.id).then(resolve, reject);
        else
            resolve(new Pokemon());
    }).then(pokemon =>
    {
        pokemon.name =  req.body.name;
        pokemon.number = req.body.number;
        pokemon.description = req.body.description;
        pokemon.types = req.body.types;
        if (req.file)
            pokemon.picture = req.file.filename;
        return pokemon.save();
    }).then(() =>
    {
        res.redirect('/');
    });
});

module.exports = router;
