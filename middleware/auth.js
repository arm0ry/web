// const config = require("config");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization").replace(/^Bearer\s/, '');

  // Check for token
  if (!token)
    return res.status(403).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    // jwt.verify(token, process.env.VITE_DYNAMIC_PUBLIC_TOKEN, function(err, decodedToken) {
    //   console.log(decodedToken)
    // });
    const decoded = jwt.verify(token, process.env.VITE_DYNAMIC_PUBLIC_TOKEN.replace(/\\n/g, '\n'),);
    // const decoded = jwt.verify(token, "cd");
    // Add user from payload
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(403).json({ msg: "Token is not valid" });
  }
}




module.exports = auth;
