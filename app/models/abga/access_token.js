const axios = require("axios");
const { getError } = require("../../../core/utils");

const getAbgaAccessToken = async () => {
  try {
    let res = await axios.get(
      "https://stage.abgapiservices.com/oauth/token/v1",
      {
        headers: {
          client_id: "d59cf459",
          client_secret: "2f2119fd5bd178b7e84ba89f6cf51116",
        },
      }
    );

    return res.data.access_token
  } catch (error) {
    let err = getError(error);
    return false;
  }
};

module.exports = getAbgaAccessToken
