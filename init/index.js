const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data.map((obj) => ({...obj,owner:"66e6dc8f19f2c9db1cc9778a",}));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized ");

// };

// initDB();
const initDB = async () => {
  await Listing.deleteMany({}); // Clear existing data

  // Create new array with owner added
  const modifiedData = initData.data.map((obj) => ({
    ...obj,
    owner:("66e70f218be84903b26c9133"), // Ensure this is an ObjectId
  }));

  // Insert the modified data with owner field
  await Listing.insertMany(modifiedData);
  console.log("Data was initialized");
};

initDB();




// Function to find all data from the database
// const findAllListings = async () => {
// try {
//   const listings = await Listing.find();
//   console.log("All Listings:", listings);
// } catch (err) {
//   console.log("Error retrieving listings:", err);
// }
// }; 
//   findAllListings();
