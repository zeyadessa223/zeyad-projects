require("dotenv").config();
const express = require("express");
//const bodyParser = require("body-parser");
const data = require("./db");
const router = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
//app.use(bodyParser.json({ limit: "10mb" }));
//app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json());
app.use(cors());
app.use("/userposts", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

data();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
