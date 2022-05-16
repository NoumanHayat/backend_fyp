const express = require("express");
const multer = require("multer");
const paymentController = require("./../controllers/payment");


//  const authController = require('./../controllers/authController');

const router = express.Router();
console.clear()
// const upload = multer({ dest: "/" });
router.route("/completePayment")
    .post(paymentController.completePayment)

//172.17.240.1
module.exports = router;
 