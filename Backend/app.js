const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const roomRouter = require("./routes/roomRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARE
// Set security HTTP headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// Data Sanitize cross site scripting
app.use(xss());

// Serving static files
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
// ALL REVIEWS
app.use("/api/reviews", reviewRouter);

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
