const captainModel = require("../models/captainModel");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain(fullname.firstname, fullname.lastname, email, hashedPassword, vehicle.color, vehicle.plate, vehicle.capacity, vehicle.vehicleType);

    if (!captain) {
        return res.status(500).json({ message: "Failed to register captain" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({ token, captain })
}