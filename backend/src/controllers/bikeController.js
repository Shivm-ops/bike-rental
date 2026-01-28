const Bike = require('../models/Bike');

// @desc    Fetch all bikes
// @route   GET /api/bikes
// @access  Public
const getBikes = async (req, res) => {
    const bikes = await Bike.find({});
    res.json(bikes);
};

// @desc    Fetch single bike
// @route   GET /api/bikes/:id
// @access  Public
const getBikeById = async (req, res) => {
    const bike = await Bike.findById(req.params.id);

    if (bike) {
        res.json(bike);
    } else {
        res.status(404).json({ message: 'Bike not found' });
    }
};

// @desc    Create a bike
// @route   POST /api/bikes
// @access  Private/Admin
const createBike = async (req, res) => {
    const {
        name,
        model,
        price_per_day,
        location,
        description,
        specs
    } = req.body;

    const image_url = req.file ? `/uploads/${req.file.filename}` : '';

    const bike = new Bike({
        name,
        model,
        price_per_day,
        image_url,
        location,
        description,
        specs: JSON.parse(specs || '{}') // Handle specs as JSON string if multipart
    });

    const createdBike = await bike.save();
    res.status(201).json(createdBike);
};

// @desc    Update a bike
// @route   PUT /api/bikes/:id
// @access  Private/Admin
const updateBike = async (req, res) => {
    const {
        name,
        model,
        price_per_day,
        location,
        description,
        specs,
        available
    } = req.body;

    const bike = await Bike.findById(req.params.id);

    if (bike) {
        bike.name = name || bike.name;
        bike.model = model || bike.model;
        bike.price_per_day = price_per_day || bike.price_per_day;
        bike.location = location || bike.location;
        bike.description = description || bike.description;
        bike.available = available !== undefined ? available : bike.available;
        if (specs) bike.specs = JSON.parse(specs);
        if (req.file) {
            bike.image_url = `/uploads/${req.file.filename}`;
        }

        const updatedBike = await bike.save();
        res.json(updatedBike);
    } else {
        res.status(404).json({ message: 'Bike not found' });
    }
};

// @desc    Delete a bike
// @route   DELETE /api/bikes/:id
// @access  Private/Admin
const deleteBike = async (req, res) => {
    const bike = await Bike.findById(req.params.id);

    if (bike) {
        await bike.deleteOne();
        res.json({ message: 'Bike removed' });
    } else {
        res.status(404).json({ message: 'Bike not found' });
    }
};

module.exports = {
    getBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike
};
