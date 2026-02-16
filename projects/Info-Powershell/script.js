const cmdList = [
"ipconfig","ping","tracert","netstat","tasklist","taskkill","systeminfo",
"hostname","whoami","net user","net localgroup","dir","cd","type","findstr",
"shutdown","sc query","sc stop","sc start","wmic","arp","route","nslookup",
"net view","net share"
];

const psList = [
"Get-Process","Stop-Process","Get-Service","Restart-Service","Get-EventLog",
"Get-WinEvent","Get-Command","Get-Help","Get-LocalUser","Get-LocalGroup",
"Test-Connection","Get-NetIPAddress","Get-NetTCPConnection","Set-ExecutionPolicy",
"Get-ExecutionPolicy","Start-Process","Invoke-Command","Get-ChildItem",
"Set-Item","New-Item","Remove-Item","Get-History","Clear-History",
"Get-ComputerInfo","Get-Content","Select-String","Export-CSV"
];

function createCommandCard(command, containerId) {
    const container = document.getElementById(containerId);

    const card = document.createElement("div");
    card.className = "command-card";
    card.innerHTML = `
        <strong>${command}</strong>
        <div class="command-details">
            <p>${command} is an important administrative and monitoring command used in SOC environments for investigation, threat detection, and system management.</p>
            <div class="code">${command}</div>
        </div>
    `;

    card.addEventListener("click", function() {
        const details = card.querySelector(".command-details");
        details.style.display = details.style.display === "block" ? "none" : "block";
    });

    container.appendChild(card);
}

cmdList.forEach(cmd => createCommandCard(cmd, "cmdCommands"));
psList.forEach(ps => createCommandCard(ps, "psCommands"));

function searchCommands() {
    let input = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".command-card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}

function showSolution() {
    document.getElementById("solution").classList.remove("hidden");
}

function showQuiz() {
    document.getElementById("quizSection").classList.remove("hidden");
    window.scrollTo(0, document.body.scrollHeight);
}

function checkQuiz() {
    const answer = document.querySelector('input[name="quiz"]:checked');
    if (!answer) return;

    if (answer.value === "2") {
        document.getElementById("quizResult").innerHTML = "✅ Correct! Get-EventLog retrieves Windows event logs.";
    } else {
        document.getElementById("quizResult").innerHTML = "❌ Incorrect. Correct answer: Get-EventLog.";
    }
}
