const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const multer = require('multer');
const { product } = require('../models/product');
var ObjectId = require('mongodb').ObjectID;

//home page
router.get('/', (req, res) => {
    product.find().sort({ _id: -1 }).then(products=>{
        if(Object.keys(products).length === 0) {
            res.render('Home page',{flag:false})
        }else{
            res.render('Home page', {
                productList: products,
                flag : true
            })
        }
    }
    ).catch(e=>{
        console.log(e)
    })
});

//product detail
router.get('/product/:productID',(req,res)=>{
    const productID = req.params.productID;
    console.log(productID)
    product.findOne({"_id":ObjectId(productID)}).then(product=>{
        res.render('product page',{
            product,
            flag: true
        })
    }

    ).catch(e=>{
        console.log(e)
    })
    
});

// sign in
router.get('/signIn', (req, res) => {
    res.render('signin',{error:false});
});

router.post('/signIn',postController.checkUser);

// sign up
router.get('/signUp', (req, res) => {
    res.render('signup',{email: false,password:false});
});

router.post('/signUp',postController.createUser);


// admin
router.get('/admin',(req, res) => {
    product.find().sort({ _id: -1 }).then(products=>{
        if(Object.keys(products).length === 0) {
            res.render('admin page',{flag:false})
        }else{
            res.render('admin page', {
                productList: products,
                flag : true
            })
        }
    }
    ).catch(e=>{
        console.log(e)
    })
})



router.delete('/admin/:productID', postController.deleteProduct); 

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