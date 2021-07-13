const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: String,
    price: {
        type: Schema.Types.Decimal128,
        require: true
    },
    category: String,
    logo: String,

    benefits: String,
    content: String
});

module.exports = model('Product', productSchema);