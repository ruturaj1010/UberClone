const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const mapsController = require('../controllers/mapsController')

const { query } = require("express-validator")

router.get(
  "/get-coordinates",
  authMiddleware.authUser,
  [
    query("address")
      .isLength({ min: 5 })
      .withMessage("Address must be at least 5 characters long"),
  ],
  mapsController.getCoordinates
);

router.get(
  "/get-distance-time",
  authMiddleware.authUser,
  [
    query("origin")
      .isLength({ min: 5 })
      .withMessage("Origin must be at least 5 characters long"),
    query("destination")
      .isLength({ min: 5 })
      .withMessage("Destination must be at least 5 characters long")
  ],
  mapsController.getDistanceTime
);

module.exports = router;