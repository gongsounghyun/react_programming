const express = require("express");
const router = express.Router();
const { firestore } = require("../firebase");
const { auth } = require("../middleware/auth");

//게시글
router.post("/savepost", (req, res) => {
  console.log(req.body);

  firestore
    .collection("freeboard")
    .add({
      title: req.body.title,
      description: req.body.description,
      name: req.body.name,
      time: req.body.time,
    })
    .then(function (doc) {
      return res.status(200).json({ success: true });
    })
    .catch(function (error) {
      return res.status(200).json({ success: false, error });
    });
});

router.get("/getposts", (req, res) => {
  const postData = [];
  firestore
    .collection("freeboard")
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        postData.push({
          freeboardId: doc.id,
          title: doc.data().title,
          //description: doc.data().description,
          name: doc.data().name,
          time: doc.data().time,
        }),
          console.log("postData : ", postData);
      });
      var sortingField = "time";

      postData.sort(function (a, b) {
        // 오름차순
        return b[sortingField] - a[sortingField];
      });

      res.status(200).json({ success: true, postData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

router.post("/getpost", (req, res) => {
  const docId = req.body.freeboardId;
  console.log(docId);
  const postData = [];

  //const postRef = firestore.collection("freeboard").doc(docId);
  firestore
    .collection("freeboard")
    .doc(docId)
    .get()
    .then(function (docs) {
      postData.push(docs.data());
      console.log("postData : ", postData);
      res.status(200).json({ success: true, postData: postData });
    });
});

router.post("/delpost", (req, res) => {
  const docId = req.body.postId;
  console.log("docid", docId);
  firestore
    .collection("freeboard")
    .doc(docId)
    .delete()
    .then(function (docs) {
      res.status(200).json({ success: true });
    });
});

// 게시글 끝

// 댓글
router.post("/savecomment", (req, res) => {
  console.log(req.body);

  firestore
    .collection("/freeboardComments")
    .add({
      content: req.body.content,
      name: req.body.name,
      postId: req.body.postId,
      time: req.body.time,
    })
    .then(function (doc) {
      return res.status(200).json({ success: true });
    })
    .catch(function (error) {
      return res.status(200).json({ success: false, error });
    });
});

router.post("/getcomments", (req, res) => {
  const commentsData = [];
  firestore
    .collection("freeboardComments")
    .where("postId", "==", req.body.freeboardId)
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        commentsData.push({
          commentId: doc.id,
          content: doc.data().content,
          //description: doc.data().description,
          name: doc.data().name,
          time: doc.data().time,
        });
      });

      var sortingField = "time";

      commentsData.sort(function (a, b) {
        // 오름차순
        return a[sortingField] - b[sortingField];
      });

      res.status(200).json({ success: true, commentsData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

//
module.exports = router;
