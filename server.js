const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require('morgan')
const mongoose = require('mongoose');


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

//Bodyparser Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// DB Config
const db = require('./config/keys').mongoURI
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.dir(err));

// API calls
app.use("/api/users", require("./routes/api/users"));


// deploy
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
// app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
