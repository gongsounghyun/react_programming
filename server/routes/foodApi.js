const express = require("express");
const Axios = require("axios");
const router = express.Router();


router.post("/getfoods", (req, res) => {
  console.log("리퀘스트값", req.body);
  var encodeStr = encodeURI(req.body.search);
  const foodinfos = [];

  Axios.get(
    `http://apis.data.go.kr/1470000/FoodNtrIrdntInfoService/getFoodNtrItdntList?serviceKey=TshKHslm6GmNATkZS2JeTC980GB82Sd0bKzKYVLFJot%2BZ%2BgAkwhD2202qIGevXZeTT%2FBfdn16iZfv3uOBuFzyQ%3D%3D&desc_kor=${encodeStr}&type=json&numOfRows=10
    `
  )
    .then((Response) => {
      const docs = Response.data.body.items;
      console.log(docs);
      res.status(200).json({success : true, data : docs});
    })
    .catch((Error) => {
      console.log(Error);
    });
});

router.get("/getfood", (req, res) => {
  console.log("시작");
  var encodeStr = encodeURI("바나나칩");
  const foodinfos = [];

  Axios.get(
    `http://apis.data.go.kr/1470000/FoodNtrIrdntInfoService/getFoodNtrItdntList?serviceKey=TshKHslm6GmNATkZS2JeTC980GB82Sd0bKzKYVLFJot%2BZ%2BgAkwhD2202qIGevXZeTT%2FBfdn16iZfv3uOBuFzyQ%3D%3D&desc_kor=${encodeStr}&type=json&numOfRows=100
    `
  )
    .then((Response) => {
      const docs = Response.data.body.items;
      console.log(docs);
      res.status(200).json({success : true, data : docs});
    })
    .catch((Error) => {
      console.log(Error);
    });
});

module.exports = router;
