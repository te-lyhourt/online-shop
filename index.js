const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();
const router = require('./routes/admin');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

const port = 3000;
const url = 'mongodb+srv://user1:123456789Te@cluster0.rbvla.mongodb.net/online_shop?retryWrites=true&w=majority';
mongoose.connect(url,{ useNewUrlParser:true,useUnifiedTopology: true })
.then(result=>{
    console.log("Db is connected");
}).catch(e=>{
    console.log(e);
})

app.listen(port , function(){
    console.log("server is running")
});