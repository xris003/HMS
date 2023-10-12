const express = require("express");
const morgan = require("morgan");

const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 😃");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/api/rooms", roomRouter);
app.use("/api/users", userRouter);

// app.get("/api/rooms", getAllRooms);
// app.post("/api/rooms", createRoom);
// app.get("/api/rooms/:no", getRoom);
// app.patch("/api/rooms/:no", updateRoom);
// app.delete("/api/rooms/:no", deleteRoom);

module.exports = app;
