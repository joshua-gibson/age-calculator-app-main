function silly() {
  console.log("The silly function is being executed!");

  return "Hello, world!";
}

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

export { myFunction, subtractYears, silly };
