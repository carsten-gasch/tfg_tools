const dummyItem = {
  Auftragstyp: "Export",
  "Abgangsbhf-Nr.": "123456",
  "Zielbhf.-Nr.": "80010884",
  Versandtag: "dummy",
  "KundenRef.": "dummy",
  "TFG Ref.": "dummy",
  Kundenname: "dummy",
  "VU Code": "DBG",
  Frachtbrieferklärung: "",
  DepotRef: "dummy",
  "Ctr.Präfix": "",
  "Ctr.nr.": "",
  "Ct. Typ": "DC",
  "Ct. Höhe": "96",
  "Ct. Länge": "40",
  "Ct. Tara": "4000",
  "Ct. Inhalt Gew": "0",
  Zollverfahren: "GW",
  Reeder: "dummy",
  Warenbeschreibung: "LEER",
  AdressName_1: "DBIS LEIPZIG",
  Strasse_1: "AM EXER 10",
  Ort_1: "LEIPZIG",
  PLZ_1: "04358",
  Land_1: "DE",
  Termin_1: "dummy",
  Uhrzeit_1: 0.75,
  AdressName_2: "",
  Strasse_2: "",
  Ort_2: "",
  PLZ_2: "",
  Land_2: "",
  Termin_2: "",
  Uhrzeit_2: "",
  AdressName_3: "",
  Strasse_3: "",
  Ort_3: "",
  PLZ_3: "",
  Land_3: "",
  Termin_3: "",
  Uhrzeit_3: "",
};

function createEmptyContainersEvergreen(e) {
  e.preventDefault();
  const fromForecast = document.getElementById(
    "emptyContainerEvergreenFromForecast",
  ).value;
}

function createEmptyContainersHapag(e) {
  e.preventDefault();
  const amount = document.getElementById("emptyContainerHapagAmount").value;
  const week = document.getElementById("emptyContainerHapagWeek").value;
  const date = document.getElementById("emptyContainerHapagDateTime").value;

  let bookings = [];
  for (let i = 1; i <= amount; i++) {
    const item = createHapagItem(i, week, date);
    bookings.push(item);
  }
  console.table(bookings);
  jsonToExcel(bookings, "Hapag Lloyd");
}

function createHapagItem(i, week, date) {
  let item = { ...dummyItem };
  const dateObject = new Date(date);
  date = dateToExcel(new Date(dateObject));
  time = timeToExcel(new Date(dateObject));
  i = new String(i).padStart(3, "0");

  item["Versandtag"] = dateToExcel(
    new Date(dateObject.getFullYear(), 11, 31, 0, 0),
  );
  item["KundenRef."] = "HLEGCBMW";
  item["TFG Ref."] = `HLEGCBMW-KW${week.slice(6)}-${i}`;
  item["Kundenname"] = "Hapag Lloyd";
  item["VU Code"] = "DBG";
  item["DepotRef"] = "HLEGCBMW";
  item["Reeder"] = "Hapag Lloyd";
  item["Termin_1"] = date;
  item["Uhrzeit_1"] = time;

  return item;
}

function jsonToExcel(data, reeder) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orders");

  XLSX.writeFile(wb, `${reeder}.xlsx`);
}

function dateToExcel(date) {
  const time = date.getTime();
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  return Math.floor(25569.0 + (time - timezoneOffset) / (1000 * 60 * 60 * 24));
}

function timeToExcel(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes() / 60;
  return (hours + minutes) / 24;
}
