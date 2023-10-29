const AppError = require("../utils/appError");
const Room = require("./../models/roomModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./../controllers/handleFactory");

// ---Developer's Challenge 👨‍💻 --- //
exports.topRooms = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage, price";
  req.query.fields = "no,category,price,maxGroupSize,ratingsAverage";
  next();
};

exports.getAllRooms = factory.getAll(Room);

exports.createRoom = factory.createOne(Room);

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findOne({ no: req.params.no }).populate("reviews");

  if (!room) {
    return next(new AppError("No room with that number", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
});

// exports.updateRoom = factory.updateOne(Room);
// exports.deleteRoom = factory.deleteOne(Room);

exports.updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findOneAndUpdate({ no: req.params.no }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    return next(new AppError("No room with that number", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findOneAndDelete({ no: req.params.no });

  if (!room) {
    return next(new AppError("No room with that number", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const plan = await Room.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`2023-${month}-01`),
          $lte: new Date(`2023-${month}-31`),
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: plan.length,
    data: plan,
  });
});
