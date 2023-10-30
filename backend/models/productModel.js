const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
    }, 
    price: {
        type: Number,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    seller: {
        type: String,
        required: true 
    }, 
    seller_id: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
    },
    buyer_id: {
        type: String,
    } 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);