const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const dailyWeight = require("./../models/dailyWeight");
const scModels = require("./../models/scModels");
const meals = require("./../models/calModels");

exports.getWeight = catchAsync(async (req, res, next) => {
  const response = await dailyWeight.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  // var resp = Array(response.length);
  // for (var i = 0; i < response.length; i++) {
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
      return e;
    } else {
    }
  });
  //=======================================================================
  var countmonthly = 0;

  const monthlyWeight = response.filter((e) => {
    let monthlyStart =
      today.getTime() - todaysTime - countmonthly * 30 * 86400000;
    if (e.Date.getTime() <= monthlyStart && countmonthly < 8) {
      countmonthly = countmonthly + 1;
      return e;
    } else {
    }
  });

  var DailyLabel = new Array();
  var DailyData = new Array();

  var weeklyLabel = new Array();
  var weeklyData = new Array();

  var MonthlyLabel = new Array();
  var MonthlyData = new Array();

  for (let i = 0; i < 7; i++) {
    DailyLabel[i] =
      DailyWeight[i].Date.getDate() + "-" + DailyWeight[i].Date.getMonth();
    DailyData[i] = DailyWeight[i].weight;

    //=================================================
    weeklyLabel[i] =
      WeeklyWeight[i].Date.getDate() + "-" + WeeklyWeight[i].Date.getMonth();
    weeklyData[i] = WeeklyWeight[i].weight;
    //=================================================
    MonthlyLabel[i] =
      monthlyWeight[i].Date.getDate() + "-" + monthlyWeight[i].Date.getMonth();
    MonthlyData[i] = monthlyWeight[i].weight;
  }

  const detail = {
    DailyLabel,
    weeklyLabel,
    MonthlyLabel,
    DailyData,
    weeklyData,
    MonthlyData,
  };
  res.send(200, detail);
});
exports.getBodyFatPercentage = catchAsync(async (req, res, next) => {
  const response = await dailyWeight.find({ UserId: req.user.id }).sort({
    Date: -1,
  });
  var countDaily = 1;
  const DailyWeight = response.filter((e) => {
    var today = new Date();
    let newtoday = today.getTime() % 86400000;
    let newttoday = today.getTime() - (newtoday + countDaily * 86400000);
    if (e.Date.getTime() < newttoday && countDaily > 8) {
    } else {
      countDaily = countDaily + 1;

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
      return e;
    } else {
    }
  });
  //=======================================================================
  var countmonthly = 0;

  const monthlyWeight = response.filter((e) => {
    let monthlyStart =
      today.getTime() - todaysTime - countmonthly * 30 * 86400000;
    if (e.Date.getTime() <= monthlyStart && countmonthly < 8) {
      countmonthly = countmonthly + 1;
      return e;
    } else {
    }
  });

  var DailyLabel = new Array();
  var DailyData = new Array();

  var weeklyLabel = new Array();
  var weeklyData = new Array();

  var MonthlyLabel = new Array();
  var MonthlyData = new Array();

  for (let i = 0; i < 7; i++) {
    DailyLabel[i] =
      DailyWeight[i].Date.getDate() + "-" + DailyWeight[i].Date.getMonth();
    DailyData[i] = DailyWeight[i].bodyFatPercentage;

    //=================================================
    weeklyLabel[i] =
      WeeklyWeight[i].Date.getDate() + "-" + WeeklyWeight[i].Date.getMonth();
    weeklyData[i] = WeeklyWeight[i].bodyFatPercentage;
    //=================================================
    MonthlyLabel[i] =
      monthlyWeight[i].Date.getDate() + "-" + monthlyWeight[i].Date.getMonth();
    MonthlyData[i] = monthlyWeight[i].bodyFatPercentage;
  }

  const detail = {
    DailyLabel,
    weeklyLabel,
    MonthlyLabel,
    DailyData,
    weeklyData,
    MonthlyData,
  };
  res.send(200, detail);
});
exports.getMaintenanceCalories = catchAsync(async (req, res, next) => {
  const MaintenanceCalories = await scModels
    .find({ UserId: req.user.id })
    .sort({
      Date: -1,
    });
  // let response = new Array();
  // let count = 0;
  // MaintenanceCalories.forEach((e) => {
  //   let result = e.Calories;

  //   //  +
  //   // ((e.Calories * 0.45) / 4) +
  //   // ((e.Calories * 0.6) / 4) +
  //   // ((e.Calories * 0.2) / 9);

  //   response[count] = result;
  //   count++;
  // });

  var weeklyLabel = new Array();
  var MonthlyLabel = new Array();

  var weeklyData = new Array();
  var MonthlyData = new Array();

  //===========================================================
  var countWeekly = 0;
  var today = new Date();
  let todaysTime = today.getTime() % 86400000;
  const WeeklyMaintenanceCalories = MaintenanceCalories.filter((e) => {
    let weekStart = today.getTime() - todaysTime - countWeekly * 6 * 86400000;
    if (e.Date.getTime() <= weekStart && countWeekly < 8) {
      countWeekly = countWeekly + 1;
      return e;
    } else {
    }
  });
  var count = 0;
  WeeklyMaintenanceCalories.forEach((e) => {
    weeklyLabel[count] = e.Date.getDate() + "-" + e.Date.getMonth();
    weeklyData[count] = e.Calories;
    count++;
  });

  //=================================================================

  var countmonthly = 0;

  const monthlyMaintenanceCalories = MaintenanceCalories.filter((e) => {
    let monthlyStart =
      today.getTime() - todaysTime - countmonthly * 30 * 86400000;
    if (e.Date.getTime() <= monthlyStart && countmonthly < 8) {
      countmonthly = countmonthly + 1;
      return e;
    } else {
    }
  });

  count = 0;
  monthlyMaintenanceCalories.forEach((e) => {
    MonthlyLabel[count] = e.Date.getDate() + "-" + e.Date.getMonth();
    MonthlyData[count] = e.Calories;
    count++;
  });

  const detail = {
    weeklyLabel,
    MonthlyLabel,
    weeklyData,
    MonthlyData,
  };
  res.send(200, detail);
});
exports.getCalories = catchAsync(async (req, res, next) => {
  const meal = await meals.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  let dailyValue = new Array();
  let dailyLabel = new Array();

  let check = 0;
  let sum = meal[0].Calories;
  for (let i = 1; i < meal.length; i++) {
    if (meal[i].Date.getDate() === meal[i - 1].Date.getDate()) {
      console.log(meal[i].Date.getDate() + "-" + meal[i].Date.getMonth());
      console.log(meal[i].Date.getDate() + "");
      sum = sum + meal[i].Calories;
    } else {
      console.log("======================================================");
      dailyValue[check] = sum;
      dailyLabel[check] =meal[i - 1].Date.getDate() + "-" + meal[i - 1].Date.getMonth();
      sum = meal[i].Calories;
      check++;
    }
  }

  res.send(dailyValue);
});
