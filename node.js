const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve breakfast.html

// === EMAIL CONFIG ===
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com", // sender email
    pass: "YOUR_APP_PASSWORD"     // Gmail app password (NOT your Gmail password)
  }
});
const OWNER_EMAIL = "canteenowner@example.com";

// === TWILIO CONFIG ===
const twilioClient = twilio("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN");
const OWNER_PHONE = "+91 9043665785"; // owner phone in international format
const TWILIO_PHONE = "+19876543210"; // Twilio registered number

// === API ENDPOINT ===
app.post("/place-order", async (req, res) => {
  const { name, item, payment } = req.body;
  const orderMessage = `New Order:\nCustomer: ${name}\nItem: ${item}\nPayment: ${payment}`;

  try {
    // Send Email
    await transporter.sendMail({
      from: "YOUR_GMAIL@gmail.com",
      to: OWNER_EMAIL,
      subject: "New Breakfast Order",
      text: orderMessage
    });

    // Send SMS
    await twilioClient.messages.create({
      body: orderMessage,
      from: TWILIO_PHONE,
      to: OWNER_PHONE
    });

    res.json({ message: "Order placed successfully! Owner notified via Email & SMS." });
  } catch (err) {
    console.error(err);
    res.json({ message: "Order placed, but failed to notify owner." });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
