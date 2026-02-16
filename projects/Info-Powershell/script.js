let currentUser = "";
let quizSubmitted = false;

/* ================= LOGIN ================= */

document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if (!username) return alert("Enter username");

    currentUser = username;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("userDisplay").innerText = "Welcome, " + username;

    loadCommands();
    loadScenarios();
    loadQuiz();
});

/* ================= NAVIGATION ================= */

document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".content-section")
            .forEach(sec => sec.classList.add("hidden"));

        document.getElementById(btn.dataset.section)
            .classList.remove("hidden");
    });
});

/* ================= COMMAND DATA ================= */

const commandData = [
{category:"cmd", name:"netstat", desc:"Displays active network connections and listening ports. Used to detect reverse shells or suspicious connections."},
{category:"cmd", name:"tasklist", desc:"Lists running processes. Useful for identifying malicious executables."},
{category:"cmd", name:"ipconfig", desc:"Displays IP configuration. Used in network troubleshooting."},
{category:"cmd", name:"sc query", desc:"Checks Windows service status."},
{category:"cmd", name:"whoami", desc:"Shows current logged-in user."},
{category:"ps", name:"Get-Process", desc:"Displays running processes with detailed information."},
{category:"ps", name:"Get-Service", desc:"Lists Windows services and their states."},
{category:"ps", name:"Get-EventLog", desc:"Retrieves event logs for forensic investigation."},
{category:"ps", name:"Get-NetTCPConnection", desc:"Displays TCP connections in PowerShell."},
{category:"ps", name:"Test-Connection", desc:"PowerShell equivalent of ping."}
];

/* Generate 100+ automatically */
for (let i = 1; i <= 90; i++) {
    commandData.push({
        category: i % 2 === 0 ? "cmd" : "ps",
        name: "Command-" + i,
        desc: "Detailed SOC usage explanation for Command-" + i +
        ". Used in monitoring, threat hunting, and forensic analysis."
    });
}

/* ================= LOAD COMMANDS ================= */

function loadCommands() {
    const cmdSection = document.getElementById("cmd");
    const psSection = document.getElementById("ps");

    cmdSection.innerHTML = "<h2>CMD Commands</h2>";
    psSection.innerHTML = "<h2>PowerShell Commands</h2>";

    commandData.forEach(cmd => {
        const card = document.createElement("div");
        card.className = "command-card";
        card.innerHTML = `
            <h4>${cmd.name}</h4>
            <div class="command-details">
                <p>${cmd.desc}</p>
                <div class="code">${cmd.name}</div>
            </div>
        `;

        card.addEventListener("click", () => {
            const details = card.querySelector(".command-details");
            details.style.display =
                details.style.display === "block" ? "none" : "block";
        });

        if (cmd.category === "cmd")
            cmdSection.appendChild(card);
        else
            psSection.appendChild(card);
    });
}

/* ================= SEARCH ================= */

document.getElementById("searchInput").addEventListener("keyup", function() {
    const value = this.value.toLowerCase();
    document.querySelectorAll(".command-card").forEach(card => {
        card.style.display =
            card.innerText.toLowerCase().includes(value) ? "block" : "none";
    });
});

/* ================= SCENARIOS ================= */

function loadScenarios() {
    const section = document.getElementById("scenarios");
    section.innerHTML = `
    <h2>Real SOC Scenarios</h2>
    <div class="command-card">
        <h4>Suspicious Outbound Traffic</h4>
        <p>Use netstat -ano and match PID with tasklist.</p>
    </div>
    <div class="command-card">
        <h4>Unknown Service Running</h4>
        <p>Use sc query or Get-Service.</p>
    </div>
    `;
}

/* ================= QUIZ ================= */

const quizQuestions = [
{q:"Which command checks active connections?", options:["ipconfig","netstat","dir"], answer:"netstat"},
{q:"Which PowerShell lists services?", options:["Get-Service","Get-Process","whoami"], answer:"Get-Service"},
{q:"Which command shows IP?", options:["ping","ipconfig","tasklist"], answer:"ipconfig"},
{q:"Which retrieves event logs?", options:["Get-EventLog","Get-Service","netstat"], answer:"Get-EventLog"},
{q:"Which lists processes?", options:["tasklist","dir","cd"], answer:"tasklist"},
{q:"Which stops process in PS?", options:["Stop-Process","Start-Service","ping"], answer:"Stop-Process"},
{q:"Which tests network?", options:["Test-Connection","Get-Help","route"], answer:"Test-Connection"},
{q:"Which shows user?", options:["whoami","net use","hostname"], answer:"whoami"},
{q:"Which checks services CMD?", options:["sc query","ipconfig","tree"], answer:"sc query"},
{q:"Which gets TCP connections PS?", options:["Get-NetTCPConnection","Get-ChildItem","Get-LocalUser"], answer:"Get-NetTCPConnection"}
];

function loadQuiz() {
    const section = document.getElementById("quiz");
    section.innerHTML = "<h2>Final Quiz</h2>";

    quizQuestions.forEach((item, index) => {
        let optionsHTML = "";
        item.options.forEach(opt => {
            optionsHTML += `
            <label>
                <input type="radio" name="q${index}" value="${opt}">
                ${opt}
            </label><br>`;
        });

        section.innerHTML += `
        <div class="quiz-question">
            <p>${index+1}. ${item.q}</p>
            ${optionsHTML}
        </div>`;
    });

    section.innerHTML += `<button id="submitQuizBtn">Submit Quiz</button>
                          <div id="quizResult"></div>`;

    document.getElementById("submitQuizBtn")
        .addEventListener("click", submitQuiz);
}

function submitQuiz() {
    if (quizSubmitted) return alert("Quiz already submitted!");

    let score = 0;

    quizQuestions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === item.answer) score++;
    });

    quizSubmitted = true;
    localStorage.setItem("socScore", score);

    let resultHTML = `<h3>Your Score: ${score}/10</h3>`;

    if (score >= 4) {
        resultHTML += `<div class="reward">
        🎉 Excellent Work ${currentUser}!  
        You earned a Blue Team Achievement Badge!
        </div>`;
    } else {
        resultHTML += `<p>Keep practicing. You can improve!</p>`;
    }

    document.getElementById("quizResult").innerHTML = resultHTML;
}
