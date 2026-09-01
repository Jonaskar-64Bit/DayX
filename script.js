// HTML Elemente importieren
// Import HTML elements
const counterForm = document.getElementById("counterForm");
const counters = document.getElementById("counters");

counterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Eingaben auslesen
    // Read input values
    const name = document.getElementById("counterName").value;
    const startDate = document.getElementById("startDate").value;
    const notes = document.getElementById("notes").value;

    // Counter Daten speichern
    // Save counter data
    const counterData = {
        id: Date.now(),
        name: name,
        startDate: startDate,
        notes: notes
    };

    const savedCounters =
        JSON.parse(localStorage.getItem("counters")) || [];

    savedCounters.push(counterData);

    localStorage.setItem(
        "counters",
        JSON.stringify(savedCounters)
    );

    // Counter erstellen
    // Create counter
    const counter = document.createElement("div");
    counter.classList.add("counter");

    counter.innerHTML = `
    <h2>${name}</h2>
    <p class="counterDay"></p>
    <p>Seit dem ${startDate}</p>
    <p>${notes}</p>
    <button class="deleteCounterBtn">Counter löschen</button>
    `;

    // Counter auf der Seite anzeigen
    // Display counter on the page
    counters.appendChild(counter);
    counter.querySelector(".deleteCounterBtn").addEventListener("click", function () {
        deleteCounter(counterData.id, counter);
    });

    // Aktuellen Tag berechnen
    // Calculate the current day
    updateCounter(counter, startDate);

    // Formular leeren
    // Clear the form
    counterForm.reset();

});

function updateCounter(counter, startDate) {
    const start = new Date(startDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference = today - start;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    ) + 1;

    counter.querySelector(".counterDay").textContent = `Tag ${days}`;
}


// Gespeicherte Counter laden
// Load saved counters
const savedCounters =
    JSON.parse(localStorage.getItem("counters")) || [];

savedCounters.forEach(function (counterData) {

    const counter = document.createElement("div");
    counter.classList.add("counter");

    counter.innerHTML = `
    <h2>${counterData.name}</h2>
    <p class="counterDay"></p>
    <p>Seit dem ${counterData.startDate}</p>
    <p>${counterData.notes}</p>
    <button class="deleteCounterBtn">Counter löschen</button>
    `;

    counters.appendChild(counter);
    counter.querySelector(".deleteCounterBtn").addEventListener("click", function () {
        deleteCounter(counterData.id, counter);
    });

    updateCounter(counter, counterData.startDate);
});

// Counter löschen
// Delete counter
function deleteCounter(id, counter) {

    if (!confirm("Möchtest du diesen Counter wirklich löschen?")) {
        return;
    }

    const savedCounters =
        JSON.parse(localStorage.getItem("counters")) || [];

    const updatedCounters = savedCounters.filter(function (counterData) {
        return counterData.id !== id;
    });

    localStorage.setItem(
        "counters",
        JSON.stringify(updatedCounters)
    );

    counter.remove();
}