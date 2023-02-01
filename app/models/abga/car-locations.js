const axios = require("axios");
const { BASE_URL_LOCATIONS, CLIENT_ID } = require("../../../core/config");
const { getError } = require("../../../core/utils");

const getAbgaAvailableLocations = async (keyWord, token) => {
  let brand = "Avis,Budget,Payless";
  let headers = {
    headers: {
      client_id: CLIENT_ID,
      Authorization: "Bearer " + token,
    },
  };
  try {
    let res = await axios.get(
      `${BASE_URL_LOCATIONS}?brand=${brand}&keyword=${keyWord}`,
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
