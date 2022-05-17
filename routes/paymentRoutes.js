const express = require("express");
const multer = require("multer");
const paymentController = require("../controllers/paymentController");
const authController = require('./../controllers/authController');

const router = express.Router();
console.clear()
// const upload = multer({ dest: "/" });
router.route("/addPayment")
    .post(authController.protect,paymentController.addPayment)

//172.17.240.1
module.exports = router;
  