const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { firestore, firebase } = require("../firebase");

let storge = multer.diskStorage({
  destination: (req, res, cb) => {
    // 파일을 어디에 저장할지 설명
    cb(null, "uploads/image");
  },
  filename: (req, file, cb) => {
    //
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" || ext !== ".png" || ext !== ".jpg") {
      return cb(res.status(400).end("only jpg, png, mp4. is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storge }).single("file"); // single 하나의 파일만 가능

//=================================
//             Image
//=================================

router.post("/addViewCount", (req, res) => {
  const upcount = firebase.firestore.FieldValue.increment(+1);

  firestore
    .collection("Images")
    .doc(req.body.imageId)
    .update({
      view: upcount,
    })
    .then(function (doc) {
      return res.status(200).json({ success: true });
    });
});

router.post("/uploadImage", (req, res) => {
  firestore
    .collection("Images")
    .add({
      id: req.body.id,
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      image: req.body.image,
      view: req.body.view,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(function (docs) {
      res.status(200).json({ success: true });
    })
    .catch(function (err) {
      if (err) return res.json({ success: false, err });
    });
});

router.post("/uploadImagefiles", (req, res) => {
  console.log("파일정보 : ", req.files);
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, url: res.req.file.path });
  });
});

router.get("/getImages", (req, res) => {
  const imageData = [];
  firestore
    .collection("Images")
    .get()
    .then(function (docs) {
      docs.forEach(function (doc) {
        imageData.push({
          docid: doc.id,
          description: doc.data().description,
          image: doc.data().image,
          title: doc.data().title,
          id: doc.data().id,
          view: doc.data().view,
          url: doc.data().url,
          name: doc.data().name,
          time: doc.data().time.toDate(),
        });
      });
      var sortingField = "time";

      imageData.sort(function (a, b) {
        // 오름차순
        return b[sortingField] - a[sortingField];
        // 13, 21, 25, 44
      });

      console.log("이미지 갯 데이터 : ", imageData);
      res.status(200).json({ success: true, image: imageData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

router.post("/FollowUser", (req, res) => {
  console.log("req.body.User : ", req.body.User);
  const imageData = [];
  firestore.collection("Images").where("name", "==", req.body.User).get()
    .then((docs) => {
      docs.forEach((doc) => {
        imageData.push({
          docid: doc.id,
          description: doc.data().description,
          image: doc.data().image,
          title: doc.data().title,
          id: doc.data().id,
          view: doc.data().view,
          url: doc.data().url,
          name: doc.data().name,
          time: doc.data().time.toDate(),
        });
      });
      console.log("data : ", imageData);
      res.status(200).json({ success: true, imageData });
    })
    .catch((err) => {
      if (err) return res.status(400).send(err);
    });
});

router.post("/deleteImages", (req, res) => {
  const imageData = [];
  console.log(req.body);
  firestore
    .collection("Images")
    .doc(req.body.id)
    .delete()
    .then((newlist) => {
      firestore
        .collection("Images")
        .where("id", "==", req.body.userId)
        .get()
        .then(function (docs) {
          docs.forEach(function (doc) {
            imageData.push({
              docid: doc.id,
              description: doc.data().description,
              image: doc.data().image,
              title: doc.data().title,
              id: doc.data().id,
              view: doc.data().view,
              url: doc.data().url,
              name: doc.data().name,
              time: doc.data().time.toDate(),
            });
          });
          console.log("이미지 갯 데이터 : ", imageData);
          res.status(200).json({ success: true, image: imageData });
        })
        .catch(function (err) {
          if (err) return res.status(400).send(err);
        });
    });

  /*const imageData = [];
  firestore.collection('Images').get()
    .then(function (docs) {
      docs.forEach(function(doc){
        imageData.push({
          docid : doc.id,
          description : doc.data().description,
          image : doc.data().image,
          title : doc.data().title,
          id : doc.data().id,
          view : doc.data().view,
          url : doc.data().url,
          name : doc.data().name,
          time: doc.data().time.toDate(),
        });
      })
      console.log("이미지 갯 데이터 : ", imageData)
      res.status(200).json({ success : true, image : imageData });
    })
    .catch(function(err){
      if(err) return res.status(400).send(err);
    })*/
});

router.post("/getImagelists", (req, res) => {
  const imageData = [];
  firestore
    .collection("Images")
    .where("id", "==", req.body.idinfo)
    .get()
    .then(function (docs) {
      docs.forEach(function (doc) {
        imageData.push({
          docid: doc.id,
          description: doc.data().description,
          image: doc.data().image,
          title: doc.data().title,
          id: doc.data().id,
          view: doc.data().view,
          url: doc.data().url,
          name: doc.data().name,
          time: doc.data().time.toDate(),
        });
      });
      res.status(200).json({ success: true, image: imageData });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

//이미지 디테일 페이지 만들어야 함
router.post("/getImageDetail", (req, res) => {
  const imageDetail = [];
  firestore
    .collection("Images")
    .doc(req.body.imageId)
    .get()
    .then(function (docs) {
      console.log("doc.data() : ", docs.data());
      imageDetail.push({
        docid: docs.id,
        id: docs.data().id,
        name: docs.data().name,
        title: docs.data().title,
        description: docs.data().description,
        url: docs.data().url,
        image: docs.data().image,
        view: docs.data().view,
      });
      return res.status(200).json({ success: true, imageDetail: docs.data() });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

router.post("/changeurl", (req, res) => {
  console.log("req.body.url : ", req.body);
  firestore
    .collection("Users")
    .doc(req.body.id)
    .update({
      image: req.body.url,
    })
    .then(function (docs) {
      firestore
        .collection("Images")
        .where("id", "==", req.body.id)
        .get()
        .then(function (doc) {
          doc.forEach(function (data) {
            firestore
              .collection("Images")
              .doc(data.id)
              .update({
                image: req.body.url,
              })
              .then(function (aa) {
                return res.status(200).json({ success: true });
              });
          });
        })
        .catch(function (err) {
          if (err) return res.status(400).send(err);
        });
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    });
});

module.exports = router;
