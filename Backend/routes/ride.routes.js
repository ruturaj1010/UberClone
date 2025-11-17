const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ridesController = require('../controllers/ridesController');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create',
    authMiddleware.authUser,
        [
            body('pickUp').not().isEmpty().withMessage('Pickup location is required'),
            body('destination').not().isEmpty().withMessage('Destination is required'),
            body('vehicleType').isIn(['car', 'auto', 'bike']).withMessage('Invalid vehicle type')
        ],
        ridesController.createRide
    );

module.exports = router;