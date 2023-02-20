const isRequired = require("../app/controllers/required");
const {
  getAvaliableLocationsController,
} = require("../app/controllers/search/location");
const {
  searchAvailableCarsController,
} = require("../app/controllers/search/searchAbga");
const carsModels = require("../app/models/cars.models");
const { successMessage } = require("../core/utils");

const Router = require("express").Router();

Router.post(
  "/search",
  getAvaliableLocationsController,
  searchAvailableCarsController,
  async (req, res) => {
    let cars = req.cars.success;
    if (cars.length > 0) {
      let createCars = await Promise.all(
        cars.map(async (car) => {
          //   let alreadyCreated = carsModels.find({ category });
          let alreadyCreated = await carsModels.findOne({
            "category.name": car.category.name,
            "category.model": car.category.model,
            "category.make": car.category.make,
          });

          if(alreadyCreated !== null) return alreadyCreated;
          let created = carsModels.create({...car});
          return created;
        })
      );
      return successMessage(200, "Available Cars", createCars)(res);
    } else {
      return successMessage(400, "No cars available", req.cars.failed)(res);
    }
  }
);
Router.get("/search", async (req, res) => {
  let alreadyCreated = await carsModels.findOne({
    "category.name": "Ford Fiesta or similar",
    "category.model": "Rio",
    "category.make": "Kia",
  });
  return successMessage(200, "Available Cars", alreadyCreated)(res);
});

/**
 * Get BYID
 */
Router.get("/car/:id", async (req, res) => {
  let alreadyCreated = await carsModels.findById(req.params.id);
  return successMessage(200, "Car", alreadyCreated)(res);
});

module.exports = { searchRoute: Router };
