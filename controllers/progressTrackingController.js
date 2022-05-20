const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const dailyWeight = require("./../models/dailyWeight");

exports.getWeight = catchAsync(async (req, res, next) => {
  const response = await dailyWeight.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  // var resp = Array(response.length);
  // for (var i = 0; i < response.length; i++) {
  //   console.log(response[i].Date.toUTCString(3));
  //   const d=response[i].Date.getMonth()+"-"+response[i].Date.getDate();
  //   resp[i] = {
  //     weight: response[i].weight,
  //     Date: response[i].Date.toUTCString(),
  //     bodyFatPercentage: response[i].bodyFatPercentage,
  //     _id: response[i].bodyFatPercentage,
  //   };
  // }
  var countDaily = 1;
  const DailyWeight = response.filter((e) => {
    var today = new Date();
    let newtoday = today.getTime() % 86400000;
    let newttoday = today.getTime() - (newtoday + countDaily * 86400000);
    if (e.Date.getTime() < newttoday && countDaily > 8) {
    } else {
      countDaily = countDaily + 1;
      // console.log(e.Date.getTime());

      return e;
    }
  });

  var countWeekly = 0;
  var today = new Date();
  let todaysTime = today.getTime() % 86400000;
  const WeeklyWeight = response.filter((e) => {
    let weekStart = today.getTime() - todaysTime - countWeekly * 6 * 86400000;
    if (e.Date.getTime() <= weekStart && countWeekly < 8) {
      
      countWeekly = countWeekly + 1;
    } else {
      return e;
    }
  });
  //=======================================================================
  var countmonthly = 0;

  const monthlyWeight = response.filter((e) => {
    let monthlyStart = today.getTime() - todaysTime - countmonthly * 30 * 86400000;
    if (e.Date.getTime() <= monthlyStart && countmonthly < 8) {
      console.log(e.Date.toUTCString());
      countmonthly = countmonthly + 1;
    } else {
      return e;
    }
  });
  res.send(200, monthlyWeight);
});
