const { successMessage } = require("../../core/utils");
const getAbgaAccessToken = require("../models/abga/access_token");
const getAbgaAvailableCars = require("../models/abga/available-cars");
const getAbgaAvailableLocations = require("../models/abga/car-locations");
const { searchCar } = require("../models/search");
const searchParams = require("./worker");

const makeSearch = async (req, res, next) => {
  let body = req.body;
  let searchData = {
    pickupDateTime: getDateTime(body.pickupDate, body.pickupTime),
    returnDateTime: getDateTime(body.dropOffDate, body.dropOffTime),
    pickupLocation: body.pickupLocation,
    dropOffLocation: body.pickupLocation,
  };

  let searchBodyParams = searchParams(searchData);
  let searchResult = await searchCar(searchBodyParams)(res);
  if (!searchResult) return;
  res.json(searchResult);
};

function getDateTime(dt, tm) {
  let date = dt.replace(/[-\/_]/g, "");
  return `${date}-${tm}`;
}

const abgaAPIsearchController = async (req, res, next) => {
  let body = req.body;
  let page = req?.query.page ?? 0

  
  let token = await getAbgaAccessToken();
  if (!token) return;

  // Get available Location
  let locations = await getAbgaAvailableLocations(body.pickupLocation, token)
  let selectedLocation = locations[page];

  let searchParams = {
    pickup_date: getDateISO(body.pickupDateTime),
    dropoff_date: getDateISO(body.dropOffDateTime),
    pickup_location: selectedLocation.code,
    dropoff_location: selectedLocation.code,
    country_code: selectedLocation.address.country_code, 
    brand: selectedLocation.brand,
  };

  const cars = await getAbgaAvailableCars(searchParams, token)(res);
  if(!cars) return;
  return successMessage(200, "Available Cars", cars)(res);
};


function getDateISO(dateTime) {
  console.log(dateTime);
  let date = new Date(dateTime);
  let dt = date.toISOString().replace(".000Z", "");
  console.log(dt)
  return dt
}

module.exports = { makeSearch, abgaAPIsearchController };
