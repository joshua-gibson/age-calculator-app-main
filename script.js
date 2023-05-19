const fetchBtn = document.querySelector(".calc_btn");
const day = document.getElementById("day").value;
const month = document.getElementById("month").value;
const year = document.getElementById("year").value;

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

function getDateDifferences(day, month, year) {
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

  return { yearsSince, monthsSince, daysSince };
}

fetchBtn.addEventListener("click", () => {
  const dateDifferences = getDateDifferences(day, month, year);
  document.getElementById("years").innerHTML = dateDifferences.yearsSince;
  document.getElementById("months").innerHTML = dateDifferences.monthsSince;
  document.getElementById("days").innerHTML = dateDifferences.daysSince;
});
