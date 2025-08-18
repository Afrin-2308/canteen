// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 3000;

// 🟢 Twilio Credentials — replace with your real ones
const accountSid = 'AC4cdc6ce98186437e415b53d928ba6f4b';
const authToken = 'de8859782ca7d3c96ae1348961c3f3c6';
const client = twilio(accountSid, authToken);

// ✅ Twilio Sandbox WhatsApp numbers
const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Twilio sandbox sender
const toWhatsAppNumber = 'whatsapp:+919043665785';  // Your verified WhatsApp number

// 🔧 Middleware
app.use(cors());
app.use(bodyParser.json());

// 🛒 Endpoint to receive order and send WhatsApp message
app.post('/place-order', async (req, res) => {
  const orderData = req.body;

  console.log("📥 Order Received:", orderData);

  // 🧾 Format WhatsApp message
  let messageBody = `🍽️ *New Breakfast Order Received!*\n\n`;
  let total = 0;

  for (let key in orderData) {
    const item = orderData[key];
    messageBody += `🔹 ${item.name}\n    Qty: ${item.item}, Amount: ₹${item.payment}\n\n`;
    total += item.payment;
  }

  messageBody += `💰 *Total Bill:* ₹${total}`;

  try {
    // 📤 Send WhatsApp message via Twilio
    const message = await client.messages.create({
      body: messageBody,
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber
    });

    console.log("✅ WhatsApp message sent! SID:", message.sid);
    res.status(200).json({ success: true, message: 'Order placed and WhatsApp message sent.' });

  } catch (error) {
    console.error("❌ Failed to send WhatsApp message:", error);
    res.status(500).json({ success: false, error: 'Failed to send WhatsApp message.' });
  }
});

// ▶️ Start local server
app.listen(port, () => {
  console.log(`🚀 Server running locally at http://localhost:${port}`);
});
