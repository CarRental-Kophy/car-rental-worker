const axios = require("axios");
const { getError } = require("../../../core/utils");

const BASE_URL = "https://stage.abgapiservices.com/cars/locations/v1";

const getAbgaAvailableLocations = async (keyWord, token) => {
  let brand = "Avis,Budget,Payless";
  let headers = {
    headers: {
      client_id: "d59cf459",
      Authorization: "Bearer " + token,
    },
  };
  try {
    let res = await axios.get(
      `${BASE_URL}?brand=${brand}&keyword=${keyWord}`,
      headers
    );
    return res.data.locations;
  } catch (error) {
    let err = getError(error);
    console.log(err);
    return false;
  }
};

module.exports = getAbgaAvailableLocations;
