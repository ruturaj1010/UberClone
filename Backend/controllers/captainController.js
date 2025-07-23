const captainModel = require("../models/captainModel");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blackListTokenModel");

module.exports.registerCaptain = async (req, res, next) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const captainExists = await captainModel.find({ email });

    if (captainExists) {
        return res.status(400).json({ message: "Captain already exits" })
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain(fullname.firstname, fullname.lastname, email, hashedPassword, vehicle.color, vehicle.plate, vehicle.capacity, vehicle.vehicleType);

    if (!captain) {
        return res.status(500).json({ message: "Failed to register captain" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({ token, captain })
}

module.exports.loginCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    };

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token);

    return res.status(200).json({ token, captain })
}

module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain;

    if (!captain) {
        return res.status(404).json({ message: "Captain not found" });
    }

    return res.status(200).json({ captain });
}


module.exports.logoutCaptain = async (req, res, next) => {

    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "failed to logout captain" });
        }

        await blacklistTokenModel.create({ token });

        res.clearCookie("token");

        return res.status(200).json({ message: "captain logged out successfully" }
        )

    } catch (error) {
        return res.status(500).json({ message: "Failed to logout captain" });
    }
}