const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const {
        bikeId,
        startDate,
        endDate,
        totalPrice
    } = req.body;

    if (!bikeId || !startDate || !endDate || !totalPrice) {
        res.status(400).json({ message: 'No booking data included' });
        return;
    }

    const booking = new Booking({
        user: req.user._id,
        bike: bikeId,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        status: 'pending',
        payment_status: 'pending'
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('bike', 'name image_url');

    if (booking) {
        // Allow user to see their own booking or admin to see any
        if (booking.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
            res.json(booking);
        } else {
            res.status(401).json({ message: 'Not authorized to view this booking' });
        }
    } else {
        res.status(404).json({ message: 'Booking not found' });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('bike', 'name image_url');
    res.json(bookings);
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    const bookings = await Booking.find({}).populate('user', 'id name').populate('bike', 'id name');
    res.json(bookings);
};

const cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
        if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        booking.status = 'cancelled';
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(404).json({ message: 'Booking not found' });
    }
};

module.exports = {
    createBooking,
    getBookingById,
    getMyBookings,
    getBookings,
    cancelBooking
};
