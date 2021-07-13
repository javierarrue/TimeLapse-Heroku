const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const statisticSchema = new Schema({
    total_sales: Number,
    total_earnings: Schema.Types.Decimal128,
    total_sold_products: Number
},{
    timestamps: true,
})

module.exports =  mongoose.model('statistics',statisticSchema);