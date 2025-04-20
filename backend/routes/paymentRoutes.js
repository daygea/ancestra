// 1. First create a backend endpoint to generate payment tokens
// routes/paymentRoutes.js
const router = require('express').Router();
const Paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

router.post('/create-payment-session', async (req, res) => {
  try {
    const session = await Paystack.transaction.initialize({
      email: req.body.email,
      amount: req.body.amount,
      currency: 'NGN',
      metadata: req.body.metadata
    });
    
    res.json({
      publicKey: process.env.PAYSTACK_PUBLIC_KEY, // Frontend needs this
      sessionId: session.data.access_code // One-time use token
    });
    
  } catch (error) {
    console.error('Session creation failed:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// paymentRoutes.js
router.get('/verify/:reference', async (req, res) => {
  try {
    const verification = await Paystack.transaction.verify(req.params.reference);
    
    // Critical security checks
    if (verification.data.amount !== 100000 || 
        verification.data.currency !== 'NGN' ||
        verification.data.status !== 'success') {
      return res.json({ success: false });
    }
    
    // Grant access in your database
    await grantAccessInDatabase(verification.data.metadata);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false });
  }
});