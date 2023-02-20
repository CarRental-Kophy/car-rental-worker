const { successMessage } = require("../../../core/utils");
const getAbgaAccessToken = require("../../models/abga/access_token");
const getAbgaAvailableCars = require("../../models/abga/available-cars");
const getAbgaAvailableLocations = require("../../models/abga/car-locations");
const { searchCar } = require("../../models/search");
const searchParams = require("../worker");

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

const getAvaliableLocationsController = async (req, res, next) => {
  let body = req.body;
  let page = req?.query.page ?? 0;

  console.log("Running Location....");

  let token = await getAbgaAccessToken();
  if (!token) return;
  

  // Get available Location
  let locationData = {
    lat: body?.lat,
    lng: body?.lng,
    keyword: body?.pickupLocation,
    brand: "Avis,Payless,Budget",
    country_code: body?.country_code,
  };

  let locations = await getAbgaAvailableLocations(locationData, token);
  // if(locations?.length > 0)

  let pkdplocation = {
    pickup_date: getDateISO(body.pickupDateTime),
      dropoff_date: getDateISO(body.dropOffDateTime)
  }

  let searchLocations = locations.map((location) => {
    return {
      ...pkdplocation,
      pickup_location: location.code,
      dropoff_location: location.code,
      country_code: location.address.country_code,
      brand: location.brand,
    };
  });
  req.locations = searchLocations;
  req.token = token;
  return next();
};

function getDateISO(dateTime) {
  let date = new Date(dateTime);
  console.log(dateTime)
  let dt = date.toISOString().replace(".000Z", "");
  return dt;
}

module.exports = { makeSearch, getAvaliableLocationsController };
