const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require("path");
// const PORT = 10000;
const PORT = process.env.PORT || 10000;


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
const oduData = require('./data/oduData');
const numerologyRoutes = require("./routes/numerology");
const divinationRoutes = require('./routes/divination');

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


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
