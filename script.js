const el = {
  people: document.getElementById("people"),
  durationHours: document.getElementById("durationHours"),
  sessionMinutes: document.getElementById("sessionMinutes"),
  formulaDetails: document.getElementById("formulaDetails"),
};

function calculateSessionMinutes(durationHours, people) {
  const groupMinutes = durationHours * 60;
  const creditMinutes = groupMinutes * (0.2 + 0.8 / people);
  return {
    groupMinutes,
    creditMinutes: Math.round(creditMinutes),
  };
}

function calculate() {
  const people = Number(el.people.value);
  const durationHours = Number(el.durationHours.value);

  const { groupMinutes, creditMinutes } = calculateSessionMinutes(
    durationHours,
    people
  );

  el.sessionMinutes.textContent = `${creditMinutes} минут`;
  el.formulaDetails.textContent = `(G=${groupMinutes} мин, N=${people})`;
}

[el.people, el.durationHours].forEach((input) => {
  input.addEventListener("input", calculate);
  input.addEventListener("change", calculate);
});

calculate();
