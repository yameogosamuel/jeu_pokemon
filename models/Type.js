let mongoose = require('mongoose');

let typeSchema = new mongoose.Schema(
{
    name: String,
    color:
    {
        type: String,
        default: 'red'
    }
});

typeSchema.virtual('pokemons',
{
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'types'
});

// typeSchema.set('toObject', { virtuals: true });
// typeSchema.set('toJSON', { virtuals: true });

let Type = mongoose.model('Type', typeSchema);

module.exports = Type;
