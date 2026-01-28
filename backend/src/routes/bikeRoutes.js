const express = require('express');
const router = express.Router();
const {
    getBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike
} = require('../controllers/bikeController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getBikes)
    .post(protect, admin, upload.single('image'), createBike);

router.route('/:id')
    .get(getBikeById)
    .put(protect, admin, upload.single('image'), updateBike)
    .delete(protect, admin, deleteBike);

module.exports = router;
