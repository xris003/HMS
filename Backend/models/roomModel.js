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
  duration: {
    type: Number,
    required: [true, "A room must have duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A room must have max size"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  imageCover: {
    type: String,
    //required: [true, "A room must have a cover image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
