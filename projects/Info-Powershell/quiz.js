const quizData = [
{q:"Which command shows active connections?", a:"netstat"},
{q:"Which command lists services in PowerShell?", a:"Get-Service"},
{q:"Which command shows IP configuration?", a:"ipconfig"},
{q:"Which tool queries Windows services?", a:"sc query"},
{q:"Which command lists processes?", a:"tasklist"},
{q:"Which command reads Security log?", a:"Get-EventLog"},
{q:"Which command checks TCP connections in PS?", a:"Get-NetTCPConnection"},
{q:"Which command stops a process?", a:"Stop-Process"},
{q:"Which command displays routing table?", a:"route"},
{q:"Which command tests connectivity?", a:"ping"},
];

const quizArea = document.getElementById("quizArea");

quizData.forEach((item, i) => {
    quizArea.innerHTML += `
    <p>${i+1}. ${item.q}</p>
    <input type="text" id="q${i}">
    `;
});

function submitQuiz() {
    let score = 0;

    quizData.forEach((item, i) => {
        const ans = document.getElementById("q"+i).value;
        if (ans.toLowerCase() === item.a.toLowerCase())
            score++;
    });

    let result = "Score: " + score + "/10";

    if (score >= 4) {
        result += "<p style='color:lightgreen'>🎉 Achievement Unlocked: Blue Team Beginner</p>";
    }

    document.getElementById("result").innerHTML = result;
}
