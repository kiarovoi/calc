const el = {
  people: document.getElementById("people"),
  durationHours: document.getElementById("durationHours"),
  sessionMinutes: document.getElementById("sessionMinutes"),
  durationWarning: document.getElementById("durationWarning"),
};

function calculateSessionMinutes(durationHours, people) {
  const groupMinutes = durationHours * 60;
  const creditMinutes = groupMinutes * (0.2 + 0.8 / people);
  return Math.round(creditMinutes);
}

function minuteWord(value) {
  const mod10 = value % 10;
  const mod100 = value % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return "хвилина";
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return "хвилини";
  }

  return "хвилин";
}

function calculate() {
  const people = Number(el.people.value);
  const durationHours = Number(el.durationHours.value);
  const creditMinutes = calculateSessionMinutes(durationHours, people);

  el.sessionMinutes.textContent = `${creditMinutes} ${minuteWord(creditMinutes)}`;

  const isTooLong =
    (people === 1 && durationHours >= 2.5) ||
    (people === 2 && durationHours > 3) ||
    (people === 3 && durationHours >= 4.5);

  if (isTooLong) {
    el.durationWarning.textContent =
      "Сеанс супервізії занадто довгий для зазначеної кількості людей";
  } else {
    el.durationWarning.textContent = "";
  }
}

[el.people, el.durationHours].forEach((input) => {
  input.addEventListener("input", calculate);
  input.addEventListener("change", calculate);
});

calculate();
