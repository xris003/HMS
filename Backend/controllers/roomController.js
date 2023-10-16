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

exports.getAllRooms = async (req, res) => {
  try {
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
