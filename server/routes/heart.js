const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");
const { firestore } = require('../firebase');

//=================================
//             heart
//=================================

router.post("/getHearts", (req, res) => {

    console.log("getheart: ", req.body);
    let variable = {}
    if (req.body.videoId) {
        const heartdata = [];
        firestore.collection('Hearts').where('videoId', "==", req.body.videoId).get()
            .then(function (docs) {
                docs.forEach(function (doc) {
                    heartdata.push(doc.data())
                })
                console.log("heartdata : ", heartdata)
                res.status(200).json({ success: true, heart: heartdata })
            })
            .catch(function (err) {
                if (err) return res.status(400).send(err);
            })
    } else {
        variable = { commentId: req.body.commentId }
        const heartdata = [];
        firestore.collection('Hearts').where('commentId', "==", req.body.commentId).get()
            .then(function (docs) {
                docs.forEach(function (doc) {
                    heartdata.push(doc.data())
                })
                console.log("heartdata : ", heartdata)
                res.status(200).json({ success: true, heart: heartdata })
            })
            .catch(function (err) {
                if (err) return res.status(400).send(err);
            })
    }
})

router.post("/upHeart", (req, res) => {
    console.log("upheart: ",req.body);
    if (req.body.videoId) {
        firestore.collection('Hearts').add({
            videoId: req.body.videoId,
            userId: req.body.userId,
        })
        .then(function (docs) {
            res.status(200).json({ success: true });
        })
        .catch(function (err) {
            if (err) return res.status(400).json({ success: false, err });
        })
    }
    else {
        firestore.collection('Hearts').add({
            commentId: req.body.commentId,
            userId: req.body.userId,
        })
        .then(function (docs) {
            res.status(200).json({ success: true });
        })
        .catch(function (err) {
            if (err) return res.status(400).json({ success: false, err });
        })
    }

})

router.post("/unHeart", (req, res) => {
    const data = [];
    console.log("unheart: ",req.body);
    let variable = {}
    if (req.body.videoId) {
        //console.log(req.body);
        var deledata = firestore.collection('Hearts').where('videoId', '==', req.body.videoId).where('userId','==',req.body.userId)
        deledata.get().then(function(docs){
            docs.forEach(function(doc){
                doc.ref.delete();
            })
            res.status(200).json({ success: true })
        })
        .catch(function(err){
            if (err) return res.status(400).json({ success: false, err })
        })
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
        var deledata = firestore.collection('Hearts').where('commentId',"==", req.body.commentId).where('userId',"==",req.body.userId)
        deledata.get().then(function(docs){
            docs.forEach(function(doc){
                doc.ref.delete();
            })
            res.status(200).json({ success: true })
        })
        .catch(function(err){
            if (err) return res.status(400).json({ success: false, err })
        })
    }
})



router.post("/imggetHearts", (req, res) => {

    console.log("getheart: ", req.body);
    let variable = {}
    if (req.body.imageId) {
        const heartdata = [];
        firestore.collection('Hearts').where('videoId', "==", req.body.imageId).get()
            .then(function (docs) {
                docs.forEach(function (doc) {
                    heartdata.push(doc.data())
                })
                console.log("heartdata : ", heartdata)
                res.status(200).json({ success: true, heart: heartdata })
            })
            .catch(function (err) {
                if (err) return res.status(400).send(err);
            })
    } else {
        variable = { commentId: req.body.commentId }
        const heartdata = [];
        firestore.collection('Hearts').where('commentId', "==", req.body.commentId).get()
            .then(function (docs) {
                docs.forEach(function (doc) {
                    heartdata.push(doc.data())
                })
                console.log("heartdata : ", heartdata)
                res.status(200).json({ success: true, heart: heartdata })
            })
            .catch(function (err) {
                if (err) return res.status(400).send(err);
            })
    }
})

router.post("/imgupHeart", (req, res) => {
    console.log("upheart: ",req.body);
    if (req.body.imageId) {
        firestore.collection('Hearts').add({
            imageId: req.body.imageId,
            userId: req.body.userId,
        })
        .then(function (docs) {
            res.status(200).json({ success: true });
        })
        .catch(function (err) {
            if (err) return res.status(400).json({ success: false, err });
        })
    }
    else {
        firestore.collection('Hearts').add({
            commentId: req.body.commentId,
            userId: req.body.userId,
        })
        .then(function (docs) {
            res.status(200).json({ success: true });
        })
        .catch(function (err) {
            if (err) return res.status(400).json({ success: false, err });
        })
    }

})

router.post("/imgunHeart", (req, res) => {
    const data = [];
    console.log("unheart: ",req.body);
    let variable = {}
    if (req.body.imageId) {
        //console.log(req.body);
        var deledata = firestore.collection('Hearts').where('imageId', '==', req.body.imageId).where('userId','==',req.body.userId)
        deledata.get().then(function(docs){
            docs.forEach(function(doc){
                doc.ref.delete();
            })
            res.status(200).json({ success: true })
        })
        .catch(function(err){
            if (err) return res.status(400).json({ success: false, err })
        })
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
        var deledata = firestore.collection('Hearts').where('commentId',"==", req.body.commentId).where('userId',"==",req.body.userId)
        deledata.get().then(function(docs){
            docs.forEach(function(doc){
                doc.ref.delete();
            })
            res.status(200).json({ success: true })
        })
        .catch(function(err){
            if (err) return res.status(400).json({ success: false, err })
        })
    }
})

module.exports = router;