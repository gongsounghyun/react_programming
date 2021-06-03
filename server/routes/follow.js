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

router.get('/followlist',(req, res)=>{
  const follow = [];
  firestore.collection('Follows').get()
  .then(docs =>{
    docs.forEach(doc =>{
      follow.push(doc.data());
    })
    console.log('follow : ',follow)
    res.status(200).json({ success: true, follow:follow });
  })
  .catch(err =>{
    if (err) return res.json({ success: false, err });
  })
})

router.post("/followother", (req, res) => { // 내가 팔로우한 사람
  const userdata = [];
  const userlist = [];
  firestore.collection('Follows').where('userFrom', '==', req.body.idinfo).get()
  .then(docs => {
    docs.forEach(user => {
      userlist.push({
        id: user.data().userTo
      })
    })
    userlist.forEach(arr => {
      firestore.collection('Users').doc(arr.id).get()
      .then(doc => {
        userdata.push({
          docid: doc.id,
          name: doc.data().name,
          image: doc.data().image,
          email: doc.data().email,
        })
        if(userdata.length === userlist.length){
          res.status(200).json({ success: true, userdata:userdata });
        }
      })
    })
  })
});

router.post("/followto", (req, res) => {// 나를 팔로우한 사람
  const userdata = [];
  const userlist = [];
  firestore.collection('Follows').where('userTo', '==', req.body.idinfo).get()
  .then(docs => {
    docs.forEach(user => {
      userlist.push({
        id: user.data().userFrom
      })
      console.log(userlist)
    })
    userlist.forEach(arr => {
      firestore.collection('Users').doc(arr.id).get()
      .then(doc => {
        userdata.push({
          docid: doc.id,
          name: doc.data().name,
          image: doc.data().image,
          email: doc.data().email,
        })
        if(userdata.length === userlist.length){
          console.log("ex4", userdata)
          res.status(200).json({ success: true, userdata:userdata });
        }
      })
    })
  })
});

router.post("/followcount", (req, res) => {
  const userlist = [];
  firestore.collection('Follows').where('userFrom', '==', req.body.idinfo).get()
  .then(docs => {
    docs.forEach(user => {
      userlist.push({
        id: user.data().userTo
      })
    })
    res.status(200).json({ success: true, usercount:userlist.length });
  })
});

router.post("/followercount", (req, res) => {
  const userlist = [];
  firestore.collection('Follows').where('userTo', '==', req.body.idinfo).get()
  .then(docs => {
    docs.forEach(user => {
      userlist.push({
        id: user.data().userFrom
      })
    })
    res.status(200).json({ success: true, usercount:userlist.length });
  })
});

module.exports = router;
