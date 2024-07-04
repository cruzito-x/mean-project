const moongoose = require("mongoose");
const { HOST, DATABASE } = process.env;
const mongodb = `mongodb://${HOST}/${DATABASE}`;

moongoose
  .connect(mongodb)
  .then(() => console.log("Successfully connected with MongoDB"))
  .catch((error) => console.log(`Error to connect: ${error.message}`));