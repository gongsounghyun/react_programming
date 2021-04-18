const express = require('express');
const router = express.Router();
const { Image } = require("../models/Image");
const { Subscriber } = require("../models/Subscriber");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg")

let storge = multer.diskStorage({
    destination: (req, res, cb) => { // 파일을 어디에 저장할지 설명
        cb(null, "uploads/image");
    },
    filename: (req, file, cb) => {  // 
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter:(req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'|| ext !== '.png'){
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
    //비디오 정보들을 저장한다.
    const image = new Image(req.body);
    image.save((err, doc) => {
        if(err) return res.json({ success : false, err})
        res.status(200).json({ success : true})
    })

})

router.post("/uploadImagefiles", (req, res)=> {
    //비디오를 서버에 저장한다.
      upload(req, res, err => {
        if(err){
             return res.json({ success : false, err });
        }
        return res.json({ 
          success : true, 
          url : res.req.file.path, 
          filename : res.req.file.filename,
          //localpath : localfilepath,
          //localfilepath = "uploads/image" + res.req.file.filename,
        })
    })
})

router.get("/getImages", (req, res)=> {
  //비디오를 데이터베이스에서 가져와서 클라이언트에 보낸다.
  Image.find()//Video collection에있는 모든 데이터들을 찾는다.
      .populate('writer')//writer에 type으로 Schema.Types.ObjectId라고 지정을 해주었었는데 populate를 걸어줘야 user에있는 모든 데이터들을 들고올 수있다.
      //populate를 안걸어 줄 경우 writer의 id만 가져온다.
      .exec((err, image) => {
          if(err) return res.status(400).send(err);
          res.status(200).json({ success : true, image });
      })
})

//이미지 디테일 페이지 만들어야 함
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

module.exports = router;
