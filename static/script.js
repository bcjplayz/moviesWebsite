const searchForm = document.getElementById("d");
const searchInput = document.getElementById("search");
const results = document.querySelector("main");

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        results.textContent = "Enter a movie title to search.";
        return;
    }

    if (!window.WATCHMODE_API_KEY) {
        results.textContent = "Set WATCHMODE_API_KEY in movieWebsite/config.js before searching.";
        return;
    }

    results.textContent = "Searching...";

    const params = new URLSearchParams({
        apiKey: window.WATCHMODE_API_KEY,
        search_field: "name",
        search_value: searchTerm,
    });

    try {
        const response = await fetch(`https://api.watchmode.com/v1/search/?${params}`);
        if (!response.ok) {
            throw new Error(`Watchmode request failed (${response.status}).`);
        }

        const data = await response.json();
        displayResults(data.title_results ?? []);
    } catch (error) {
        results.textContent = error instanceof Error
            ? error.message
            : "Could not complete the Watchmode search.";
    }
});

function displayResults(movies) {
    results.replaceChildren();

    if (movies.length === 0) {
        results.textContent = "No matching titles found.";
        return;
    }

    movies.forEach((movie) => {
        const item = document.createElement("div");
        const name = movie.name ?? movie.title ?? "Untitled";
        item.textContent = movie.year ? `${name} (${movie.year})` : name;
        results.appendChild(item);
    });
}