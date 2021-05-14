const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { firestore } = require('../firebase');

let storge = multer.diskStorage({
    destination: (req, res, cb) => { // 파일을 어디에 저장할지 설명
        cb(null, "uploads/image");
    },
    filename: (req, file, cb) => {  // 
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter:(req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'|| ext !== '.png' || ext !== '.jpg'){
            return cb(res.status(400).end('only jpg, png, mp4. is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage : storge }).single("file"); // single 하나의 파일만 가능

//=================================
//             Image
//=================================

router.post("/uploadImage", (req, res)=> {
  firestore.collection('Images').add({
    id: req.body.id,
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    image: req.body.image,
    view: req.body.view,
  })
  .then(function(docs){
    res.status(200).json({ success : true})
  })
  .catch(function(err){
    if(err) return res.json({ success : false, err})
  })
})

router.post("/uploadImagefiles", (req, res)=> {
  console.log("파일정보 : ", req.files);
  upload(req, res, err => {
    if (err) { return res.json({ success: false, err }) }
    return res.json({ success: true, url: res.req.file.path})
  })
})

router.get("/getImages", (req, res) => {
  const imageData = [];
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
          name : doc.data().name
        });
      })
      console.log("이미지 겟 데이터 : ", imageData)
      res.status(200).json({ success : true, image : imageData });
    })
    .catch(function(err){
      if(err) return res.status(400).send(err);
    })
})

/*//이미지 디테일 페이지 만들어야 함
router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ _id: req.body.videoId }) //id를 이용해서 찾고 클라이언트에서 보낸 비디오 아이디를 찾는다.
    .populate("writer") // 모든 정보를 가져오게 하기 위해서
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

//구독하는 사람의 파일 만들어야 함
router.post("/getSubscriptionVideos", (req, res) => {
  //자신의 아이디를 가지고 구독하는 사람들을 찾는다.
  Subscriber.find({ userFrom: req.body.userFrom }).exec(
    (err, subscriberInfo) => {
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
module.exports = router;
