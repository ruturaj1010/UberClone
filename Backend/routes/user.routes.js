const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const { body } = require("express-validator");

router.post("/register", [
    body("fullname.firstname").isLength({ min: 3 }).withMessage("Must contain atleast 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Must contain atleast 6 characters long"),
],
    userController.registerUser
)

router.post("/login" , [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Must contain atleast 6 characters long")
],
    userController.loginUser
)

module.exports = router;