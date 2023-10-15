const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: [true, "A room must have a number"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Must have a type"],
  },
  price: {
    type: Number,
    required: [true, "A room must have a price"],
  },
  rating: {
    type: Number,
    default: 1.0,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
