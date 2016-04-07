var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    name: {
        type: String,
    },	
	price: {
        type: Number,
    }	
});