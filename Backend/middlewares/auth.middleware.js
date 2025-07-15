const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized user" })
    }
}