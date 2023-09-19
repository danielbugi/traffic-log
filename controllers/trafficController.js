const Visitor = require('../models/visitorModel');

exports.countHandler = async (req, res) => {
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
};

exports.trafficCounter = async (req, res) => {
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
};
