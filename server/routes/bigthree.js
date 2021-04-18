const express = require('express');
const router = express.Router();
const { Bigthree } = require("../models/Bigthree");


//=================================
//             Comment
//=================================

router.post("/saveBigthree", (req, res)=> {
    const bigthree = new Bigthree(req.body);

    bigthree.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
})


router.get("/getBigthrees", (req, res)=> {
    //비디오를 데이터베이스에서 가져와서 클라이언트에 보낸다.
    Bigthree.find()//Video collection에있는 모든 데이터들을 찾는다.
        .populate('writer')//writer에 type으로 Schema.Types.ObjectId라고 지정을 해주었었는데 populate를 걸어줘야 user에있는 모든 데이터들을 들고올 수있다.
        //populate를 안걸어 줄 경우 writer의 id만 가져온다.
        .exec((err, bigthrees) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success : true, bigthrees });
        })
});
module.exports = router;
