const express = require("express");
const router = express.Router();
const { firestore } = require("../firebase");
const { Bigthree } = require("../models/Bigthree");

//=================================
//             Comment
//=================================

router.post("/saveBigthree", (req, res) => {
  console.log(req.body);

  firestore
    .collection("bigthrees")
    .add({
      name: req.body.name,
      deadlift: req.body.deadlift,
      benchpress: req.body.benchpress,
      squat: req.body.squat,
    })
    .then(function (doc) {
      return res.status(200).json({ success: true });
    })
    .catch(function (error) {
      return res.status(200).json({ success: false, error });
    });
});

router.get("/getBigthrees", (req, res) => {
  const postData = [];
  firestore
    .collection("bigthrees")
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        postData.push({
          freeboardId: doc.id,
          title: doc.data().title,
          name: doc.data().name,
          deadlift: doc.data().deadlift,
          benchpress: doc.data().benchpress,
          squat: doc.data().squat,
        }),
          console.log("postData : ", postData);
      });

      res.status(200).json({ success: true, postData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

module.exports = router;
