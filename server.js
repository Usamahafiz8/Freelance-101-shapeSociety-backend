const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/connection");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
