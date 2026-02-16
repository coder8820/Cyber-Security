let score = 0;

/* LOGIN */
function login() {
    const user = document.getElementById("username").value;
    if (!user) return alert("Enter username");

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("userInfo").innerText = "Welcome, " + user;

    loadCommands();
    loadScenarios();
    loadQuiz();
}

/* COMMANDS */
const commands = [
"ipconfig","ping","tracert","netstat","tasklist","taskkill","systeminfo",
"hostname","whoami","net user","net localgroup","dir","cd","type","findstr",
"shutdown","sc query","wmic","arp","route","nslookup","Get-Process",
"Get-Service","Get-EventLog","Get-WinEvent","Get-LocalUser","Test-Connection",
"Get-NetTCPConnection","Start-Process","Invoke-Command","Get-Content"
];

function loadCommands() {
    document.getElementById("cmd").innerHTML = "<h2>CMD Commands</h2>";
    document.getElementById("ps").innerHTML = "<h2>PowerShell Commands</h2>";

    commands.forEach(cmd => {
        document.getElementById("cmd").innerHTML += `
        <div class="command-card">
        <strong>${cmd}</strong>
        <p>${cmd} is used in security monitoring, threat detection, and forensic investigations in SOC.</p>
        <div class="code">${cmd}</div>
        </div>`;
    });
}

/* SCENARIOS */
function loadScenarios() {
    document.getElementById("scenarios").innerHTML = `
    <h2>SOC Real Scenarios</h2>
    <div class="command-card">
    Suspicious network traffic detected → Use netstat -ano
    </div>
    <div class="command-card">
    Unknown service running → Use sc query
    </div>
    `;
}

/* QUIZ */
const quizQuestions = [
{q:"Which command shows active connections?",a:"netstat"},
{q:"Which command lists services?",a:"Get-Service"},
{q:"Which command shows IP config?",a:"ipconfig"},
{q:"Which retrieves event logs?",a:"Get-EventLog"},
{q:"Which lists processes?",a:"tasklist"},
{q:"Which stops a process?",a:"Stop-Process"},
{q:"Which tests network connectivity?",a:"Test-Connection"},
{q:"Which shows current user?",a:"whoami"},
{q:"Which checks services (CMD)?",a:"sc query"},
{q:"Which gets TCP connections?",a:"Get-NetTCPConnection"}
];

function loadQuiz() {
    let html = "<h2>Final Knowledge Test</h2>";
    quizQuestions.forEach((item, index) => {
        html += `
        <div class="command-card">
        <p>${index+1}. ${item.q}</p>
        <input type="text" id="q${index}">
        </div>`;
    });
    html += `<button onclick="submitQuiz()">Submit Quiz</button>
    <div id="quizResult"></div>`;
    document.getElementById("quiz").innerHTML = html;
}

function submitQuiz() {
    score = 0;
    quizQuestions.forEach((item, index) => {
        const ans = document.getElementById("q"+index).value.trim();
        if (ans.toLowerCase() === item.a.toLowerCase()) score++;
    });

    let result = `Your Score: ${score}/10`;

    if (score >= 4) {
        result += `<div class="reward">🎉 Great Job! You earned a Blue Team Star Reward!</div>`;
    } else {
        result += `<p>Keep practicing! You can improve 💪</p>`;
    }

    document.getElementById("quizResult").innerHTML = result;
}

/* NAVIGATION */
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}
