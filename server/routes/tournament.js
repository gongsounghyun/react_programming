const express = require('express');
const router = express.Router();
const { firestore } = require('../firebase');

router.post('/inputdata', (req, res) => {
    console.log("req.tourdata : ",req.body.tourdata);
    console.log("req.tourdata : ",req.body.tourdata.length);
    req.body.tourdata.forEach(docs => {
        firestore.collection("Touranment").add({
            name:docs.name,
            scientifcname:docs.scientifcname,
            info:docs.info,
            history:docs.history,
            effect:docs.effect,
            use:docs.use,
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