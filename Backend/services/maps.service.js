const axios = require('axios');
const crypto = require('crypto');
const captainModel = require("../models/captainModel");


async function geocodeNominatim(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  const res = await axios.get(url, {
    headers: { "User-Agent": "your-app-name" }
  });

  if (res.data.length === 0) return null;

  return {
    latitude: parseFloat(res.data[0].lat),
    longitude: parseFloat(res.data[0].lon)
  };
}

async function geocodePhoton(address) {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`;

  const res = await axios.get(url);

  if (!res.data.features || res.data.features.length === 0) return null;

  const coords = res.data.features[0].geometry.coordinates;
  return {
    latitude: coords[1],
    longitude: coords[0]
  };
}

async function geocodeLocationIQ(address) {
  const key = process.env.LOCATIONIQ_KEY;
  if (!key) return null;

  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${encodeURIComponent(address)}&format=json&limit=1`;

  const res = await axios.get(url);

  if (res.data.length === 0) return null;

  return {
    latitude: parseFloat(res.data[0].lat),
    longitude: parseFloat(res.data[0].lon)
  };
}

module.exports.getAddressCoordinates = async (address) => {
  if (!address) throw new Error("Address is required.");

  // try Nominatim
  const fromNominatim = await geocodeNominatim(address);
  if (fromNominatim) return fromNominatim;

  // try Photon
  const fromPhoton = await geocodePhoton(address);
  if (fromPhoton) return fromPhoton;

  // try LocationIQ
  const fromLocationIQ = await geocodeLocationIQ(address);
  if (fromLocationIQ) return fromLocationIQ;

  // all failed
  throw new Error("Unable to find coordinates for the given address.");
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

function generatePlaceId(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

module.exports.getSuggestions = async (query) => {
  if (!query) throw new Error("Query is required.");

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "your-app-name" }
    });

    return response.data.map((item) => {
      const description = item.display_name;

      // find offset of user query in suggestion text
      const lowerDesc = description.toLowerCase();
      const lowerQuery = query.toLowerCase();
      const offset = lowerDesc.indexOf(lowerQuery);

      return {
        description: description,
        place_id: generatePlaceId(description),
        matched_substrings: offset !== -1 ? [
          {
            length: query.length,
            offset: offset
          }
        ] : [],
        structured_formatting: {
          main_text: description.split(",")[0],
          main_text_matched_substrings: offset !== -1 ? [
            { length: query.length, offset: offset }
          ] : [],
          secondary_text: description.replace(description.split(",")[0] + ", ", "")
        },
        terms: description.split(",").map((part) => ({
          offset: description.indexOf(part.trim()),
          value: part.trim()
        })),
        types: ["geocode"],
        geometry: {
          location: {
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon)
          }
        }
      };
    });

  } catch (err) {
    console.error("SUGGESTIONS ERROR:", err.response?.data || err);
    throw err;
  }
};

module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [ltd, lng], radius/6378.2 ]
      }
    }
  });

  return captains;
};
