const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const mapsController = require('../controllers/mapsController')

const { body } = require("express-validator")

router.get('/get-coordinates',
    [ body('address').isLength({ min: 5 }).withMessage('Address must be at least 5 characters long') ],
    authMiddleware.authUser, mapsController)

module.exports = router;