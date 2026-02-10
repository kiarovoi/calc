const el = {
  format: document.getElementById("format"),
  type: document.getElementById("type"),
  people: document.getElementById("people"),
  durationHours: document.getElementById("durationHours"),
  sessions: document.getElementById("sessions"),
  sessionsValue: document.getElementById("sessionsValue"),
  urgent: document.getElementById("urgent"),
  pricePerSession: document.getElementById("pricePerSession"),
  totalPrice: document.getElementById("totalPrice"),
  discount: document.getElementById("discount"),
};

const BASE_PRICE_PER_HOUR = {
  individual: 700,
  group: 900,
  team: 1200,
};

const FORMAT_MULTIPLIER = {
  online: 1,
  offline: 1.2,
};

function formatMoney(value) {
  return `${Math.round(value).toLocaleString("uk-UA")} грн`;
}

function packageDiscount(sessions) {
  if (sessions >= 12) return 12;
  if (sessions >= 8) return 8;
  if (sessions >= 5) return 5;
  return 0;
}

function calculate() {
  const type = el.type.value;
  const people = Number(el.people.value);
  const durationHours = Number(el.durationHours.value);
  const sessions = Number(el.sessions.value);
  const format = el.format.value;
  const urgent = el.urgent.checked;

  el.sessionsValue.textContent = String(sessions);

  let pricePerMeeting =
    BASE_PRICE_PER_HOUR[type] * people * durationHours * FORMAT_MULTIPLIER[format];

  if (urgent) {
    pricePerMeeting *= 1.15;
  }

  const discountPercent = packageDiscount(sessions);
  const totalBeforeDiscount = pricePerMeeting * sessions;
  const total = totalBeforeDiscount * (1 - discountPercent / 100);

  el.pricePerSession.textContent = formatMoney(pricePerMeeting);
  el.totalPrice.textContent = formatMoney(total);
  el.discount.textContent = `${discountPercent}%`;
}

[el.format, el.type, el.people, el.durationHours, el.sessions, el.urgent].forEach(
  (input) => {
    input.addEventListener("input", calculate);
    input.addEventListener("change", calculate);
  }
);

calculate();
