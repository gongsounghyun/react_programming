const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg")
const { firestore, firebase } = require('../firebase');
const del = require('del');


let storge = multer.diskStorage({
  destination: (req, res, cb) => { // 파일을 어디에 저장할지 설명
    cb(null, "uploads/videos");
  },
  filename: (req, file, cb) => {  // 
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png, mp4. is allowed'), false);
    }
    cb(null, true);
  }
});

const upload = multer({ storage: storge }).single("file"); // single 하나의 파일만 가능

//=================================
//             Video
//=================================
router.post("/uploadVideo", (req, res) => {


  console.log("req.video : ", req.body);

  //비디오 정보들을 저장한다.
  firestore.collection('Videos').add({
    id: req.body.id,
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    image: req.body.image,
    thumbnail: req.body.thumbnail,
    duration: req.body.duration,
    view: req.body.view,
  }).then(function (doc) {
    console.log("newUSer : " + doc.id)
    setTimeout(() => {
      del(['uploads/thumbnails/*']).then(paths => {
        console.log('thumbnails is delete : \n', paths.join('\n'));
      })
    }, 4000);
    return res.status(200).json({ success: true })
  }).catch(function (error) {
    return res.status(200).json({ success: false, error })
  });
})

router.post("/uploadfiles", (req, res) => {
  //비디오를 서버에 저장한다.
  console.log("파일정보 : ", req.files);
  upload(req, res, err => {
    if (err) { return res.json({ success: false, err }) }
    return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename })
  })
})


router.get("/getVideos", (req, res) => {
  //비디오를 데이터베이스에서 가져와서 클라이언트에 보낸다.
  const videoData = [];
  firestore.collection('Videos').get()
    .then(docs => {
      docs.forEach(function (doc) {
        videoData.push({
          docid: doc.id,
          id: doc.data().id,
          name: doc.data().name,
          title: doc.data().title,
          description: doc.data().description,
          url: doc.data().url,
          image: doc.data().image,
          thumbnail : doc.data().thumbnail,
          duration : doc.data().duration,
          view : doc.data().view,
        }),
          console.log('videoData : ', videoData)
      })
      res.status(200).json({ success: true, videoData })
    })
    .catch(function (err) {
      if (err) return res.status(400).send(err);
    })
})

router.post("/getVideoDetail", (req, res) => {
  console.log('req.body.videoId : ', req.body.videoId)
  firestore.collection('Videos').doc(req.body.videoId).get()
  .then(function(docs){
    console.log('doc.data() : ', docs.data());
    return res.status(200).json({ success: true, videoDetail : docs.data() });
  })
  .catch(function(err){
    if (err) return res.status(400).send(err);
  })
});

router.post("/addViewCount", (req, res) => {
  const upcount = firebase.firestore.FieldValue.increment(+1);
  let viewco = null;
  let seviewco = null;
  firestore.collection('Videos').doc(req.body.videoId).get()
    .then(function (docs) {
      console.log("videoIdData : ", docs.data().view + 1)
      viewco = docs.data().view;
      console.log("viewcount : ", viewco+1)
    });
  seviewco = viewco+1;
  firestore.collection('Videos').doc(req.body.videoId)
  .update({
    "view" : upcount
  })
  .then(function(doc){
    return res.status(200).json({ success: true });
  })
});



/*

router.post("/getSubscriptionVideos", (req, res) => {
  //자신의 아이디를 가지고 구독하는 사람들을 찾는다.
  Subscriber.find({ userFrom: req.body.userFrom }).exec(
    (err, subscriberInfo) s=> {
      console.log(subscriberInfo);
      if (err) return res.status(400).send(err);

      let subscribedUser = [];

      subscriberInfo.map((subscriber, index) => {
        subscribedUser.push(subscriber.userTo);
      });
      //찾은 사람들의 비디오를 가지고온다.
      Video.find({ writer: { $in: subscribedUser } }) //subscribedUser배열안에있는 모든 데이터를 writer에 대입함
        .populate("writer")
        .exec((err, videos) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, videos });
        });
    }
  );
});
*/
router.post("/thumbnail", (req, res) => {
  let fileDuration = "";
  let filePath = "";
  let name = "";
  const metadata = "";
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.log(metadata);
    fileDuration = metadata.format.duration;
  });
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("will generate " + filenames.join(","));
      console.log("filenames:", filenames);
      name = filenames[0];
      const metadata = "";
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      del(['uploads/videos/*']).then(paths => {
        console.log('video is delete : \n', paths.join('\n'));
      })
      return res.json({
        success: true,
        url: filePath,
        names: name,
        fileDuration: fileDuration,
      })
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.jpg",
    });
});
module.exports = router;
