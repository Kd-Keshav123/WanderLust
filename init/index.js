const mongoose = require("mongoose");
const initData = require("./data.js");           // Listing Data Here
const Listing = require("../models/listing.js");             // Schema defination and model Creation

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({ ...obj, owner: "69991ef79a3049a24fd4fb0a" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();