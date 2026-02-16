const contentArea = document.getElementById("contentArea");
const searchInput = document.getElementById("searchInput");

function showSection(category) {
    renderCommands(category);
}

function renderCommands(category) {
    contentArea.innerHTML = "";

    const filtered = commandDatabase.filter(cmd =>
        cmd.category === category
    );

    filtered.forEach(cmd => {
        const card = document.createElement("div");
        card.className = "command-card";
        card.innerHTML = `
            <div class="command-title">${cmd.name}</div>
            <div>${cmd.description}</div>
            <div class="command-code">${cmd.example}</div>
        `;
        contentArea.appendChild(card);
    });
}

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = commandDatabase.filter(cmd =>
        cmd.name.toLowerCase().includes(value)
    );

    contentArea.innerHTML = "";

    filtered.forEach(cmd => {
        const card = document.createElement("div");
        card.className = "command-card";
        card.innerHTML = `
            <div class="command-title">${cmd.name}</div>
            <div>${cmd.description}</div>
            <div class="command-code">${cmd.example}</div>
        `;
        contentArea.appendChild(card);
    });
});
