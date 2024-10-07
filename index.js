const express = require('express');
const cors = require('cors');
const { User,Payment } = require("./mongo"); // Import the User model from mongo.js
const app = express();
const bodyParser = require('body-parser');
// const Payment = require('./models/Payment');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            // Compare the provided password with the stored password
            if (password === user.password) { // Ideally use bcrypt to compare
                res.json({ status: "success" });
            } else {
                res.json({ status: "invalid_password" });
            }
        } else {
            res.json({ status: "not_found" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await User.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            const newUser = new User({ email, password });
            await newUser.save(); // Save the new user to the database
            res.json("notexist");
        }

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ status: "fail" });
    }
});



app.get("/api/create-trip", (req, res) => {
  res.send("create-trip");
});

app.get(`/storepayment`, async (req, res) => {
    const { email } = req.query;
    console.log('Query email:', email);
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      // Fetch payments from the database
      const payments = await Payment.find({email: email});
  
      // Convert payments to a JSON object that matches the paymentSchema
      const paymentData = payments.map(payment => ({
        email: payment.email,
        tripName: payment.tripName,
        paymentArray: payment.paymentArray,
        netAmountOwed: payment.netAmountOwed,
        members: payment.members
      }));
  
      // Send the payment data back to the frontend
      return res.status(200).json(paymentData);
    } catch (error) {
      console.error('Error fetching payments:', error);
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  });
  
  
  
  
  
  


app.post('/store-payment', async (req, res) => {
    const { email, tripName, paymentArray, netAmountOwed, members } = req.body;

    try {
        // Check if a document with the same tripName exists
        const existingPayment = await Payment.findOne({ tripName: tripName, email: email });

        if (existingPayment) {
            // If the document exists, update it
            await Payment.findOneAndUpdate(
                { tripName }, // Find the document by tripName
                {
                    $set: {
                        paymentArray,  // Update the paymentArray
                        netAmountOwed, // Update the netAmountOwed
                    },
                },
                { new: true } // Return the updated document
            );
            res.status(200).json({ message: 'Payment details updated successfully' });
        } else {
            // If it doesn't exist, create a new entry
            const newPayment = new Payment({
                email,
                tripName,
                paymentArray,
                netAmountOwed,
                members,
            });
            await newPayment.save();
            res.status(201).json({ message: 'New payment details created successfully' });
        }
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Error saving payment details', error });
    }
});


app.listen(8000, () => {
    console.log("port connected");
});



