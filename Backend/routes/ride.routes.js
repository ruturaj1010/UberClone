const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const ridesController = require('../controllers/ridesController');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create-ride',
    authMiddleware.authUser,
        [
            body('pickUp').not().isEmpty().withMessage('Pickup location is required'),
            body('destination').not().isEmpty().withMessage('Destination is required'),
            body('vehicleType').isIn(['car', 'auto', 'bike']).withMessage('Invalid vehicle type')
        ],
        ridesController.createRide
    );

router.get('/get-fare', 
    authMiddleware.authUser,
    [
        query('pickUp').isString().withMessage('Pickup location is required'),
        query('destination').isString().withMessage('Destination is required')
    ],
    ridesController.getFare
)

router.post('/confirm', 
    authMiddleware.authCaptain,
    [
        body('rideId').isMongoId().withMessage("Invalid ride Id")
    ],
    ridesController.confirmRide
)

module.exports = router;