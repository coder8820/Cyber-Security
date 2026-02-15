function checkService() {
    const serviceName = document.getElementById("serviceName").value.trim().toLowerCase();
    const output = document.getElementById("output");

    if (serviceName === "") {
        output.innerHTML = "<p style='color:red;'>Please enter a service name.</p>";
        return;
    }

    // Simulated services database
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

        TYPE               : 20  WIN32_SHARE_PROCESS
        STATE              : 4  ${service.state}
                                (STOPPABLE, PAUSABLE, ACCEPTS_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
        PID                : ${service.pid}
`;
    } else {
        output.innerHTML = `
[SC] OpenService FAILED 1060:

The specified service does not exist as an installed service.
`;
    }
}
