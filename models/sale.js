const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const saleSchema = new Schema({
    total_buy: Schema.Types.Decimal128,
    total_purchased: Number,
    products:[String],
    month:{
        type: Number,
        default: (new Date()).getMonth()
    },
    year: {
        type: Number,
        default: (new Date()).getFullYear()
    }
},{
    timestamps: true
}
)

module.exports =  mongoose.model('sales',saleSchema);