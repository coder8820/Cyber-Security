function checkService() {
    const serviceName = document.getElementById("serviceName").value.trim().toLowerCase();
    const output = document.getElementById("output");

    if (serviceName === "") {
        output.innerHTML = "<p style='color:red;'>Please enter a service name.</p>";
        return;
    }

    const services = {
        "termservice": {
            displayName: "Remote Desktop Services",
            state: "RUNNING",
            pid: 1204
        },
        "wuauserv": {
            displayName: "Windows Update",
            state: "STOPPED",
            pid: 0
        },
        "spooler": {
            displayName: "Print Spooler",
            state: "RUNNING",
            pid: 942
        }
    };

    if (services[serviceName]) {
        const service = services[serviceName];

        output.innerHTML = `
SERVICE_NAME: ${serviceName}
DISPLAY_NAME: ${service.displayName}

STATE              : ${service.state}
PID                : ${service.pid}
`;
    } else {
        output.innerHTML = `
[SC] OpenService FAILED 1060:

The specified service does not exist as an installed service.
`;
    }
}

function fillExample(service) {
    document.getElementById("serviceName").value = service;
    checkService();
}

function openGuide() {
    document.getElementById("guideModal").style.display = "block";
}

function closeGuide() {
    document.getElementById("guideModal").style.display = "none";
}
