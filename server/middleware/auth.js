const { firestore } = require('../firebase');
const jwt = require('jsonwebtoken');

const findByToken = function (token, cb) {
  let KeepUpData = [];
  jwt.verify(token, 'secret', function (err, decode) {
    firestore.collection('Users').where("token", "==", token).get()
      .then(function (docs) {
        docs.forEach(function (doc) {
          KeepUpData.push({
            id: doc.id,
            email: doc.data().email,
            password: doc.data().password,
            role : doc.data().role,
            image : doc.data().image,
            token: doc.data().token,
            tokenExp: doc.data().tokenExp,
            name : doc.data().name
          })
        })
        cb(null, KeepUpData); 
      }).catch(function (err) {
        return cb(err);
      })
  })
}

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  findByToken(token, (err, KeepUpData) => {
    if (err) throw err;
    if (KeepUpData.length == 0 ){
      console.log("token : ", token);
      return res.json({
        isAuth: false,
        error: true
      });
    }
    req.token = token;
    req.user = KeepUpData;
    
    next();
  });

};

module.exports = { auth };
