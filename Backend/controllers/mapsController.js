const mapService = require('../services/maps.service');

const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json({
            success: true,
            data: coordinates
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Failed to get coordinates'
        });
    }
}

module.exports.getDistanceTime = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    
    const originCoords = await mapService.getAddressCoordinates(origin);
    const destinationCoords = await mapService.getAddressCoordinates(destination);

    if (!originCoords || !destinationCoords) {
      return res.status(400).json({
        success: false,
        message: "Unable to resolve coordinates for origin or destination",
      });
    }

    const result = await mapService.getDistanceAndTime(
      originCoords,
      destinationCoords
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("DISTANCE ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to get distance and time",
    });
  }
};