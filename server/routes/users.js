const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require("moment");

const { auth } = require("../middleware/auth");
const { firestore } = require('../firebase');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user[0].id,
        isAdmin: req.user[0].role === 0 ? false : true,
        isAuth: true,
        email: req.user[0].email,
        name: req.user[0].name,
        role: req.user[0].role,
        image: req.user[0].image,
    });
});

router.post("/register", (req, res) => {
    firestore.collection('Users').add({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 0,
        image: req.body.image,
        token: null,
        tokenExp: null
    }).then(function (doc) {
        console.log("newUSer : " + doc.id)
        return res.status(200).json({ success: true })
    }).catch(function (error) {
        return res.status(200).json({ success: false, error })
    });
});

const generateToken = function (req, cb) {
    
    var tokeninfo = [];

    console.log("req data : ", req)
    console.log("req id : ", req[0].id);
    var token = jwt.sign(req[0].id, 'secret');
    var oneHour = moment().add(1, 'hour').valueOf();
    tokenExp = oneHour;
    tokeninfo.push({ token: token, tokenExp: tokenExp });

    firestore.collection('Users').doc(req[0].id).update({
        "token": token,
        "tokenExp": tokenExp
    }).then(function (doc) {
        console.log("token create & update success")
        cb(null, tokeninfo);
        console.log("tokeninfo : ", tokeninfo);
    }).catch(function (err) {
        return cb(err)
    })
}

router.post("/login", (req, res) => {
    const logindata = [];
    firestore.collection("Users").where("email", "==", req.body.email).get()
        .then(function (docs) {
            docs.forEach(function (doc) {
                console.log(doc.id + " => " + doc.data().email);
                logindata.push({
                    id: doc.id,
                    email: doc.data().email,
                    password: doc.data().password,
                    token: doc.data().token,
                    tokenExp: doc.data().tokenExp
                })
                console.log("로그인 데이터 ", logindata);
            })
            if (req.body.password === logindata[0].password) {
                console.log(
                    "로그인 데이터 : ", req.body.password,
                    "데이터베이스 데이터 : ", logindata[0].password
                );
                generateToken(logindata, (err, tokeninfo) => {
                    console.log("after token : ",tokeninfo[0].token)
                    if (err) return res.status(400).send(err);
                    res.cookie("w_authExp", tokeninfo[0].tokenExp);
                    res
                        .cookie("w_auth", tokeninfo[0].token)
                        .status(200)
                        .json({
                            loginSuccess: true, userId: logindata[0].id
                        });
                });
            }
            else {
                return res.json({ loginSuccess: false, message: "Wrong password" });
            }
        });
});

router.get("/logout", auth, (req, res) => {
    console.log("req.user[0].id : ", req.user[0].id);
    firestore.collection('Users').doc(req.user[0].id).update({
        "token": null,
        "tokenExp": null
    }).then(() => {
        return res.status(200).send({success: true});
    }).catch(function(err) {
        return res.json({ success: false, err });
    })
});


module.exports = router;
