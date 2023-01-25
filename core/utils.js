const errorMessage =
  (code = 400, message = "Unknown Error", error = {}) =>
  (res = null) => {
    let data = {
      status_code: code,
      status: false,
      message,
      error,
    };
    if (!res) return data;
    res.status(code).json(data);
    return false;
  };
const successMessage =
  (code = 200, message = "Success", data = {}) =>
  (res = null) => {
    let resp = {
      status_code: code,
      status: true,
      message,
      data,
    };
    if (!res) return resp;
    res.status(code).json(resp);
    return true;
  };

const moneyFormat = (amount) => {
  return (+amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const getError = (err) => {
  let status =
    err?.response?.status === "undefined" ? 400 : err?.response?.status;
  let data = err?.response?.data === "undefined" ? {} : err?.response?.data;
  let message =
    err?.response?.message === "undefined"
      ? "Error Occured"
      : err?.response?.message;

  return {
    status,
    data,
    message,
  };
};

module.exports = {
  getError,
  errorMessage,
  successMessage,
  moneyFormat,
};
