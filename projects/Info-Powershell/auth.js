function login() {
    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value;

    if (!username) {
        alert("Enter username");
        return;
    }

    sessionStorage.setItem("socUser",
        JSON.stringify({username, role}));

    window.location = "dashboard.html";
}

function logout() {
    sessionStorage.removeItem("socUser");
    window.location = "index.html";
}

function checkAuth() {
    const user = sessionStorage.getItem("socUser");
    if (!user) window.location = "index.html";
    return JSON.parse(user);
}

if (document.getElementById("userInfo")) {
    const user = checkAuth();
    document.getElementById("userInfo").innerText =
        user.username + " (" + user.role + ")";
}
