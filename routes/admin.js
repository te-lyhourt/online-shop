const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

// const multer = require('multer')
// //defind size of files
// var storage = multer.diskStorage({
//     //folder where u store image
//     destination: (req, file, cb) => {
//         cb(null, 'publice/asset/upload')
//     },
//     //name of the image
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + ' - ' + Date.now())
//     }
// });
 
// var upload = multer({ 
//     storage: storage , 
//     limits:{
//         fileSize:1024*1024*3
//     }
// });


router.get('/', (req, res) => {
    res.render('Home page');
});

router.get('/product',(req,res)=>{
    res.render('product page')
});

router.get('/signIn', (req, res) => {
    res.render('signin',{error:false});
});

router.post('/signIn',postController.checkUser);


router.get('/signUp', (req, res) => {
    res.render('signup',{email: false,password:false});
});

router.post('/signUp',postController.createUser);

router.get('/admin',(req,res)=>{res.render('admin page');})

// router.post('/admin',upload.single('Image'),postController.addProduct);

module.exports = router;