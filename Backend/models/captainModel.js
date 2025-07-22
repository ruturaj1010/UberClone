const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        },
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },

    password: {
        type: String,
        required: true,
        Select: false,
        minlength: [6, "Password must be at least 6 characters long"]
    },

    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },

    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            match: [/^[A-Z0-9]{1,10}$/, "Please enter a valid vehicle plate number"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "auto", "bike"],
        }
    },

    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;