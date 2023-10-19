const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
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
// ALL ROOMS ROUTES
app.use("/api/rooms", roomRouter);
// ALL USERS ROUTES
app.use("/api/users", userRouter);

// HANDLE ALL NON-EXISTING ROUTES
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Sorry can't find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Sorry can't find ${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;
  next(new AppError(`Sorry can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
