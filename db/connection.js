const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://usamahafiz8:i8BeInWRqzyEMVZ9@cluster0.ywes8ma.mongodb.net/`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
