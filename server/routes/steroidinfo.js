const express = require("express");
const router = express.Router();
const { firestore } = require("../firebase");

router.post("/searchSteroid", (req, res) => {
    console.log("searchSteroid 시작");
    const postData = [];
    firestore
      .collection("Steroid")
      .where("name", "==", req.body.steroidName)
      .get()
      .then((docs) => {
        docs.forEach(function (doc) {
          postData.push({
            docId: doc.id,
            name: doc.data().name,
          });
        });
  
        postData.sort(function (a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; //내림차순정렬
        });
  
        console.log("searchSteroid return: ", postData);
        res.status(200).json({ success: true, postData });
      })
      .catch(function (err) {
        if (err) return res.status(400).send(err);
        console.log("searchSteroid failed");
      });
  });

router.post("/getSteroidDetail", (req, res) => {
  console.log("getSteroidDetail 시작");
  firestore
    .collection("Steroid")
    .doc(req.body.steriodId)
    .get()
    .then(function (docs) {
      console.log("getSteroidDetail return : ", docs.data());
      res.status(200).json({ success: true, postData: docs.data() });
    });
});
router.get("/getSteroidList", (req, res) => {
  console.log("getSteroidList 시작");
  const postData = [];
  firestore
    .collection("Steroid")
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        postData.push({
          docId: doc.id,
          name: doc.data().name,
        });
      });

      postData.sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; //내림차순정렬
      });

      console.log("getSteroidList return: ", postData);
      res.status(200).json({ success: true, postData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
      console.log("getSteroidList failed");
    });
});

module.exports = router;
