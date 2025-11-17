const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
  if (!address) throw new Error("Address is required.");

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "your-app-name" }
    });

    if (response.data.length > 0) {
      const loc = response.data[0];
      return {
        latitude: parseFloat(loc.lat),
        longitude: parseFloat(loc.lon)
      };
    } else {
      throw new Error("Unable to find coordinates for the given address.");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};


module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required.");
  }

  const apiKey = process.env.ORS_API_KEY;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

  try {
    const response = await axios.post(
      url,
      {
        coordinates: [
          [origin.longitude, origin.latitude],
          [destination.longitude, destination.latitude]
        ]
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    const route = response.data.routes[0].summary;

    return {
      distance: route.distance, // in meters
      duration: route.duration, // in seconds
    };
  } catch (err) {
    console.error("ORS ERROR:", err.response?.data || err);
    throw err;
  }
};