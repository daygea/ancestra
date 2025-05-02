const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require("path");
// const PORT = 10000;
const PORT = process.env.PORT || 10000;
const Paystack = require('paystack')('sk_live_3cd1cf3faa09a8f21d0be4fe28d6302cd1a11bc3');


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
const oduData = require('./data/oduData');
const numerologyRoutes = require("./routes/numerology");
const divinationRoutes = require('./routes/divination');
const configRoutes = require('./routes/configRoutes');

app.use('/api/config/', configRoutes);
app.use("/api/numerology", numerologyRoutes);
app.use('/api/divination', divinationRoutes);

// Secure endpoint for sensitive data
app.get('/api/secure-config', (req, res) => {

  // Return sensitive data
  res.json({
    secretKey: process.env.SECRET_KEY || "DqUHBw7iFj3ia0pyp+QIvKJ5NgJFXE2PcZk95Kt2w6qpqOZ82iAF4Kx88Khb2KFl",
    storedHashedPasswords: [
      "f3b4affffec5ec69ea24a382c3178b7440986fbe9b537b7afe90c5c1337d0e77",
      "43dc88eaab6c2de6208ba193a48ef66309f05e810d3af47e5c654218d8bfadd8",
      "4849a6a362ae149353a4077359f4886f6a1e89399c6aa90f3d0678d129c833eb",
      "01fcd586d878e01b7fc94d5ba229fe5a03e228ec54df1638cecced060c9b4e1e",
      "005bd5b31e3c9fe8c7aa4fe1cb967787ac6a1a0d539282168c4ad8fa9f364984"
    ]
  });
});


// Route to get Odu data by name
app.get('/api/odu/:name', (req, res) => {
    const name = req.params.name;
    const data = oduData[name];
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'Odu not found' });
    }
});

// Orientation data endpoint
app.get('/api/odu/orientations/:mainCast/:orientation', (req, res) => {
  try {
    const { mainCast, orientation } = req.params;
    const data = oduData[mainCast];
    
    if (!data) {
      return res.status(404).json({ error: 'Odu not found' });
    }

    const orientationData = {
      Positive: data.Positive ? Object.keys(data.Positive) : [],
      Negative: data.Negative ? Object.keys(data.Negative) : []
    };

    res.json(orientationData);
  } catch (error) {
    console.error('Orientation endpoint error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Solution details endpoint
app.get('/api/odu/solutionDetails/:mainCast/:solution', (req, res) => {
  try {
    const { mainCast, solution } = req.params;
    const data = oduData[mainCast];
    
    if (!data) {
      return res.status(404).json({ error: 'Odu not found' });
    }

    const solutionOptions = data[solution] || [];
    res.json({ [solution]: solutionOptions });
  } catch (error) {
    console.error('Solution details endpoint error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add this endpoint to provide the public key securely
// Paystack Key Endpoint
app.get('/api/paystack-key', (req, res) => {
  res.json({ 
    key: 'pk_live_b39b445fba8a155f04a04980705a3c10ae85d673',
    timestamp: Date.now() // Helps debug caching issues
  });
});

// Payment Verification Endpoint
app.get('/api/payment/verify/:reference', async (req, res) => {
  try {
    console.log('Verifying payment:', req.params.reference); // Debug log
    
    const verification = await Paystack.transaction.verify(req.params.reference);
    
    // Basic validation
    if (verification.data.status !== 'success') {
      return res.json({ success: false });
    }
    
    // Additional checks (amount in kobo)
    if (verification.data.amount !== 100000) {
      console.warn('Amount mismatch:', verification.data.amount);
      return res.json({ success: false });
    }
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Verification failed:', error);
    res.status(500).json({ success: false });
  }
});

// server.js or oduRoutes.js
app.get('/api/ping', (req, res) => {
  res.status(200).send("pong");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
