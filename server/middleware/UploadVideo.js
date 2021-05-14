const firebase = require('../firebase');
const multer = require("multer");
const ImageUpload = multer({ dest: `Videos/`});
const uploadImage = ImageUpload.single("file");

const storge = multer.diskStorage({
    destination: (req, res, cb) => { // 파일을 어디에 저장할지 설명
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {  // 
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter:(req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'|| ext !== '.png'){
            return cb(res.status(400).end('only jpg, png, mp4. is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage : storge }).single("file"); // single 하나의 파일만 가능

module.exports = { uploadImage };
