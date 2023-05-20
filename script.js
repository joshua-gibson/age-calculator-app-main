const fetchBtn = document.querySelector(".calc_btn");

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function daysDiff(date1, date2) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(date1 - date2);
  return Math.round(differenceMs / ONE_DAY);
}

function errorMsg(day, month, year) {
  // create a date object for the current date
  const currentDate = new Date();
  const currDay = currentDate.getDate();
  const currMonth = currentDate.getMonth();
  const currYear = currentDate.getYear() + 1900;
  var yearMsg = "";
  var monthMsg = "";
  var dayMsg = "";
  // error msg if the year is not valid or in the future
  if (
    isNaN(parseInt(year)) ||
    parseInt(year) <= 0 ||
    parseInt(year) > currYear
  ) {
    yearMsg = "Please enter a valid year";
  }
  if (parseInt(year) > currYear) {
    yearMsg = "Must be in the past";
  }
  // error msg if the month is not valid or in the future
  if (isNaN(parseInt(month)) || parseInt(month) + 1 <= 0) {
    monthMsg = "Please enter a valid month";
  }
  if (parseInt(year) === currYear && parseInt(month) > currMonth) {
    monthMsg = "Must be in the past";
  }
  // combine the day, month and year into a date
  const providedDate = new Date(year, month, day, 0, 0, 0, 0);
  //check the date is valid and not in the future
  if (
    isNaN(parseInt(day)) ||
    parseInt(day) < 1 ||
    parseInt(day) > 31 ||
    (monthMsg.length === 0 &&
      yearMsg.length === 0 &&
      (!providedDate instanceof Date || isNaN(providedDate)))
  ) {
    dayMsg = "Please enter a valid day";
  }
  if (
    parseInt(year) === currYear &&
    parseInt(month) === currMonth &&
    parseInt(day) > currDay
  ) {
    dayMsg = "Must be in the past";
  }

  return { yearMsg, monthMsg, dayMsg };
}

function getDateDifferences(day, month, year) {
  const errors = errorMsg(day, month, year);

  if (
    errors.dayMsg.length > 0 ||
    errors.monthMsg.length > 0 ||
    errors.yearMsg.length > 0
  ) {
    return {
      yearError: errors.yearMsg,
      monthError: errors.monthMsg,
      dayError: errors.dayMsg,
      yearsSince: "--",
      yearsSinceText: "years",
      monthsSince: "--",
      monthsSinceText: "months",
      daysSince: "--",
      daysSinceText: "days",
    };
  }

  const inputDate = new Date(day + "/" + month + "/" + year);

  const currentDate = new Date();
  const currDay = currentDate.getDate();
  const currMonth = currentDate.getMonth();
  const currYear = currentDate.getYear() + 1900;
  // how many years between dates
  const yearsSince = currentDate.getFullYear() - inputDate.getFullYear();
  //subtract years from current date
  const removeYearssDate = new Date(
    currYear - yearsSince,
    currMonth,
    currDay,
    0,
    0,
    0,
    0
  );
  // how many months between dates
  const monthsSince = monthDiff(inputDate, removeYearssDate) + 1;
  //subtract months from current date
  const removeMonthsDate = new Date(
    currYear - yearsSince,
    currMonth + 1 - monthsSince,
    currDay,
    0,
    0,
    0,
    0
  );
  // how many days between dates
  const daysSince = daysDiff(inputDate, removeMonthsDate);

  return {
    yearError: errors.yearMsg,
    monthError: errors.monthMsg,
    dayError: errors.dayMsg,
    yearsSince,
    yearsSinceText: yearsSince === 1 ? "year" : "years",
    monthsSince,
    monthsSinceText: monthsSince === 1 ? "month" : "months",
    daysSince,
    daysSinceText: daysSince === 1 ? "day" : "days",
  };
}

fetchBtn.addEventListener("click", () => {
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  const dateDifferences = getDateDifferences(day, month, year);

  document.getElementById("years-error").innerHTML = dateDifferences.yearError;
  document.getElementById("months-error").innerHTML =
    dateDifferences.monthError;
  document.getElementById("days-error").innerHTML = dateDifferences.dayError;

  document.getElementById("years").innerHTML = dateDifferences.yearsSince;
  document.getElementById("years-text").innerHTML =
    dateDifferences.yearsSinceText;
  document.getElementById("months").innerHTML = dateDifferences.monthsSince;
  document.getElementById("months-text").innerHTML =
    dateDifferences.monthsSinceText;
  document.getElementById("days").innerHTML = dateDifferences.daysSince;
  document.getElementById("days-text").innerHTML =
    dateDifferences.daysSinceText;
});
