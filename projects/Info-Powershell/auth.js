function login() {
    const username = document.getElementById("username").value.trim();
    const role = document.getElementById("role").value;

    if (!username) {
        alert("Enter username");
        return;
    }

    const user = {
        username: username,
        role: role
    };

    sessionStorage.setItem("socUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
}

function logout() {
    sessionStorage.removeItem("socUser");
    window.location.href = "index.html";
}

function checkAuth() {
    const user = sessionStorage.getItem("socUser");
    if (!user) {
        window.location.href = "index.html";
    }
    return JSON.parse(user);
}

if (window.location.pathname.includes("dashboard.html")) {
    const user = checkAuth();
    document.getElementById("userInfo").innerText =
        user.username + " (" + user.role + ")";
}
