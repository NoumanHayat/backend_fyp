const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const v4 = require("uuid");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.Stripe_Secret_key);

exports.addPayment = catchAsync(async (req, res, next) => {
  const Stripe_Publishable_key = process.env.Stripe_Publishable_key;
  const Stripe_Secret_key = process.env.Stripe_Secret_key;
  const token = await stripe.tokens.create({
    card: {
      number: req.body.cardNumber,
      exp_month: 5,
      exp_year: 2023,
      cvc: req.body.cvc,
    },
  });

  const check = await stripe.charges
    .create({
      amount: req.body.amount * 100,
      source: token.id,
      currency: "usd",
    })
    .then(function () {
      console.log("Charge Successful");
      res.json({ message: "Successfully purchased items" });
    })
    .catch(function (e) {
      console.log("Charge Fail");
      res.json({ message: "Charge Fail" });
    });

});
