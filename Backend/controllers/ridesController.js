const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service")
const { sendMessageToSocketId } = require("../socket")
const rideModel = require("../models/rideModel");
const { Socket } = require("socket.io");

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

module.exports.getFare = async (req, res) => {
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

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captainId: req.captain._id });
        sendMessageToSocketId(ride.user.socketId, 'ride-confirmed', ride)
        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId, otp } = req.query;
        const ride = await rideService.startRide({ rideId, otp, captainId: req.captain._id });
        sendMessageToSocketId(ride.user.socketId, 'ride-started', ride);
        return res.status(200).json(ride);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.endRide = async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {rideId} = req.body;
        const ride = await rideService.endRide({rideId, captain : req.captain});
        sendMessageToSocketId(ride.user.socketId, 'ride-ended', ride);
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}
