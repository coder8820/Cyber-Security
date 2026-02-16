const container = document.getElementById("commandContainer");
const search = document.getElementById("search");

function loadCategory(category) {
    container.innerHTML = "";

    const filtered = commandDatabase.filter(c =>
        c.category === category);

    filtered.forEach(cmd => {
        const div = document.createElement("div");
        div.className = "command-card";
        div.innerHTML = `
            <strong>${cmd.name}</strong>
            <p>${cmd.desc}</p>
            <div class="code">${cmd.example}</div>
        `;
        container.appendChild(div);
    });
}

search.addEventListener("keyup", () => {
    const value = search.value.toLowerCase();
    container.innerHTML = "";

    commandDatabase
        .filter(cmd => cmd.name.toLowerCase().includes(value))
        .forEach(cmd => {
            const div = document.createElement("div");
            div.className = "command-card";
            div.innerHTML = `
                <strong>${cmd.name}</strong>
                <p>${cmd.desc}</p>
                <div class="code">${cmd.example}</div>
            `;
            container.appendChild(div);
        });
});
