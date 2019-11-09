let express = require('express');
let router = express.Router();

let Type = require('./../models/Type');

router.get('/:type', (req, res) =>
{
    Type.findOne({name: req.params.type}).populate('pokemons').then(type =>
    {
        if (!type)
            return res.status(404).send("Type introuvable");
        res.render('types/show.html', {type: type, pokemons: type.pokemons});
    });
});

module.exports = router;
