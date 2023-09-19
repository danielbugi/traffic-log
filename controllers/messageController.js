const Message = require('../models/messageModel');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createNewMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        message: newMessage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
