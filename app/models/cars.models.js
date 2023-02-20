const mongoose = require("mongoose");

let carsSchema = new mongoose.Schema(
  {
    category: Object,
    features: Object,
    capacity: Object,
    rate_totals: Object,
    brand: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cars", carsSchema);
