

const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.DB_URL

mongoose.connect(
    uri
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then((res)=>{
    console.log("Connected To Database");
})
.catch((err)=>{
    console.log(err.message)
});