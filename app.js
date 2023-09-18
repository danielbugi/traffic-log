const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const Visitor = require('./models/visitorModel');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.static('public'));

const PORT = 3000;

const DB = process.env.DB;

mongoose
  .connect(DB.replace('<PASSWORD>', process.env.DB_PASSWORD))
  .then(console.log('Connection set successfully to database'))
  .catch((err) => {
    console.error('Database connection error', err);
  });

app.get('/api/count', async (req, res) => {
  try {
    // Fetch the count data from your database or wherever it's stored
    let visitors = await Visitor.findOne({ name: 'localhost' });

    if (visitors == null) {
      // If there are no records yet, return 0 as the count
      res.json({ count: 0 });
    } else {
      // Otherwise, return the current count
      res.json({ count: visitors.count });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get request to app root
app.get('/api/traffic', async (req, res) => {
  try {
    // Storing the records from the Visitor table
    let visitors = await Visitor.findOne({ name: 'localhost' });

    if (visitors == null) {
      const beginCount = new Visitor({
        name: 'localhost',
        count: 1,
      });
      await beginCount.save();
      res.json({ count: 1 });
      console.log('First visitor arrived');
    } else {
      visitors.count += 1;
      await visitors.save();
      res.json({ count: visitors.count });
      console.log('visitor arrived: ', visitors.count);
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
