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
    const storedRecords = localStorage.getItem(STORAGE_KEY);
    return storedRecords ? JSON.parse(storedRecords) : [];
  }
})();
