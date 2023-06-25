

const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const fetch = require("node-fetch");
// const { stringify } = require("querystring");
// const config = require("config");
// const ObjectId = require("mongodb").ObjectId;
const auth = require("../../middleware/auth");

// User Model
// const User = require("../../models/User");

// @route   GET api/users
// @desc    
// @access  Public
router.get("/", (req, res) => {
  res.send("hello")
})

// @route   POST api/users/facuet
// @desc    Facuet
// @access  Private
router.post("/facuet", auth, (req, res) => {
    const {
      address
    } = req.body;
    console.log(address)
    
    // const query = { address: new RegExp(address, "i") }

    res.json({address});
    
    // const update = {
    //   $push: {
    //     appts: {
    //       name: name,
    //       time: time,
    //       user_id: user_id,
    //       family: [family],
    //       Nvisitors: Nvisitors,
    //       upstairs: upstairs,
    //       createDate: createDate,
    //       createBy: { name: "親友", _id: req.user.id },
    //       _id: myAppt_id,
    //     },
    //   },
    // };
    // User.findOne(query)
    //   .then((user) => {
    //     if (user.timestamp >= 123) {
    //         // send token
    //         // if success
            
    //         Admin.updateOne({ address: address }, { timestamp })
    //           .then((result) => {
    //             const { ok, nModified } = result;
    //             if (nModified === 0) {
    //               console.log(`not found any thing.`);
    //               res.status(404).json({
    //                 msg: `Failed to  uppdate admin profile: Can't find anything.`,
    //               });
    //             }
    //             if (ok) {
    //               console.log(`Successfully uppdate admin profile.`);
    //             }
    //             res.json(result);
    //           })
    //           .catch((err) => {
    //             console.error(`Failed to uppdate admin profile: ${err}`);
    //             return res
    //               .status(400)
    //               .json({ msg: `Failed to uppdate admin profile: ${err}` });
    //           });
    //     }
    //     console.log(appt);
    //     if (appt) {
    //       let appttime = 0;
    //       for (let index = 0; index < appt.appts.length; index++) {
    //         if (appt.appts[index].time === time) {
    //           appttime += 1;
    //         }
    //       }
    //       const llllimitGps = upstairs
    //         ? 3 > appt.limitGps
    //           ? appt.limitGps
    //           : 3
    //         : appt.limitGps;
    //       // console.log({ length: appttime, limitGps: llllimitGps });
    //       if (appttime < llllimitGps) {
    //         appt
    //           .updateOne(update)
    //           .then((result) => {
    //             res.json({ ...result, auth_id: req.user.id });
    //           })
    //           .catch((err) => {
    //             throw err;
    //           });
    //       } else {
    //         console.error(`Failed to add Appointment: Appointment is full`);
    //         res.status(404).json({
    //           msg: `Failed to add Appointment: Appointment is full`,
    //         });
    //       }
    //       // return { ...appt, appttime };
    //     } else {
    //       console.error(
    //         `Failed to add Appointment: Can't find anything or There is  alerady an appointment.`
    //       );
    //       res.status(404).json({
    //         msg: `Failed to add Appointment: Can't find anything or There is  alerady an appointment.`,
    //       });
    //       // throw {
    //       //   msg: `Failed to add Appointment: Can't find anything or There is  alerady an appointment.`,
    //       // };
    //     }
    //   })
    //   // .then((appt) => {
    //   //   console.log(appt);
    //   //   console.log({ length: appt.appttime, limitGps: appt._doc.limitGps });
    //   //   if (appt.appttime < appt._doc.limitGps) {
    //   //     appt.updateOne(update).catch((err) => {
    //   //       throw err;
    //   //     });
    //   //   } else {
    //   //     console.error(`Failed to add Appointment: Appointment is full`);
    //   //     res.status(404).json({
    //   //       msg: `Failed to add Appointment: Appointment is full`,
    //   //     });
    //   //   }
    //   // })
    //   .catch((err) => {
    //     console.error(`Failed to add review: ${err}`);
    //     res.status(400).json({ msg: `Failed to add review: ${err}` });
    //   });
  });
  module.exports = router;