const axios = require('axios');
const { CLIENT_ID, BASE_URL_CARS } = require('../../../core/config');
const { getError, errorMessage } = require('../../../core/utils');
const pathURI = 'v1/vehicles?';

const getAbgaAvailableCars = (data, token) =>  async res =>{
    const queryParams = new URLSearchParams(data).toString();
    const headers = {headers: {
        Authorization: 'Bearer ' + token,
        client_id: CLIENT_ID
    }}
    try {
        let res = await axios.get(`${BASE_URL_CARS}${pathURI}${queryParams}`, headers)
        return res.data.vehicles
    } catch (error) {
        let err = getError(error)
        return errorMessage(err.status, err.message, err.data)(res);
    }
}

module.exports = getAbgaAvailableCars