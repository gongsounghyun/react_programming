const express = require('express');
const router = express.Router();
const { firestore } = require('../firebase');

//=================================
//             follow
//=================================

router.post("/followNumber", (req, res)=> {
  console.log("followNumber : ",req.userTo) 
  const followdata = [];
  firestore.collection('Follows').where('userTo','==',req.body.userTo).get()
  .then(function(docs){
    docs.forEach(function(doc){
      followdata.push(doc.data())
    })
    return res.status(200).json({ success : true, followNumber : followdata.length })
  })
})

router.post("/followed", (req, res)=> {
  console.log("followed : ",req.body)
  const followinfo = [];
  var followresult = false;
  firestore.collection('Follows').where('userTo', '==', req.body.userTo).where('userFrom','==',req.body.userFrom).get()
  .then(function(docs){
    docs.forEach(function(doc){
      followinfo.push(doc.data());
    })
    if(followinfo.length!==0){
      followresult=true;
    }
    res.status(200).json({ success : true, result : followresult })
  })
  .catch(function(err){
    if(err) return res.status(400).send(err)
  })
})

router.post("/unfollow", (req, res) => {

  var deledata = firestore.collection('Follows').where('userTo', '==', req.body.userTo).where('userFrom', '==', req.body.userFrom)
  deledata.get().then(function (docs) {
    docs.forEach(function (doc) {
      doc.ref.delete();
    })
    res.status(200).json({ success: true })
  })
    .catch(function (err) {
      if (err) return res.status(400).json({ success: false, err })
    })
  /*Subscriber.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    }).exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });*/
});

router.post("/follow", (req, res) => {
  firestore.collection('Follows').add({
    userTo: req.body.userTo,
    userFrom:req.body.userFrom,
  })
  .then(function(docs){
    res.status(200).json({ success: true });
  })
  .catch(function(err){
    if (err) return res.json({ success: false, err });
  })
});


module.exports = router;
