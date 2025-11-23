const { error } = require("console");
const rideModel = require("../models/rideModel");
const mapsService = require("./maps.service");
const crypto = require("crypto");

async function calculateFare(pickUpAddress, destinationAddress) {
  if (!pickUpAddress || !destinationAddress) {
    throw new Error("Pickup address and destination address are required.");
  }

  const pickUp = await mapsService.getAddressCoordinates(pickUpAddress);
  const destination = await mapsService.getAddressCoordinates(destinationAddress);

  if (!pickUp || !destination) {
    throw new Error("Failed to resolve coordinates.");
  }

  const distanceTime = await mapsService.getDistanceAndTime(pickUp, destination);

  const distanceInKm = distanceTime.distance / 1000;
  const duration = Math.round(distanceTime.duration / 60); // minutes

  const rates = {
    car:  { base: 50, perKm: 12,  perMin: 0.75 },
    auto: { base: 30, perKm: 10,  perMin: 0.50 },
    bike: { base: 20, perKm: 7,   perMin: 0.30 }
  };

  const round2 = (n) => Math.round(n * 100) / 100;

  const computeFare = (rate) => {
    const rawFare =
      rate.base +
      distanceInKm * rate.perKm +
      duration * rate.perMin;

    return round2(rawFare);
  };

  return {
    fares: {
      car: computeFare(rates.car),  
      auto: computeFare(rates.auto),
      bike: computeFare(rates.bike)
    },
    distanceKm: round2(distanceInKm),
    durationMinutes: duration
  };
}
module.exports.calculateFare = calculateFare;

function createOtp(length) {
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error("OTP length must be a positive integer");
    }
    const bytes = crypto.randomBytes(length);
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += (bytes[i] % 10).toString();
    }
    return otp;
}

module.exports.createRide = async ({ user, pickUp, destination, vehicleType }) => {
  if (!user || !pickUp || !destination || !vehicleType) {
    throw new Error("All fields are required to create a ride");
  }

  const { fares, distanceKm, durationMinutes } = await calculateFare(
    pickUp,
    destination
  );

  const fare = fares[vehicleType];
  if (!fare) {
    throw new Error("Invalid vehicle type");
  }

  const ride = new rideModel({
    user,
    pickUp,
    destination,
    vehicleType,
    fare,
    distance: distanceKm,
    duration: durationMinutes,
    otp: createOtp(4)
  });

  return await ride.save();
};

module.exports.confirmRide = async ({rideId, captainId }) =>{
  if(!rideId ) {
    throw new Error("ride id is invalid")
  }

  await rideModel.findOneAndUpdate({_id : rideId }, {
    status : "accepted",
    captain : captainId
  })

  const ride = await rideModel.findOne({_id : rideId}).populate('user');

  if(!ride) { 
    throw new Error("ride not found")
  }

  return ride;
}
