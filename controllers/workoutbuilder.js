const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const jwt = require("jsonwebtoken");
const User = require("../models/useModels");

exports.addWorkout = catchAsync(async (req, res, next) => {
    // const a= {
    //     "AuthorizeRequest":{
    //     "pp_InstrumentType"
    //     "pp_TxnRefNo":"T20170425112425",
    //     "pp_Amount":"10000",
    //     "pp_TxnCurrency":"PKR",
    //     "InstrumentDTO":{
    //     "pp_CustomerCardNumber":"4557012345678902",
    //     "pp_CustomerCardExpiry":"1020",
    //     "pp_CustomerCardCvv":"101"
    //     },
    //     "pp_MerchantID":"Test00127801",
    //     "pp_Password":"000000000",
    //     "pp_SecureHash":"",
    //     "pp_Frequency": "SINGLE"
    //     }
    //     };
  res.status(200).json({
    status: "success",
    message: "Meal is added successfully!",
  });
});
