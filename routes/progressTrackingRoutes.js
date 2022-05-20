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

//172.17.240.1
module.exports = router;
 