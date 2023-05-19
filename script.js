const fetchBtn = document.querySelector(".calc_btn");
const day = document.getElementById("day").value;
const month = document.getElementById("month").value;
const year = document.getElementById("year").value;

function subtractYears(date, years) {
  date.setFullYear(date.getFullYear() - years);

  return date;
}

function myFunction(day, month, year) {
  const inputDate = new Date(day + "/" + month + "/" + year);
  const currentDate = new Date();
  // how many years between dates
  const age = currentDate.getFullYear() - inputDate.getFullYear();
  //subtract age from current date
  const newDiff = new Date(currentDate - inputDate);

  console.log(age);
  return age;
}

fetchBtn.addEventListener("click", () => {
  myFunction(day, month, year);
});

export { subtractYears };
