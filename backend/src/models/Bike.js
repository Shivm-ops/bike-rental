const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price_per_day: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    specs: {
        engine: String,
        power: String,
        weight: String,
        fuel_capacity: String
    }
}, {
    timestamps: true
});

const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;
