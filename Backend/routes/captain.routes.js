const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captainController');

const { body } = require("express-validator")

router.post("/register", [
    body("fullname.firstname")
        .notEmpty().withMessage("First name is required")
        .isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),

    body("fullname.lastname")
        .optional()
        .isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),

    body("email")
        .isEmail().withMessage("Please enter a valid email address"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("vehicle.color")
        .notEmpty().withMessage("Vehicle color is required"),

    body("vehicle.plate")
        .notEmpty().withMessage("Vehicle plate number is required")
        .matches(/^[A-Z0-9]{1,10}$/).withMessage("Please enter a valid vehicle plate number"),

    body("vehicle.capacity")
        .notEmpty().withMessage("Vehicle capacity is required")
        .isInt({ min: 1 }).withMessage("Capacity must be at least 1"),

    body("vehicle.vehicleType")
        .notEmpty().withMessage("Vehicle type is required")
], captainController.registerCaptain);


module.exports = router;