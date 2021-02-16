
const modul = require('../models/product');
const bcrypt = require("bcryptjs");
const Person = modul.person;
const Product = modul.product;
const moment = require('moment')

exports.createUser = (req,res)=>{
    const name = req.body.username;
    console.log(name)
    const email = req.body.email;
    console.log(email)
    const password = req.body.password;
    console.log(password)
    const conpasss = req.body.conpassword;
    const type = "user"
    const salt = bcrypt.genSaltSync(10);

    //check if input email exist
    Person.find({email: email}).then(result => {

        //if return empty object mean email not exist
        if(Object.keys(result).length === 0) {
            console.log("email not found")
            
            console.log(password)

            //check is password the same with confirm password
            if(password.localeCompare(conpasss)==0){
                //add new person
                const person = new Person({
                    name,
                    email,
                    password: bcrypt.hashSync(password, salt),
                    type
                }).save().then(result=>{
                console.log(result);
                console.log("uploaded person")
                res.redirect("/signIn")
                }).catch(e=>{
                    console.log(e);
                    console.log("save error")
                })
            //password not the same
            }else{
                res.render("signUp",{password: true ,email:false, message: "password and confirm password must be the same!"})
            }
            
        //email exist
        }else{
            console.log(result)
            res.render("signUp", {email: true,password:false, message: "email is already exist!"});
        }
    })
}

exports.checkUser = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    Person.find({email: email}).then(result => {
        if(result) {
            // if user exist, check given password with the encrypted password
            bcrypt.compare(password, result[0].password, function(err, passwordIsMatch) {
              if(passwordIsMatch) {
                
                res.redirect("/");
              } else {
                // else return fail
                res.render("signIn",{error: true , message: "incorrect password or email not exist!"})
              }
            })
        }
        else {
            res.render("signIn",{error:true, message: "incorrect password or email not exist!"})
        }
      }).catch(err => {
        console.log(err);
    })
}

exports.addProduct = (req,res)=>{
    const name = req.body.pname
    const date = moment().format('D MMM, YYYY');
    const image = req.file.filename
    const price = req.body.pprice;
    const discount = req.body.pdiscount;
    var priceAfterDC=0;
    if(discount!=0) priceAfterDC = price*(1-discount/100)

    const product = new Product({
        date ,
        name ,
        price,
        discount,
        priceAfterDC,
        detail : req.body.pdetail,
        qty : req.body.pqty,
        category : req.body.pcatagory,
        image
    }).save().then(product=>{
        console.log("successfully added");
    }).catch(e=>{
        console.log(e)
        console.log("add product fail");
    });
}

exports.deleteProduct = (req, res) => {
    const productID = req.params.productID;
    Product.findByIdAndRemove(productID)
        .then(() => {
          console.log('Post is deleted');
          
          location.reload("http://localhost:3000/admin"); 
        })
        .catch(err => {
          console.log(err);
    })
}