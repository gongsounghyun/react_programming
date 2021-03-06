const express = require("express");
const router = express.Router();
const { firestore } = require("../firebase");

router.post("/upload", (req, res) => {
  console.log("req.tourdata : ", req.body.health);
  console.log("req.tourdata : ", req.body.health.length);
  req.body.health.forEach((docs) => {
    firestore
      .collection("HealthInfo")
      .add({
        body: docs.body,
        id: docs.id,
        url: docs.url,
        name: docs.name,
        image: docs.image,
        title: docs.title,
        description: docs.description,
        view: docs.view,
      })
      .then((docs) => {
        console.log("docs.data() : ", docs.id);
      })
      .catch((err) => {
        if (err) return res.status(400).send(err);
      });
  });
});

router.post("/saveFoods", (req, res) => {
  console.log("saveFoods 시작", req.body.savedFoods);
  req.body.savedFoods.forEach((doc) => {
    firestore
      .collection("EatLog")
      .doc(req.body.userId)
      .collection(req.body.date)
      .add({
        userId: req.body.userId,
        foodName: doc.name,
        foodCal: String(Math.ceil(doc.cal)),
        date: req.body.date,
      })
      .then((docs) => {
        console.log("docs.data() : ", docs.id);
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        if (err) return res.status(400).send(err);
      });
  });
});
/*firestore
    .collection("EatLog")
    .doc(req.body.userId)
    .collection(req.body.date)
    .add()
    .then((docs) => {
      docs.forEach(function (doc) {
        console.log(doc.data());
        postData.push({
          docId: doc.id,
          date: doc.data().date,
          foodCal: doc.data().foodCal,
          foodName: doc.data().foodName,
          userId: doc.data().userId,
        });
      });

      postData.sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; //내림차순정렬
      });

      console.log("getEatLog return: ", postData);
      res.status(200).json({ success: true, postData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
      console.log("getEatLog failed");
    });*/

router.post("/saveEatLog", (req, res) => {
  console.log("saveEatLog 시작");
  console.log("받은 데이터:", req.body);

  firestore
    .collection("EatLog")
    .doc(req.body.userId)
    .collection(req.body.date)
    .add({
      userId: req.body.userId,
      foodName: req.body.foodName,
      foodCal: req.body.foodCal,
      date: req.body.date,
    })
    .then(function (doc) {
      console.log("saveEatLog 성공");
      return res.status(200).json({ success: true });
    })
    .catch(function (error) {
      console.log("saveEatLog 실패");
      return res.status(200).json({ success: false, error });
    });
});

router.post("/getEatLog", (req, res) => {
  console.log("getEatLog 시작");
  const postData = [];
  firestore
    .collection("EatLog")
    .doc(req.body.userId)
    .collection(req.body.date)
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        console.log(doc.data());
        postData.push({
          docId: doc.id,
          date: doc.data().date,
          foodCal: doc.data().foodCal,
          foodName: doc.data().foodName,
          userId: doc.data().userId,
        });
      });

      postData.sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; //내림차순정렬
      });

      console.log("getEatLog return: ", postData);
      res.status(200).json({ success: true, postData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
      console.log("getEatLog failed");
    });
});

router.post("/deleteEatLog", (req, res) => {
  console.log("deleteEatLog 시작");
  console.log("받은 데이터:", req.body);

  firestore
    .collection("EatLog")
    .doc(req.body.userId)
    .collection(req.body.date)
    .doc(req.body.docId)
    .delete()
    .then(function (doc) {
      console.log("deleteEatLog 성공");
      return res.status(200).json({ success: true });
    })
    .catch(function (error) {
      console.log("deleteEatLog 실패");
      return res.status(200).json({ success: false, error });
    });
});

module.exports = router;
