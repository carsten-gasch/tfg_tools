function todayISOString() {
  return new Date().toISOString().split("T")[0];
}

function getWeek(date) {
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDate() + 6) % 7));
  let week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
}

function setDefaults() {
  const emptyContainerHapagDateTime = document.getElementById(
    "emptyContainerHapagDateTime",
  );
  const emptyContainerEvergreenDateTime = document.getElementById(
    "emptyContainerEvergreenDateTime",
  );

  const emptyContainerHapagWeek = document.getElementById(
    "emptyContainerHapagWeek",
  );

  emptyContainerHapagDateTime.value = `${todayISOString()}T19:30`;
  emptyContainerHapagDateTime.min = `${todayISOString()}T19:30`;
  emptyContainerEvergreenDateTime.value = `${todayISOString()}T19:30`;
  emptyContainerEvergreenDateTime.min = `${todayISOString()}T19:30`;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const week = getWeek(currentDate);

  const weekString = week < 10 ? `0${week}` : week;

  emptyContainerHapagWeek.value = `${year}-W${weekString}`;
}

document.addEventListener("DOMContentLoaded", () => {
  setDefaults();
});
