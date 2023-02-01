const axios = require("axios");
const {
  CLIENT_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
} = require("../../../core/config");
const { getError } = require("../../../core/utils");

const getAbgaAccessToken = async () => {
  try {
    let res = await axios.get(CLIENT_TOKEN_URL, {
      headers: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
    });

    return res.data.access_token;
  } catch (error) {
    let err = getError(error);
    return false;
  }
};

module.exports = getAbgaAccessToken;
