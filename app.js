const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const {
  countHandler,
  trafficCounter,
} = require('./controllers/trafficController');
const {
  getAllMessages,
  createNewMessage,
} = require('./controllers/messageController');

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const PORT = 3000;

const DB = process.env.DB;

mongoose
  .connect(DB.replace('<PASSWORD>', process.env.DB_PASSWORD))
  .then(console.log('Connection set successfully to database'))
  .catch((err) => {
    console.error('Database connection error', err);
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/count', countHandler);
app.get('/api/traffic', trafficCounter);

app.get('/api/messages', getAllMessages);
app.post('/api/createMessage', createNewMessage);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
