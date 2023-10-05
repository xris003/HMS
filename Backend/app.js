const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

// 1) Middlewares
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 😃");
  next();
});

const rooms = JSON.parse(
  fs.readFileSync(`${__dirname}/dev_data/data/rooms.json`)
);

const getAllRooms = (req, res) => {
  res.status(200).json({
    status: "success",
    results: rooms.length,
    data: {
      rooms,
    },
  });
};

const createRoom = (req, res) => {
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

const getRoom = (req, res) => {
  const no = req.params.no * 1;
  const room = rooms.find((el) => el.no === no);

  if (!room) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid NO",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
};

const updateRoom = (req, res) => {
  if (req.params.no * 1 > rooms.length) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      room: "<Updated Room...>",
    },
  });
};

const deleteRoom = (req, res) => {
  if (req.params.no * 1 > rooms.length) {
    return res.status(400).json({
      status: "fail",
      message: "Not Found",
    });
  }

  res.status(204).json({
    status: "success",
    data: {
      room: null,
    },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This is not yet available",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This is not yet available",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This is not yet available",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This is not yet available",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This is not yet available",
  });
};

app.route("/api/rooms").get(getAllRooms).post(createRoom);
app.route("/api/rooms/:no").get(getRoom).patch(updateRoom).delete(deleteRoom);

app.route("/api/users").get(getAllUsers).post(createUser);
app.route("/api/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

// app.get("/api/rooms", getAllRooms);
// app.post("/api/rooms", createRoom);
// app.get("/api/rooms/:no", getRoom);
// app.patch("/api/rooms/:no", updateRoom);
// app.delete("/api/rooms/:no", deleteRoom);

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
