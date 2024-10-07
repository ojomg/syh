// mongo.js
const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://vyankateshc02:1JMQsU2Xl8LQvI4m@cluster0.2wk7j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual MongoDB connection string

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a schema for users (you can modify it as per your needs)
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


  const paymentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    tripName: { type: String, required: true },
    paymentArray: [
      { 
        paymentname: { type: String },
        payer: { type: String },
        payees: [{ name: String }],
        amount: { type: Number },
      },
    ],
    netAmountOwed: { type: Map, of: Number },
    members: [{ type: String, required: true }],
  });
// Create a model from the schema
const User = mongoose.model('User', userSchema);
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = {
    User,
    Payment
};













// module.exports = User;



// const mongoose = require("mongoose")
// mongoose.connect("")

// mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('MongoDB connection error:', err));

// // Define a schema for users (you can modify it as per your needs)
// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String
// });

// // Create a model from the schema
// const User = mongoose.model('User', userSchema);

// module.exports = User;

// // .then(()=>{
// //     console.log("mongodb connected");
// // })
// // .catch(()=>{
// //     console.log('failed');
// // })


// // const newSchema=new mongoose.Schema({
// //     email:{
// //         type:String,
// //         required:true
// //     },
// //     password:{
// //         type:String,
// //         required:true
// //     }
// // })



  
  

// // const collection = mongoose.model("collection",newSchema)

