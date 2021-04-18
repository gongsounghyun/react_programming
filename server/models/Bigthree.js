const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bigthreeSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId, 
        //이런식으로 설정하면 User모델에있는 모든 데이터들을 불러올 수있다.
        ref: 'User' //User모델에서 불러오기위해
    },
    deadlift: {
        type:String,
        maxlength:50,
    },
    benchpress: {
        type: String,
        maxlength:50,
    },
    squat: {
        type: String,
        maxlength:50,
    }
    }, { timestamps: true })


const Bigthree = mongoose.model('Bigthree', bigthreeSchema); //

module.exports = { Bigthree }