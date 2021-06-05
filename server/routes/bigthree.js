const express = require("express");
const router = express.Router();
const { firestore } = require("../firebase");
const { Bigthree } = require("../models/Bigthree");

//=================================
//             Comment
//=================================

router.post("/saveBigthree", (req, res) => {
  console.log("삼대데이터:", req.body);

  firestore
    .collection("bigthrees")
    .doc(req.body.id)
    .set({
      id: req.body.id,
      //name: req.body.name,
      time: req.body.time,
      deadlift: req.body.deadlift,
      benchpress: req.body.benchpress,
      sum: req.body.sum,
      name: req.body.name,
      squat: req.body.squat,
      image: req.body.image,
    })
    .then(function (doc) {
      return res.status(200).json({ success: true });
    })
    .catch(function (error) {
      return res.status(200).json({ success: false, error });
    });
});

router.post("/getmybigthrees", (req, res) => {
  console.log("내 측정값 가져오기시작");
  const postData = [];
  firestore
    .collection("bigthrees")
    .doc(req.body.idinfo)
    .get()
    .then(function (docs) {
      postData.push(docs.data());
      console.log("mybigthree : ", postData);
      res.status(200).json({ success: true, postData: docs.data() });
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
          docId: doc.id,
          id: doc.data().id,
          name: doc.data().name,
          deadlift: doc.data().deadlift,
          benchpress: doc.data().benchpress,
          squat: doc.data().squat,
          sum: doc.data().sum,
          time: doc.data().time,
          image: doc.data().image,
        }),
          console.log("postData : ", postData);
      });

      postData.sort(function (a, b) {
        return b["sum"] - a["sum"];
      });

      res.status(200).json({ success: true, postData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

router.post("/changeimage", (req, res) => {
  console.log("bigthree changeimage 시작", req.body);
  firestore
    .collection("bigthrees")
    .where("id", "==", req.body.id)
    .get()
    .then(function (docs) {
      docs.forEach(function (doc) {
        firestore
          .collection("bigthrees")
          .doc(doc.id)
          .update({
            image: req.body.url,
          })
          .then(function (success) {
            return res.status(200).json({ success: true });
          })
          .catch(function (err) {
            if (err) return res.status(400).send(err);
          });
      });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

module.exports = router;
