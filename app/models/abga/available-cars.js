const axios = require("axios");
const { CLIENT_ID, BASE_URL_CARS } = require("../../../core/config");
const { getError, errorMessage, successMessage } = require("../../../core/utils");
const pathURI = "v1/vehicles?";

const getAbgaAvailableCarsMultiModel = (data, token) => async (res) => {
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
      client_id: CLIENT_ID,
    },
  };

  let promises = await Promise.all(
    data.map((location) => {
      const queryParams = new URLSearchParams(location).toString();
      return axios
        .get(`${BASE_URL_CARS}${pathURI}${queryParams}`, headers)
        .then((res) => {
            let vehicles = res?.data?.vehicles
            let Vh = vehicles = vehicles.map((vehicle) => {
                return {...vehicle, brand: location.brand}
            });
            return successMessage(200, "", Vh)(null)})
        .catch((error) => {
            let err = getError(error);
            return errorMessage(400, err.message, err.data)(null)
        }); 
    })
  );

 return promises
};

const getAbgaAvailableCars = (data, token) => async (res) => {
  let promises = await Promise.all(data.map);

  const queryParams = new URLSearchParams(data).toString();
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
      client_id: CLIENT_ID,
    },
  };
  try {
    let res = await axios.get(
      `${BASE_URL_CARS}${pathURI}${queryParams}`,
      headers
    );
    return res.data.vehicles;
  } catch (error) {
    let err = getError(error);
    return errorMessage(err.status, err.message, err.data)(res);
  }
};

module.exports = {getAbgaAvailableCars, getAbgaAvailableCarsMultiModel};
