(function () {
  "use strict()";

  const STORAGE_KEY = "greenhouse-logger-records";
  const inputForm = document.getElementById("input-form");
  const formError = document.getElementById("form-error");
  const recordsList = document.getElementById("records-list");
  const activeQueue = document.getElementById("active-queue");
  const emptyState = document.getElementById("empty-state");
  const btnClearAll = document.getElementById("btn-clear-all");

  const inputPH = document.getElementById("pH");
  const inputEC = document.getElementById("ec");
  const inputTemp = document.getElementById("temp");
  const inputRH = document.getElementById("rh");

  let records = loadRecords();

  render();

  function loadRecords() {
    try {
      const storedRecords = localStorage.getItem(STORAGE_KEY);
      return storedRecords ? JSON.parse(storedRecords) : [];
    } catch (error) {
      console.error("Failed to load records from your data store", error);
      return [];
    }
  }
  function saveRecords() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error("Failed to save records to your data store", error);
    }
  }
  //   Critical
  // ○ (pH < 5.0 OR pH > 7.5) AND (Temp < 55F OR Temp > 95F) AND (EC < 0.2 OR
  // EC > 4.5 ) AND (RH < 30 OR RH > 90 )
  // ● Optimal
  // ○ (5.5 <= pH <= 6.5) AND (64.4F <= Temp <= 71.6F) AND (1.0 <= EC <= 2.0) AND
  // (50 <= RH <= 70)
  // ● Warning
  // ○ (NOT Critical) AND (NOT Optimal)
  function evaluationRisk(pH, ec, temp, rh) {
    if (
      (pH < 5.0 || pH > 7.5) &&
      (temp < 55 || temp > 95) &&
      (ec < 0.2 || ec > 4.5) &&
      (rh < 30 || rh > 90)
    ) {
      return { level: "critical", label: "Critical" };
    }

    if (
      pH >= 5.5 &&
      pH <= 6.5 &&
      temp >= 64.4 &&
      temp <= 71.6 &&
      ec >= 1.0 &&
      ec <= 2.0 &&
      rh >= 50 &&
      rh <= 70
    ) {
      return { level: "optimal", label: "Optimal" };
    }
    return { level: "warning", label: "Warning" };
  }

  function validateInput(data) {
    const errors = [];

    if (isNaN(data.pH)) {
      errors.push("pH must be a number.");
    }
    if (isNaN(data.ec)) {
      errors.push("Electrical Conductivity must be a number.");
    }
    if (isNaN(data.temp)) {
      errors.push("Temperature must be a number.");
    }
    if (isNaN(data.rh)) {
      errors.push("Humidity must be a number.");
    }
    return errors;
  }

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      id: crypto.randomUUID(),
      pH: parseFloat(inputForm.elements["pH"].value),
      ec: parseFloat(inputForm.elements["ec"].value),
      temp: parseFloat(inputForm.elements["temp"].value),
      rh: parseFloat(inputForm.elements["rh"].value),
      timestamp: new Date().toISOString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const validationErrors = validateInput(formData);
    if (validationErrors.length > 0) {
      displayError(validationErrors.join(" "));
      return;
    }
    hideError();

    formData.risk = evaluationRisk(
      formData.pH,
      formData.ec,
      formData.temp,
      formData.rh,
    );

    records.unshift(formData);
    inputForm.reset();
    saveRecords();
  });
  recordsList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("btn-discharge")) {
      const recordId = target.dataset.recordId;
      records = records.filter(function (record) {
        return record.id !== recordId;
      });
      saveRecords();
      render();
    }
  });

  function render() {
    activeQueue.textContent = records.length;
  }
  btnClearAll.addEventListener("click", (event) => {
    if (
      confirm(
        "Are you sure you want to clear all records? This action cannot be undone.",
      )
    ) {
      records = [];
      saveRecords();
      render();
    }
  });

  if (records.length === 0) {
    emptyState.classList.remove("hidden");
    recordsList.innerHTML = "";
    return;
  }

  emptyState.classList.add("hidden");
  const fragment = document.createDocumentFragment();
  records.forEach(function (record) {
    const listItem = document.createElement("li");
    listItem.className = `list-group-item d-flex justify-content-between align-items-center risk-${record.risk.level}`;
    listItem.innerHTML = `
        <div>
            pH: ${record.pH}, EC: ${record.ec}, Temp: ${record.temp}°F, RH: ${record.rh}%
            <span class="badge bg-${record.risk.level}">${record.risk.label}</span>
        </div>
        <button class="btn btn-sm btn-danger btn-discharge" data-record-id="${record.id}">Discharge</button>
    `;
    fragment.appendChild(listItem);
  });

  recordsList.appendChild(fragment);

  function displayError(message) {
    formError.textContent = message;
    formError.classList.remove("hidden");
  }

  function hideError() {
    formError.textContent = "";
    formError.classList.add("hidden");
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
