const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const jwt = require("jsonwebtoken");
const User = require("../models/useModels");

exports.addWorkout = catchAsync(async (req, res, next) => {
  
  res.status(200).json({
    status: "success",
    message: "Meal is added successfully!",
  });
});
