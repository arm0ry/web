const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const fetch = require("node-fetch");
// const { stringify } = require("querystring");
// const config = require("config");
// const ObjectId = require("mongodb").ObjectId;
const send_token = require("./ethers/send.js");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   GET api/users
// @desc
// @access  Public/Private
// TODO
router.get("/", (req, res) => {
  const newUser = new User({
    address: "0x3c0b9c1690A94Fcc6994402d1ed8754439941835",
  });
  newUser.save().then((user) => {
    res.json(user);
  });
});

// @route   POST api/users/facuet
// @desc    Open Facuet
// @access  Private
router.post("/facuet", auth, (req, res) => {
  const { address } = req.body;
  console.log(address);

  const query = {
    address: new RegExp(address, "i"),
  };

  User.findOne(query)
    .then(async (user) => {
      if (!user) {
        res.status(404).json({
          msg: ` Can't find anything.`,
        });
        return;
      }
      const lastRequestAt = Date.parse(user.lastRequestAt);
      if (Date.now() >= lastRequestAt + 86400000) {
        // send token
        // if success
        const txhash = await send_token(address);

        User.updateOne({ address }, { lastRequestAt: Date.now() })
          .then((result) => {
            const { ok, nModified } = result;
            // if (nModified === 0) {
            //   console.log(`not found any thing.`);
            //   res.status(404).json({
            //     msg: `Failed to uppdate user last request time: Can't find anything.`,
            //   });
            // }
            if (ok) {
              console.log(`Successfully open facuet.`);
            }
            res.json({...result, txhash});
          })
          .catch((err) => {
            console.error(`Failed to uppdate user last request time: ${err}`);
            return res
              .status(400)
              .json({
                msg: `Failed to uppdate user last request time: ${err}`,
                txhash
              });
          });
      } else {
        res
          .status(202)
          .json({ msg: `It's not time yet.`, lastRequestAt: lastRequestAt });
      }
    })
    .catch((err) => {
      console.error(`Failed to open facuet: ${err}`);
      res.status(400).json({ msg: `Failed to open facuet: ${err}` });
    });
});
module.exports = router;
