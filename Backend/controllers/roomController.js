//const fs = require("fs");
const Room = require("./../models/roomModel");

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

exports.topRooms = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage, price";
  req.query.fields = "no,category,price,maxGroupSize,ratingsAverage";
  next();
};

exports.getAllRooms = async (req, res) => {
  try {
    console.log(req.query);

    // BUILD QUERY
    // 1A) Filteration
    // const queryObj = { ...req.query };
    // const excludedFields = ["page", "sort", "limit", "fields"];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // 1B) Advanced Filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr));

    // 2) SORTING
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-ratingsAverage");
    // }
    // const rooms = await query;

    // 3) Field Limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    // // 4) Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit)

    // if (req.query.page) {
    //   const numRooms = await Room.countDocuments()
    //   if (skip >= numRooms) throw new Error('This page does not exist')
    // }

    const rooms = await Room.find();

    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    console.log(newRoom);
    res.status(201).json({
      status: "success",
      data: {
        room: newRoom,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getRoom = async (req, res) => {
  try {
    //findById is uniquely only for finding using the _id from the database
    //const room = await Room.findById(req.params.id);
    const room = await Room.findOne({ no: req.params.no });

    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate({ no: req.params.no }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findOneAndDelete({ no: req.params.no });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const month = req.params.year * 1;

    const plan = await Room.aggregate([
      {
        $unwind: "$startDates",
      },
    ]);

    res.status(200).json({
      status: "success",
      results: plan.length,
      data: plan,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      mesage: err,
    });
  }
};
