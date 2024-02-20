const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const fetch = require("node-fetch");
// const { stringify } = require("querystring");
// const config = require("config");
// const ObjectId = require("mongodb").ObjectId;
const send_token = require("../../ethers/send.js");
const sponsored_start = require("../../ethers/sponsored_start.js");
const sponsored_respond = require("../../ethers/sponsored_respond.js");
const sponsored_tally = require("../../ethers/sponsored_tally.js");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   GET api/users/
// @desc
// @access  Private
router.get("/", auth, (req, res) => {

  const query = {
    address: new RegExp(req.user.verified_account.address, "i"),
  };
  User.findOne(query).then(async (user) => {
    if (user) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  }).catch(error => {
    return res.status(400).send(`${error}`);
  })
});

// @route   POST api/users/facuet
// @desc    Open Facuet
// @access  Private
router.post("/facuet", auth, (req, res) => {
  const { address } = req.body;
  // console.log(address);

  const query = {
    address: new RegExp(address, "i"),
  };

  User.findOne(query)
    .then(async (user) => {
      let lastRequestAt = 0;
      if (!user) {
        res.status(404).json({
          msg: `You are not a member yet. Please join our community.`,
        });
        return;
        // const newUser = new User({
        //   address: address,
        // });
        // await newUser.save()
      } else {
        lastRequestAt = Date.parse(user.lastRequestAt);
      }

      if (Date.now() >= lastRequestAt + 86400000 * 2) {
        const txhash = await send_token(address);

        User.updateOne({ address }, { lastRequestAt: Date.now() })
          .then((result) => {
            const { ok } = result;
            if (ok) {
              console.log(`You successfully received ETH.`);
            }
            return res.json({
              ...result,
              txhash,
              msg: "You successfully received ETH.",
            });
          })
          .catch((err) => {
            console.error(`Failed to uppdate "lastRequestAt": ${err}`);
            return res.json({
              ...result,
              txhash,
              msg: "You successfully received ETH.",
            });
          });
      } else {
        res
          .status(202)
          .json({
            msg: `Wait! You can only receive 0.02 tokens for two days.`,
            lastRequestAt: lastRequestAt,
          });
      }
    })
    .catch((err) => {
      console.error(`Somthing wrong: ${err}`);
      res.status(400).json({ msg: `Failed to open facuet`, err });
    });
});

// @route   POST api/users/sponsored_start
// @desc    Start on behalf of user
// @access  Private
router.post("/sponsored_start", async (req, res) => {
  const { seed, mission, missionId } = req.body;
  // console.log(req.body);

  const tx = await sponsored_start(seed, mission, missionId);

  if (tx === "Something went wrong.") {
    return res.status(404).json({ msg: tx });
  } else {
    console.log(tx)
    return res.status(202).json({
      "txhash": tx,
      "msg": "報到成功！ | You're good to go~",
    });
  }

})

// @route   POST api/users/sponsored_respond
// @desc    Respond on behalf of user
// @access  Private
router.post("/sponsored_respond", async (req, res) => {
  const { seed, mission, missionId, taskId, response, feedback } = req.body;
  // console.log(res);

  const tx = await sponsored_respond(seed, mission, missionId, taskId, response, feedback);

  if (tx === "Something went wrong.") {
    return res.status(404).json({ msg: tx });
  } else {
    console.log(tx)
    return res.status(202).json({
      "txhash": tx,
      "msg": "Thank you for your contribution!",
    });
  }
})

// @route   POST api/users/sponsored_tally
// @desc    Tally on behalf of user
// @access  Private
router.post("/sponsored_tally", async (req, res) => {
  const { seed, mission, missionId, taskId, response, feedback } = req.body;

  const tx = await sponsored_tally(taskId);

  if (tx === "Something went wrong.") {
    return res.status(404).json({ msg: tx });
  } else {
    console.log(tx)
    return res.status(202).json({
      "txhash": tx,
      "msg": "Thank you for your contribution!",
    });
  }
})

module.exports = router;
