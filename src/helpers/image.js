import multer from 'multer';
import path from 'path';

const configsMulter = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './src/savesImgs/')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + String(Math.floor(Math.random() * 10000) + path.extname(file.originalname)));
    }
})


const upImage = multer({
    storage: configsMulter,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            cb(new Error('Invalid file!'));
        }
        cb(undefined, true);
    }
})

export default upImage;
