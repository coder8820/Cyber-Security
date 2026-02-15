const services = {
    "termservice": { displayName: "Remote Desktop Services", state: "RUNNING", pid: 1204 },
    "wuauserv": { displayName: "Windows Update", state: "STOPPED", pid: 0 },
    "spooler": { displayName: "Print Spooler", state: "RUNNING", pid: 942 }
};

function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

function checkService() {
    const name = document.getElementById("serviceName").value.trim().toLowerCase();
    const statusCard = document.getElementById("statusCard");
    const logBox = document.getElementById("logBox");

    if (!name) return;

    logBox.innerHTML += `[${new Date().toLocaleTimeString()}] Querying ${name}...\n`;

    setTimeout(() => {
        if (services[name]) {
            const service = services[name];

            statusCard.className = "status-card";
            statusCard.classList.add(service.state === "RUNNING" ? "status-running" : "status-stopped");

            statusCard.innerHTML = `
                <h3>${service.displayName}</h3>
                <p>Status: ${service.state}</p>
                <p>PID: ${service.pid}</p>
            `;

            logBox.innerHTML += `Service ${name} is ${service.state}\n\n`;
        } else {
            statusCard.className = "status-card status-unknown";
            statusCard.innerHTML = `<p>Service Not Found</p>`;
            logBox.innerHTML += `Error 1060: Service not found\n\n`;
        }

        logBox.scrollTop = logBox.scrollHeight;
    }, 800);
}

function fillExample(name) {
    document.getElementById("serviceName").value = name;
    checkService();
}

function closeWelcome() {
    document.getElementById("welcomeModal").style.display = "none";
}
