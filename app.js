const App = require("./app/app");
const getAbgaAccessToken = require("./app/models/abga/access_token");
const { connectDB } = require("./core/config");
require("dotenv").config({path: '.env'});

connectDB();
const {searchRoute} = require("./routes/search.route");
const init = new App({ port: process.env.PORT || 8001 });

init.runApp([
  {
    path: "",
    object: searchRoute,
  }
]);
