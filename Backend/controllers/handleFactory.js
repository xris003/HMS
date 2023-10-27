const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({ no: req.params.no });

    if (!doc) {
      return next(new AppError("No document with that number", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
