const AppError = require("../utils/appError");
const Room = require("./../models/roomModel");
const catchAsync = require("./../utils/catchAsync");

exports.topRooms = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage, price";
  req.query.fields = "no,category,price,maxGroupSize,ratingsAverage";
  next();
};

exports.getAllRooms = catchAsync(async (req, res, next) => {
  console.log(req.query);

  const rooms = await Room.find();

  res.status(200).json({
    status: "success",
    results: rooms.length,
    data: {
      rooms,
    },
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
  const newRoom = await Room.create(req.body);
  console.log(newRoom);
  res.status(201).json({
    status: "success",
    data: {
      room: newRoom,
    },
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  //findById is uniquely only for finding using the _id from the database
  //const room = await Room.findById(req.params.id);
  const room = await Room.findOne({ no: req.params.no });

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

// ---------INITIAL------------//
// Importing local JSON file
// const rooms = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev_data/data/rooms.json`)
// );

// exports.CheckNO = (req, res, next, val) => {
//   console.log(`Room No is: ${val}`);

//   if (req.params.no * 1 > rooms.length) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Not Found",
//     });
//   }
//   next();
// };

// exports.CheckBody = (req, res, next) => {
//   if (!req.body.no || !req.body.name) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or no",
//     });
//   }
//   next();
// };
