const fs = require("fs");

const rooms = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev_data/data/rooms.json`)
);

exports.CheckNO = (req, res, next, val) => {
  console.log(`Room No is: ${val}`);

  if (req.params.no * 1 > rooms.length) {
    return res.status(400).json({
      status: "fail",
      message: "Not Found",
    });
  }
  next();
};

exports.CheckBody = (req, res, next) => {
  if (!req.body.no || !req.body.name) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or no",
    });
  }
  next();
};

exports.getAllRooms = (req, res) => {
  res.status(200).json({
    status: "success",
    results: rooms.length,
    data: {
      rooms,
    },
  });
};

exports.createRoom = (req, res) => {
  console.log(req.body);

  const newNo = rooms[rooms.length - 1].no + 1;
  const newRoom = Object.assign({ no: newNo }, req.body);

  rooms.push(newRoom);
  fs.writeFile(
    `${__dirname}/dev_data/data/rooms.json`,
    JSON.stringify(rooms),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          room: newRoom,
        },
      });
    }
  );
};

exports.getRoom = (req, res) => {
  const no = req.params.no * 1;
  const room = rooms.find((el) => el.no === no);

  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
};

exports.updateRoom = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      room: "<Updated Room...>",
    },
  });
};

exports.deleteRoom = (req, res) => {
  res.status(204).json({
    status: "success",
    data: {
      room: null,
    },
  });
};
