const mongoose =require('mongoose')

const connectDB =()=>{
  return mongoose.connect('mongodb://127.0.0.1:27017/paintingwebsite')
  .then(()=>{
    console.log('connection succesfully')
  })
  .catch((err)=>{
  console.log(err)
  })
}
module.exports=connectDB