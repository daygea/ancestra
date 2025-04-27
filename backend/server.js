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
