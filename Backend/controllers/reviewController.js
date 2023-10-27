const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.roomId) filter = { room: req.params.roomId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.room) req.body.room = req.params.roomId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReviews = await Review.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      review: newReviews,
    },
  });
});
