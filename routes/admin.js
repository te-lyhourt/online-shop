const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const multer = require('multer')

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

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, './public/asset/upload');
    },
    //add back the extension
    filename: function (request, file, callback) {
        callback(null, Date.now() + " - " + file.originalname );
    }
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    }
}); 
  
  
router.post('/admin', upload.single('pimg'),postController.addProduct);

module.exports = router;