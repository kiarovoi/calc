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

function calculate() {
  const people = Number(el.people.value);
  const durationHours = Number(el.durationHours.value);
  const creditMinutes = calculateSessionMinutes(durationHours, people);

  el.sessionMinutes.textContent = `${creditMinutes} минут`;

  if (people === 2 && durationHours > 3) {
    el.durationWarning.textContent =
      "Продолжительность супервизионной сессии слишком велика для указанного количества участников.";
  } else {
    el.durationWarning.textContent = "";
  }
}

[el.people, el.durationHours].forEach((input) => {
  input.addEventListener("input", calculate);
  input.addEventListener("change", calculate);
});

calculate();
