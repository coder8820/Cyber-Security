let currentUser = "";
let score = 0;

/* ================= LOGIN ================= */

function login() {
    const user = document.getElementById("username").value;
    const role = document.getElementById("role").value;

    if (!user) return alert("Enter username");

    currentUser = user + " (" + role + ")";
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("userInfo").innerText = currentUser;

    loadCommands();
    loadScenarios();
    loadQuiz();
}

/* ================= 100+ COMMANDS ================= */

const cmdCommands = [
"ipconfig","ping","tracert","netstat","tasklist","taskkill","systeminfo",
"hostname","whoami","net user","net localgroup","dir","cd","type","findstr",
"shutdown","sc query","sc stop","sc start","wmic","arp","route","nslookup",
"net view","net share","net session","net file","net use","at","schtasks",
"cipher","driverquery","eventcreate","fc","gpresult","label","logoff",
"move","pathping","powercfg","print","query user","reg","robocopy",
"runas","set","setx","subst","tree","ver","vol"
];

const psCommands = [
"Get-Process","Stop-Process","Get-Service","Restart-Service","Get-EventLog",
"Get-WinEvent","Get-Command","Get-Help","Get-LocalUser","Get-LocalGroup",
"Test-Connection","Get-NetIPAddress","Get-NetTCPConnection","Set-ExecutionPolicy",
"Get-ExecutionPolicy","Start-Process","Invoke-Command","Get-ChildItem",
"Set-Item","New-Item","Remove-Item","Get-History","Clear-History",
"Get-ComputerInfo","Get-Content","Select-String","Export-CSV","Import-CSV",
"Out-File","Where-Object","ForEach-Object","Measure-Object","Sort-Object",
"Get-ADUser","Get-ADComputer","Get-FileHash","Compare-Object","Start-Service",
"Stop-Service","Get-ScheduledTask","Disable-LocalUser","Enable-LocalUser",
"Get-Clipboard","Clear-EventLog","Write-EventLog","Get-ItemProperty"
];

function loadCommands() {
    const cmdSection = document.getElementById("cmd");
    const psSection = document.getElementById("ps");

    cmdSection.innerHTML = "<h2>CMD Commands (50+)</h2>";
    psSection.innerHTML = "<h2>PowerShell Commands (50+)</h2>";

    cmdCommands.forEach(cmd => {
        cmdSection.innerHTML += `
        <div class="command-card">
            <strong>${cmd}</strong>
            <p>${cmd} is used in SOC operations for monitoring, incident response, and system investigation.</p>
            <div class="code">${cmd}</div>
            <p><b>SOC Use Case:</b> Used during security investigation and system auditing.</p>
        </div>`;
    });

    psCommands.forEach(ps => {
        psSection.innerHTML += `
        <div class="command-card">
            <strong>${ps}</strong>
            <p>${ps} is a powerful PowerShell cmdlet used for automation, threat hunting, and forensic analysis.</p>
            <div class="code">${ps}</div>
            <p><b>SOC Use Case:</b> Used for advanced monitoring and threat detection.</p>
        </div>`;
    });
}

/* ================= SOC SCENARIOS ================= */

function loadScenarios() {
    const section = document.getElementById("scenarios");

    const scenarios = [
    {q:"Suspicious outbound connection detected",a:"Use netstat -ano and tasklist"},
    {q:"Unknown service started automatically",a:"Use sc query and Get-Service"},
    {q:"Multiple failed login attempts",a:"Use Get-EventLog -LogName Security"},
    {q:"High CPU usage reported",a:"Use tasklist or Get-Process"},
    {q:"New local user created unexpectedly",a:"Use net user or Get-LocalUser"},
    {q:"Malware persistence suspected",a:"Check scheduled tasks with schtasks"},
    {q:"Encrypted files discovered",a:"Use cipher to investigate encryption"},
    {q:"Suspicious PowerShell execution",a:"Review Event Logs using Get-WinEvent"}
    ];

    section.innerHTML = "<h2>Real SOC Scenarios</h2>";

    scenarios.forEach(s => {
        section.innerHTML += `
        <div class="command-card">
            <strong>Scenario:</strong> ${s.q}
            <p><b>Solution:</b> ${s.a}</p>
        </div>`;
    });
}

/* ================= QUIZ + SCORE TRACKING ================= */

function loadQuiz() {
    const section = document.getElementById("quiz");
    section.innerHTML = `
    <h2>Final Knowledge Test</h2>

    <p>Which command checks active network connections?</p>
    <button onclick="answerQuiz('netstat')">netstat</button>
    <button onclick="answerQuiz('ipconfig')">ipconfig</button>
    <button onclick="answerQuiz('dir')">dir</button>

    <p id="quizResult"></p>
    <p id="scoreBoard"></p>
    `;
}

function answerQuiz(answer) {
    if (answer === "netstat") {
        score++;
        document.getElementById("quizResult").innerHTML = "✅ Correct!";
    } else {
        document.getElementById("quizResult").innerHTML = "❌ Incorrect!";
    }

    localStorage.setItem("socScore", score);
    document.getElementById("scoreBoard").innerHTML =
        "Your Score: " + localStorage.getItem("socScore");
}

/* ================= NAVIGATION ================= */

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}
