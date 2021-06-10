const express = require("express");
const router = express.Router();
const { firestore } = require("../firebase");

//=================================
//             videoComment
//=================================

router.post("/saveComment", (req, res) => {
  firestore.collection("VideoComments").add({
      id: req.body.id,
      content: req.body.content,
      name: req.body.name,
      postId: req.body.postId,
      image: req.body.image,
      responseTo: req.body.responseTo,
      time: Date.now(),
    })
    .then(function (docs) {
      const recoment = [];
      recoment.push({
        id: docs.id,
        content: req.body.content,
        postId: req.body.postId,
        image: req.body.image,
        responseTo: req.body.responseTo,
        name: req.body.name,
      });
      console.log("recoment : ", docs.id);
      res.status(200).json({ success: true, recoment: recoment });
    })
    .catch(function (err) {
      if (err) return res.json({ success: false, err });
    });
});

router.post("/getComments", (req, res) => {
  const commentdata = [];
  firestore
    .collection("VideoComments")
    .where("postId", "==", req.body.videoId)
    .get()
    .then(function (docs) {
      docs.forEach(function (doc) {
        commentdata.push({
          docid: doc.id,
          id: doc.data().id,
          name: doc.data().name,
          content: doc.data().content,
          responseTo: doc.data().responseTo,
          image: doc.data().image,
          postId: doc.data().postId,
          time: doc.data().time,
        });
      });
      var sortingField = "time";

      commentdata.sort(function (a, b) {
        // 오름차순
        return a[sortingField] - b[sortingField];
        // 13, 21, 25, 44
      });
      console.log("getComment : ", commentdata);
      res.status(200).json({ success: true, comments: commentdata });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

router.post("/changeimage", (req, res) => {
  firestore
    .collection("VideoComments")
    .where("id", "==", req.body.id)
    .get()
    .then(function (docs) {
      docs.forEach(function (doc) {
        firestore
          .collection("VideoComments")
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
