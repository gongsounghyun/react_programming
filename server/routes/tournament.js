const express = require('express');
const router = express.Router();
const { firestore } = require('../firebase');

router.post('/upload', (req, res) => {
    console.log("req.tourdata : ",req.body.health);
    console.log("req.tourdata : ",req.body.health.length);
    req.body.health.forEach(docs => {
        firestore.collection("HealthInfo").add({
            body:docs.body,
            id : docs.id,
            url : docs.url,
            name:docs.name,
            image:docs.image,
            title:docs.title,
            description:docs.description,
            view:docs.view
        })
        .then(docs => {
            console.log("docs.data() : ", docs.id);
        })
        .catch(err => {
            if (err) return res.status(400).send(err);
        })
    })
})

router.post('/getdata',(req, res)=> {
    const touranmentdata = []
    firestore.collection('Tournament').get()
    .then(docs => {
        docs.forEach(doc => {
            touranmentdata.push(doc.data())
        })
        console.log("touranmentdata : ", touranmentdata)
        res.status(200).json({ success: true, touranmentdata })
    })
    .catch(err => {
        if (err) return res.status(400).send(err);
    })
})

module.exports = router;