const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    min:0.01,
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    max:100,
    min:0,
  },
  priceAfterDC:{ 
    type : Number,
    min :0,
  },
  detail: String,
  image:{
    type:String
  },
  qty :{
    type: Number,
    min:1,
    required : true
  },
  category:{
    type:String,
  },
  date:String,
  review:[
    {
      authorName:{
        type:String,
        required:true
      },
      review:{
        type:String,
        required:true
      },
      Date:{
        type:String,
        required:true
      }
    }
  ]
}, {collection: 'products'});

const product = mongoose.model('Product', productSchema);

const persontSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min:3,
    required: true
  },
  type: {
    type: String, //user or admin
    required: true
  }
}, {collection: 'persons'});

const person = mongoose.model('Person', persontSchema);

module.exports = {person , product}