// HTML Elemente importieren
const counterForm = document.getElementById("counterForm");
const counters = document.getElementById("counters");

counterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Eingaben auslesen
    const name = document.getElementById("counterName").value;
    const startDate = document.getElementById("startDate").value;
    const notes = document.getElementById("notes").value;

    // Counter erstellen
    const counter = document.createElement("div");
    counter.classList.add("counter");

    counter.innerHTML = `
    <h2>${name}</h2>
    <p class="counterDay"></p>
    <p>Seit dem ${startDate}</p>
    <p>${notes}</p>
    `;

    // Counter auf der Seite anzeigen
    counters.appendChild(counter);

    // Aktuellen Tag berechnen
    updateCounter(counter, startDate);

    // Formular leeren
    counterForm.reset();

});

function updateCounter(counter, startDate) {
    const start = new Date(startDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference = today - start;

    const days = Math.floor(
        difference / (1000 * 60 * 60* 24)
    ) +1;

    counter.querySelector(".counterDay").textContent = `Tag ${days}`;
}