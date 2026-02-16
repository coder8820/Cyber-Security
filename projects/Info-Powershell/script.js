// Main JavaScript for SOC Blue Team Academy

// Check if user is logged in
function checkLogin() {
    const user = localStorage.getItem('currentUser');
    if (!user && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const role = document.getElementById('role').value;

    if (!username || !role) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Store user session
    localStorage.setItem('currentUser', JSON.stringify({
        username: username,
        role: role,
        loginTime: new Date().toISOString()
    }));

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Initialize user name in header
function initializeUser() {
    const user = getCurrentUser();
    if (user && document.getElementById('userName')) {
        document.getElementById('userName').textContent = `Welcome, ${user.username} (${user.role})`;
    }
}

// Add CSS animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    initializeUser();
    initializeTheme();
});

// Theme Toggle Function
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    
    // Update button icon
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'light') {
        root.style.setProperty('--primary-bg', '#ffffff');
        root.style.setProperty('--secondary-bg', '#f8fafc');
        root.style.setProperty('--text-primary', '#1e293b');
        root.style.setProperty('--text-secondary', '#64748b');
        root.style.setProperty('--border-color', '#e2e8f0');
    } else {
        root.style.setProperty('--primary-bg', '#0f172a');
        root.style.setProperty('--secondary-bg', '#1e293b');
        root.style.setProperty('--text-primary', '#f1f5f9');
        root.style.setProperty('--text-secondary', '#cbd5e1');
        root.style.setProperty('--border-color', '#334155');
    }
}


