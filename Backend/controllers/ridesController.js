const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickUp, destination, vehicleType } = req.body;

        const user = req.user._id; 

        const ride = await rideService.createRide({
            user,
            pickUp,
            destination,
            vehicleType
        });
        return res.status(201).json({ ride });
    } catch (error) {
        console.error("Error creating ride:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.getFare = async (req, res ) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickUp, destination } = req.query;

        const fare = await rideService.calculateFare(pickUp, destination);

        return res.status(200).json({ fare });

    } catch (error) {
        console.error("Error calculating fare:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}