
const modul = require('../models/product');
const bcrypt = require("bcryptjs");
const Person = modul.person;
const Product = modul.product;


exports.createUser = (req,res)=>{
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const conpasss = req.body.conpassword;
    const type = "user"
    const salt = bcrypt.genSaltSync(10);

    //check if input email exist
    Person.find({email: email}).then(result => {
            
        //if return empty object mean email not exist
        if(Object.keys(result).length === 0) {
            console.log("email not found")
            
            //check length of password
            if(password.length>2){

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
                        res.render("signIn", {error: true, message: "Password incorrect"});
                    })
                //password not the same
                }else{
                    res.render("signUp")
                    console.log("password and confirm password must be the same")
                }
            }else{
                res.render("signUp")
                console.log("password need to be at least 8 characters")
            }
            
        //email exist
        }else{
            console.log(result)
            
            res.render("signUp")
            console.log("email is already exist")
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
                res.render("signin");
                console.log("wrong password check")
              }
            })
        }
        else {
            res.render("signIn");
            console.log("email doesnt exist")
        }
      }).catch(err => {
        console.log(err);
    })
}

// exports.addProduct = (req,res)=>{
//     const name = req.body.name;
//     const qty = req.body.qty;
//     const detail = 

// }




exports.getProduct = (req,res)=>{
    product.find(function(e,results){
        if(e){
            console.log(e)
        }else{
            console.log(results)
        }
    })
}

exports.getperson = (req,res)=>{
    person.find(function(e,results){
        if(e){
            console.log(e)
        }else{
            console.log(results)
        }
    })
}