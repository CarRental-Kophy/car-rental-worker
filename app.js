const App = require("./app/app");
require("dotenv").config({path: './.env'});
const {searchRoute} = require("./routes/search.route");
const init = new App({ port: process.env.PORT || 8001 });

init.runApp([
  {
    path: "",
    object: searchRoute,
  }
]);
