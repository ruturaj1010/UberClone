const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service")
const {sendMessageToSocketId} = require("../socket")
const rideModel = require("../models/rideModel")

module.exports.createRide = async (req, res) => {
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

        const pickUpCoord = await mapService.getAddressCoordinates(pickUp);

        const captainsInRadius = await mapService.getCaptainsInRadius(
            pickUpCoord.latitude,
            pickUpCoord.longitude,
            100 // radius in KM
        );

        ride.otp = "";

        const fullRide = await rideModel.findById(ride._id).populate("user");

        captainsInRadius.forEach(async (captain) => {
            
            sendMessageToSocketId(
                captain.socketId,
                "new-ride",
                fullRide
            );
        });

        return res.status(201).json({
            ride,
            captainsFound: captainsInRadius.length
        });

    } catch (error) {
        console.error("Error creating ride:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

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