const axios = require('axios');
const { getError, errorMessage } = require('../../../core/utils');
const ABGAURI = 'https://stage.abgapiservices.com:443/cars/catalog/'
const pathURI = 'v1/vehicles?';
const clientID = 'd59cf459'

const getAbgaAvailableCars = (data, token) =>  async res =>{
    const queryParams = new URLSearchParams(data).toString();
    const headers = {headers: {
        Authorization: 'Bearer ' + token,
        client_id: clientID
    }}
    try {
        let res = await axios.get(`${ABGAURI}${pathURI}${queryParams}`, headers)
        return res.data.vehicles
    } catch (error) {
        let err = getError(error)
        return errorMessage(err.status, err.message, err.data)(res);
    }
}

module.exports = getAbgaAvailableCars