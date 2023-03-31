const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;


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
