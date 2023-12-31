// const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");
const factory = require("./handleFactory");

exports.setRoomUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.room) req.body.room = req.params.roomId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
