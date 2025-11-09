const captainModel = require("../models/captainModel");

module.exports.createCaptain = async (firstname, lastname, email, password, color, plate, capacity, type) => {

    if (!firstname || !email || !password || !color || !plate || !capacity || !type) {
        throw new Error("All fields are required");
    }

    const newCaptain = new captainModel({
        fullname: {
            firstname,
            lastname,
        },

        email,

        password,

        vehicle: {
            color,
            plate,
            capacity,
            type
        },
    });

    return await newCaptain.save();
}