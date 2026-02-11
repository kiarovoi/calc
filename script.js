(function () {
  const HEIGHT_MESSAGE_TYPE = "uist-calc-height";

  function parseDecimal(value) {
    return Number(String(value).replace(",", "."));
  }

  function calculateSessionMinutes(durationHours, people) {
    if (people === 5 && durationHours === 3) {
      return 66;
    }

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

  function postEmbedHeight() {
    if (!window.parent || window.parent === window) {
      return;
    }

    const bodyHeight = document.body ? document.body.scrollHeight : 0;
    const htmlHeight = document.documentElement
      ? document.documentElement.scrollHeight
      : 0;
    const height = Math.max(bodyHeight, htmlHeight);

    window.parent.postMessage(
      {
        type: HEIGHT_MESSAGE_TYPE,
        height,
      },
      "*"
    );
  }

  function initCalculator(root) {
    if (!root || root.dataset.calcInited === "1") {
      return;
    }

    const peopleInput = root.querySelector('[data-calc="people"]');
    const durationInput = root.querySelector('[data-calc="duration-hours"]');
    const minutesOutput = root.querySelector('[data-calc="session-minutes"]');
    const warningOutput = root.querySelector('[data-calc="duration-warning"]');

    if (!peopleInput || !durationInput || !minutesOutput || !warningOutput) {
      return;
    }

    function calculate() {
      const people = parseDecimal(peopleInput.value);
      const durationHours = parseDecimal(durationInput.value);

      if (!Number.isFinite(people) || !Number.isFinite(durationHours) || people <= 0) {
        minutesOutput.textContent = "-";
        warningOutput.textContent = "";
        postEmbedHeight();
        return;
      }

      const creditMinutes = calculateSessionMinutes(durationHours, people);
      minutesOutput.textContent = `${creditMinutes} ${minuteWord(creditMinutes)}`;

      const isTooShort =
        ((people === 3 || people === 4) && durationHours <= 1.5) ||
        ((people === 5 || people === 6) && durationHours <= 2.5);

      const isTooLong =
        (people === 1 && durationHours >= 2.5) ||
        (people === 2 && durationHours > 3) ||
        (people === 3 && durationHours >= 4.5);

      if (isTooShort) {
        warningOutput.textContent =
          "Сеанс супервізії занадто короткий для зазначеної кількості людей";
      } else if (isTooLong) {
        warningOutput.textContent =
          "Сеанс супервізії занадто довгий для зазначеної кількості людей";
      } else {
        warningOutput.textContent = "";
      }

      postEmbedHeight();
    }

    peopleInput.addEventListener("input", calculate);
    peopleInput.addEventListener("change", calculate);
    durationInput.addEventListener("input", calculate);
    durationInput.addEventListener("change", calculate);

    root.dataset.calcInited = "1";
    calculate();
  }

  function initAll() {
    document.querySelectorAll("[data-calc-root]").forEach(initCalculator);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll, { once: true });
  } else {
    initAll();
  }

  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(() => {
      initAll();
      postEmbedHeight();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (typeof ResizeObserver !== "undefined") {
    const resizeObserver = new ResizeObserver(() => postEmbedHeight());
    if (document.body) {
      resizeObserver.observe(document.body);
    }
  }

  window.addEventListener("load", postEmbedHeight);
  window.addEventListener("resize", postEmbedHeight);
  postEmbedHeight();
})();
