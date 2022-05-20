const express = require("express");
const multer = require("multer");
const progressTracking = require("../controllers/progressTrackingController");
const authController = require("../controllers/authController");

const router = express.Router();
console.clear();
// const upload = multer({ dest: "/" });
router
  .route("/getWeight")
  .post(authController.protect, progressTracking.getWeight);
router
  .route("/getBodyFatPercentage")
  .post(authController.protect, progressTracking.getBodyFatPercentage);
router
  .route("/getMaintenanceCalories")
  .post(authController.protect, progressTracking.getMaintenanceCalories);
router
  .route("/getCalories")
  .post(authController.protect, progressTracking.getCalories);
//172.17.240.1
module.exports = router;
 