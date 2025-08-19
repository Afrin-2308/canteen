const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public")); // serve HTML from /public

// ✅ Configure mail transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",     // your Gmail
    pass: "your-app-password"        // Gmail App Password (not normal password)
  }
});

// ✅ API endpoint to handle orders
app.post("/place-order", (req, res) => {
  const { name, cls, phone, item, payment } = req.body;

  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: "canteenadmin@gmail.com", // Admin’s email
    subject: "🍴 New Canteen Order",
    text: `New Order Received:\n
    Name: ${name}\n
    Class: ${cls}\n
    Phone: ${phone}\n
    Item: ${item}\n
    Payment: ${payment}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("❌ Error:", error);
      return res.status(500).send("Error sending email.");
    }
    console.log("✅ Email sent:", info.response);
    res.send("Order placed! Email sent to admin.");
  });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
