const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }, (con) => console.log("Conection", con));
    console.log(`MongoDB Connection:`) 
  } catch (error) {
    console.log(error)
  }

  // const { MongoClient, ServerApiVersion } = require('mongodb');
  // const uri = "mongodb+srv://bruiz:<pwd>@bruizcluster.yqa1ibf.mongodb.net/?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  // client.connect(err => {
  //   console.log("Conected connection")
  //   // const collection = client.db("CarsDB").collection("cars");
  //   // perform actions on the collection object
  //   client.close();
  // });
  
  
}   
module.exports = {
  BASE_URL_LOCATIONS: process.env.BASE_URL_LOCATIONS,
  CLIENT_ID: process.env.CLIENT_ID,
  BASE_URL_CARS: process.env.BASE_URL_CARS,
  CLIENT_TOKEN_URL: process.env.CLIENT_TOKEN_URL,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  connectDB
};
