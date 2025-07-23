const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captainModel");
const blacklistTokenModel = require("../models/blackListTokenModel");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" })
    }

    const isblacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isblacklisted) {
        return res.status(401).json({ message: "Unauthorized user" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized user" })
    }
}

module.exports.authCaptain = async ( req, res, next) => {

    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({message : "Unauthorized captain"});
    }

    const isblacklisted = await blacklistTokenModel.findOne({ token});
    if (isblacklisted) {
        return res.status(401).json({ message: "Unauthorized captain" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        req.captain = captain;

        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized captain" });
    }
}