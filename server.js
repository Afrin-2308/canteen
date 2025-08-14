/**
 * Food Ordering Backend (Express.js)
 * ----------------------------------
 * This server:
 * 1. Receives an order request from a customer (via POST /order).
 * 2. Sends an email to the canteen owner using Nodemailer.
 * 3. Sends an SMS notification to the canteen owner using Twilio.
 * 4. Responds back to the client with a success message.
 */
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const path = require("path");
const cors = require("cors");

// ------------------ CONFIG ------------------

// Email configuration (using Gmail in this example)
const OWNER_EMAIL = "afrinafrose23@gmail.com";
const EMAIL_USER = "rajasekar10902@gmail.com"; // Your email
const EMAIL_PASS = "kqit neoc diqy sizn";    // Gmail App Password (NOT your login password)

// Twilio configuration
const TWILIO_SID = "your_account_sid";
const TWILIO_AUTH_TOKEN = "your_auth_token";
const TWILIO_PHONE = ""; // Your Twilio number
const OWNER_PHONE = ""; // Owner's phone number

// ---------------------------------------------

const app = express();
const port = 3000;
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve breakfast.html

// === EMAIL CONFIG ===
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER, // sender email
    pass: EMAIL_PASS  // Gmail app password (NOT your Gmail password)
  }
});

// === TWILIO CONFIG ===
// const twilioClient = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

// === API ENDPOINT ===
app.post("/place-order", async (req, res) => {  
  const orderEmailBody = buildOrderEmailBody(req.body);
  console.log("request recieved");
  try {
    // Send Email
    await transporter.sendMail({
      from: EMAIL_PASS,
      to: OWNER_EMAIL,
      subject: "New Order",
      html: orderEmailBody
    });

    // Send SMS
    // await twilioClient.messages.create({
    //   body: orderMessage,
    //   from: TWILIO_PHONE,
    //   to: OWNER_PHONE
    // });

    res.status(200).json({ message: "Order placed successfully! Owner notified via Email & SMS." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order placed, but failed to notify owner." });
  }
});

function buildOrderEmailBody(data) {
    console.log(data);
    let totalPayment = 0;
  
    // Table header
    let html = `
      <h2>New Canteen Order</h2>
      <table border="1" cellspacing="0" cellpadding="5" style="border-collapse:collapse;">
        <thead>
          <tr style="background-color:#f2f2f2;">
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Payment (₹)</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    // Loop through each food item
    for (let key in data) {
      let item = data[key];
      html += `
        <tr>
          <td>${item.name}</td>
          <td>${item.item}</td>
          <td>${item.payment}</td>
        </tr>
      `;
      totalPayment += item.payment;
    }
  
    // Table footer with total
    html += `
        <tr style="font-weight:bold;">
          <td colspan="2">Total</td>
          <td>₹${totalPayment}</td>
        </tr>
      </tbody>
      </table>
    `;
  
    return html;
  }

// Start Server
app.listen(port, () => {
  console.log("Server running on " + port);
});
