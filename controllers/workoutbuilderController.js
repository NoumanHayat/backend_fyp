const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const workoutbuilder = require("./../models/workoutBuilderModels");

const jwt = require("jsonwebtoken");

exports.addWorkout = catchAsync(async (req, res, next) => {
  var nowDate = new Date();
  const newWorkoutbuilder = await workoutbuilder.create({
    WorkoutType: [
      {
        UserId: req.user.id,
        Type: req.body.Type,
        workoutName: req.body.workout,
        targetMuscle: req.body.targetMuscle,
        Date: nowDate,
        intensity: req.body.intensity,
      },
    ],
    Exercise: [
      {
        name: req.body.name,
        Sets: req.body.Sets,
        Reps: req.body.Reps,
        RPE: req.body.RPE,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    message: newWorkoutbuilder,
  });
});
