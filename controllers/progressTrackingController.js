const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.test = catchAsync(async (req, res, next) => {
  res.send("okkk");
});
