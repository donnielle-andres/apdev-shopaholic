const mongoose = require('mongoose');

/*
    SCHEMA: Review 
    Desc: Information needed by the buyer to create a review for seller
*/

const ReviewSchema = new mongoose.Schema({

    
    sellerUN: {
        type: String,
        required: true,
    },

    buyerUN: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    reviewdesc: {
        type: String,
        required: true,
    },

    rate: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Review', ReviewSchema);