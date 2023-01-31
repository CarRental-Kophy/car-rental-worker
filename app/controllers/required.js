const { errorMessage } = require("../../core/utils");

const isRequired = (req, res, next) => {
  const data = {
    pickupDate: req.body.pickupDate ?? "",
    pickupTime: req.body.pickupTime ?? "",
    dropOffDate: req.body.dropOffDate ?? "",
    dropOffTime: req.body.dropOffTime ?? "",
    pickupLocation: req.body.pickupLocation ?? "",
  }; 

  let requiredError = {};
  for (const i of Object.keys(data)) {
    if (data[i] === "") requiredError[i] = "Value cannot be empty";
  }

  if (Object.keys(requiredError).length > 0)
    return errorMessage(400, "Some Fields are required", requiredError)(res);

    next()
};

module.exports = isRequired;
