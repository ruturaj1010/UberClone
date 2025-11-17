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
        status: "ZERO_RESULTS",
        message: "Unable to resolve coordinates for origin or destination",
      });
    }

    const result = await mapService.getDistanceAndTime(
      originCoords,
      destinationCoords
    );

    const distanceText = `${(result.distance / 1000).toFixed(1)} km`;

    const durationText = formatDuration(result.duration);

    const formatted = {
      distance: {
        text: distanceText,
        value: Math.round(result.distance)
      },
      duration: {
        text: durationText,
        value: Math.round(result.duration)
      },
      status: "OK"
    };

    return res.status(200).json(formatted);

  } catch (error) {
    console.error("DISTANCE ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      status: "ERROR",
      message: "Failed to get distance and time"
    });
  }
};

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  if (hrs > 0) {
    return `${hrs} hour${hrs > 1 ? "s" : ""} ${remainingMins} min`;
  }

  return `${mins} min`;
}

module.exports.getSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { query } = req.query;

  try {
    const suggestions = await mapService.getSuggestions(query);

    return res.status(200).json({
      status: "OK",
      predictions: suggestions
    });

  } catch (error) {
    console.error("GET SUGGESTIONS ERROR:", error.message);

    return res.status(500).json({
      status: "ERROR",
      message: "Failed to fetch suggestions."
    });
  }
};
