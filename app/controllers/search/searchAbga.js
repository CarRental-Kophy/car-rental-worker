const { successMessage } = require("../../../core/utils");
const {
  getAbgaAvailableCarsMultiModel,
} = require("../../models/abga/available-cars");

const searchAvailableCarsController = async (req, res, next) => {
  let locations = req.locations;
  let token = req.token;
  if (!locations) return; // error

  let availableCarsOptions = await getAbgaAvailableCarsMultiModel(
    locations,
    token
  )(res);

  let success = availableCarsOptions
    .filter((promise) => promise.status_code === 200)
    .map((data) => data.data);

  let retData = [];
  for (let index = 0; index < success.length; index++) {
    retData = [...retData, ...success[index]];
  }

  req.cars = {
    success: retData,
    failed: availableCarsOptions.filter(
      (promise) => promise.status_code === 400
    )[0],
  };
  return next();
};

module.exports = { searchAvailableCarsController };
