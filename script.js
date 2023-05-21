const fetchBtn = document.querySelector(".calc_btn");
var speed = 10;

function incEltNbr(id) {
  const elt = document.getElementById(id);
  const endNbr = Number(document.getElementById(id).innerHTML);
  incNbrRec(0, endNbr, elt);
}

function incNbrRec(i, endNbr, elt) {
  if (i <= endNbr) {
    elt.innerHTML = i;
    setTimeout(function () {
      incNbrRec(i + 1, endNbr, elt);
    }, speed);
  }
}
function incNbr() {
  incEltNbr("days");
  incEltNbr("months");
  incEltNbr("years");
}

function isValidDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
}

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
  const currDate = new Date();
  const currDay = currDate.getDate();
  const currMonth = currDate.getMonth();
  const currYear = currDate.getFullYear();
  const errors = {
    yearMsg: !isNaN(parseInt(year))
      ? parseInt(year) < 100 || parseInt(year) > currYear
        ? "Must be a valid year"
        : parseInt(year) > currYear
        ? "Must be in the past"
        : ""
      : "This field is required",
    monthMsg: !isNaN(parseInt(month))
      ? parseInt(month) < 0 || parseInt(month) > 11
        ? "Must be a valid month"
        : parseInt(year) === currYear && parseInt(month) > currMonth
        ? "Must be in the past"
        : ""
      : "This field is required",
    dayMsg: !isNaN(parseInt(day))
      ? isNaN(parseInt(day)) ||
        (parseInt(year) === currYear &&
          parseInt(month) === currMonth &&
          parseInt(day) > currDay)
        ? "Must be in the past"
        : !isValidDate(`${year}-${month}-${day}`)
        ? "Must be a valid date"
        : ""
      : "This field is required",
  };
  return errors;
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

  const inputDate = new Date(year, month, day, 0, 0, 0, 0);
  const currentDate = new Date();
  const currDay = currentDate.getDate();
  const currMonth = currentDate.getMonth();
  const currYear = currentDate.getYear() + 1900;
  // how many years between dates
  var yearsSince = currentDate.getFullYear() - inputDate.getFullYear();
  //subtract years from current date
  var removeYearssDate = new Date(
    currYear - yearsSince,
    currMonth,
    currDay,
    0,
    0,
    0,
    0
  );

  if (removeYearssDate < inputDate) {
    removeYearssDate.setFullYear(removeYearssDate.getFullYear() + 1);
    yearsSince--;
  }

  // how many months between dates
  var monthsSince = monthDiff(inputDate, removeYearssDate);
  //subtract months from current date
  var removeMonthsDate = new Date(
    currYear - yearsSince,
    currMonth - monthsSince,
    currDay,
    0,
    0,
    0,
    0
  );

  if (removeMonthsDate < inputDate) {
    removeMonthsDate.setMonth(removeMonthsDate.getMonth() + 1);
    monthsSince--;
  }

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
  const month = parseInt(document.getElementById("month").value) - 1;
  const year = document.getElementById("year").value;
  const dateDifferences = getDateDifferences(day, month, year);

  if (dateDifferences.dayError.length > 0) {
    document.getElementById("day-title").classList.add("red-text");
    document.getElementById("day").classList.add("red-border");
  } else {
    document.getElementById("day-title").classList.remove("red-text");
    document.getElementById("day").classList.remove("red-border");
  }

  if (dateDifferences.monthError.length > 0) {
    document.getElementById("month-title").classList.add("red-text");
    document.getElementById("month").classList.add("red-border");
  } else {
    document.getElementById("month-title").classList.remove("red-text");
    document.getElementById("month").classList.remove("red-border");
  }

  if (dateDifferences.yearError.length > 0) {
    document.getElementById("year-title").classList.add("red-text");
    document.getElementById("year").classList.add("red-border");
  } else {
    document.getElementById("year-title").classList.remove("red-text");
    document.getElementById("year").classList.remove("red-border");
  }

  document.getElementById("years-error").innerHTML =
    dateDifferences.yearError || `&nbsp;`;
  document.getElementById("months-error").innerHTML =
    dateDifferences.monthError || `&nbsp;`;
  document.getElementById("days-error").innerHTML =
    dateDifferences.dayError || `&nbsp;`;

  document.getElementById("years").innerHTML = dateDifferences.yearsSince;
  document.getElementById("years-text").innerHTML =
    dateDifferences.yearsSinceText;
  document.getElementById("months").innerHTML = dateDifferences.monthsSince;
  document.getElementById("months-text").innerHTML =
    dateDifferences.monthsSinceText;
  document.getElementById("days").innerHTML = dateDifferences.daysSince;
  document.getElementById("days-text").innerHTML =
    dateDifferences.daysSinceText;

  incNbr();
});
