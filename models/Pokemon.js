let mongoose = require('mongoose');

let pokemonSchema = new mongoose.Schema(
{
    name: String,
    number: Number,
    description: String,
    picture: String,
    types: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Type'
        }
    ]
});

let Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemons');

module.exports = Pokemon;
