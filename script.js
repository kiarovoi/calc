const el = {
  format: document.getElementById("format"),
  type: document.getElementById("type"),
  duration: document.getElementById("duration"),
  sessions: document.getElementById("sessions"),
  sessionsValue: document.getElementById("sessionsValue"),
  urgent: document.getElementById("urgent"),
  pricePerSession: document.getElementById("pricePerSession"),
  totalPrice: document.getElementById("totalPrice"),
  discount: document.getElementById("discount"),
};

const BASE_PRICE = {
  individual: 330,
  group: 420,
  team: 560,
};

const DURATION_MULTIPLIER = {
  60: 1,
  90: 1.35,
  120: 1.65,
};

const FORMAT_MULTIPLIER = {
  online: 1,
  offline: 1.2,
};

function formatMoney(value) {
  return `${Math.round(value).toLocaleString("pl-PL")} PLN`;
}

function packageDiscount(sessions) {
  if (sessions >= 12) return 12;
  if (sessions >= 8) return 8;
  if (sessions >= 5) return 5;
  return 0;
}

function calculate() {
  const type = el.type.value;
  const duration = Number(el.duration.value);
  const sessions = Number(el.sessions.value);
  const format = el.format.value;
  const urgent = el.urgent.checked;

  el.sessionsValue.textContent = String(sessions);

  let perSession =
    BASE_PRICE[type] * DURATION_MULTIPLIER[duration] * FORMAT_MULTIPLIER[format];

  if (urgent) {
    perSession *= 1.15;
  }

  const discountPercent = packageDiscount(sessions);
  const totalBeforeDiscount = perSession * sessions;
  const total = totalBeforeDiscount * (1 - discountPercent / 100);

  el.pricePerSession.textContent = formatMoney(perSession);
  el.totalPrice.textContent = formatMoney(total);
  el.discount.textContent = `${discountPercent}%`;
}

[el.format, el.type, el.duration, el.sessions, el.urgent].forEach((input) => {
  input.addEventListener("input", calculate);
  input.addEventListener("change", calculate);
});

calculate();
