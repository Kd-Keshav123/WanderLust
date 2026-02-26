const path = require("path");
require('dotenv').config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const initData = require("./data.js");           // Listing Data Here
const Listing = require("../models/listing.js");             // Schema defination and model Creation

const MONGO_URL = process.env.ATLASDB; // Or whatever variable name you used
main().then(() => { console.log("connected to DB"); });

async function main() {
  await mongoose.connect(MONGO_URL); 
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({ ...obj, owner: "69a0743b654ccbcc6f51f4bb" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();