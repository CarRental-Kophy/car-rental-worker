const axios = require("axios");
const { BASE_URL_LOCATIONS, CLIENT_ID } = require("../../../core/config");
const { getError } = require("../../../core/utils");

const getAbgaAvailableLocations = async (query, token) => {
  query = new URLSearchParams(query).toString()
  let headers = {
    headers: {
      client_id: CLIENT_ID,
      Authorization: "Bearer " + token,
    },
  };
  try {
    let res = await axios.get(
      `${BASE_URL_LOCATIONS}?${query}`,
      headers
    );
    return res.data.locations;
  } catch (error) {
    let err = getError(error);
    // console.log(err);
    return false;
  }
};

module.exports = getAbgaAvailableLocations;
