const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    no: {
      type: Number,
      required: [true, "A room must have a number"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Must have a type"],
      enum: {
        values: ["Executive Single", "Executive Double", "Executive Suit"],
        message:
          "category is either: Executive Single, Executive Double, Executive Suit",
      },
    },
    price: {
      type: Number,
      required: [true, "A room must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
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
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
// roomSchema.index({ category: xyz, maxGroupSize: 1 });
roomSchema.index({ slug: 1 });

// Virtual Populate
roomSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "room",
  localField: "_id",
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
