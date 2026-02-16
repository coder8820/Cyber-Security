// Dashboard functionality for SOC Blue Team Academy

// Global system references
let enhancedQuiz = null;
let learningRoadmap = null;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

function initializeDashboard() {
    renderLessons();
    renderLabs();
    renderTools();
    renderCommandReference();
    initializeAnalytics();
    initializeCertificates();
    initializeReports();
    
    // Initialize roadmap
    learningRoadmap = new LearningRoadmap();
    if (document.getElementById('roadmap-container')) {
        learningRoadmap.render();
    }
    
    // Initialize enhanced quiz
    enhancedQuiz = new EnhancedQuizSystem(quizData);
    if (document.getElementById('enhanced-quiz-container')) {
        renderEnhancedQuizButton();
    }
    
    updateStats();
}

// Render enhanced quiz start button
function renderEnhancedQuizButton() {
    const container = document.getElementById('enhanced-quiz-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(8, 145, 178, 0.1)); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.3);">
            <p style="color: #cbd5e1; margin-bottom: 20px;">Test your knowledge with our comprehensive assessment quiz. Answer 10 questions about PowerShell, CMD, and SOC operations.</p>
            <button onclick="startEnhancedQuiz()" style="padding: 14px 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 15px;">
                🚀 Start Assessment
            </button>
        </div>
    `;
}

// Start enhanced quiz
function startEnhancedQuiz() {
    if (!enhancedQuiz) {
        enhancedQuiz = new EnhancedQuizSystem(quizData);
    }
    enhancedQuiz.start();
}

// Show/Hide sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    // Add active class to clicked nav link
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Refresh data for specific sections
    if (sectionId === 'analytics' && typeof initializeAnalytics === 'function') {
        setTimeout(() => initializeAnalytics(), 100);
    }
    if (sectionId === 'certificates' && typeof initializeCertificates === 'function') {
        setTimeout(() => initializeCertificates(), 100);
    }
    if (sectionId === 'reports' && typeof initializeReports === 'function') {
        setTimeout(() => initializeReports(), 100);
    }
    if (sectionId === 'profile') {
        renderProfile();
    }
}

// Render User Profile with Achievements
function renderProfile() {
    const profileContainer = document.getElementById('profileContainer');
    if (!profileContainer) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const allAchievements = [
        { id: 1, name: '🌱 First Steps', desc: 'Complete your first lesson', unlocked: currentUser.lessonsCompleted >= 1 },
        { id: 2, name: '📚 Lesson Streak', desc: 'Complete 5 lessons', unlocked: currentUser.lessonsCompleted >= 5 },
        { id: 3, name: '🔬 Lab Master', desc: 'Complete 3 lab exercises', unlocked: currentUser.labsCompleted >= 3 },
        { id: 4, name: '📝 Knowledge Test', desc: 'Score 80% on quiz', unlocked: currentUser.quizScore >= 80 },
        { id: 5, name: '⚡ Quick Learner', desc: 'Complete a quiz in under 10 minutes', unlocked: currentUser.quickLearner || false },
        { id: 6, name: '🏆 Command Expert', desc: 'Learn 50+ commands', unlocked: currentUser.commandsLearned >= 50 }
    ];

    const unlockedCount = allAchievements.filter(a => a.unlocked).length;
    const lastActive = localStorage.getItem('lastActive') || 'Today';

    profileContainer.innerHTML = `
        <div class="profile-wrapper">
            <div class="profile-header">
                <div class="profile-banner"></div>
                <div class="profile-info">
                    <div class="profile-pic">
                        <span class="profile-avatar">${currentUser.username?.charAt(0).toUpperCase() || 'U'}</span>
                    </div>
                    <div class="profile-details">
                        <h2>${currentUser.username || 'User'}</h2>
                        <p class="profile-role">Role: <strong>${currentUser.role || 'Student'}</strong></p>
                        <p class="profile-email">${currentUser.email || 'email@example.com'}</p>
                        <p class="profile-joined">Joined: ${new Date(currentUser.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <div class="profile-stats">
                <div class="stat-item">
                    <span class="stat-icon">📚</span>
                    <div class="stat-content">
                        <h4>${currentUser.lessonsCompleted || 0}</h4>
                        <p>Lessons Completed</p>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">🔧</span>
                    <div class="stat-content">
                        <h4>${currentUser.labsCompleted || 0}</h4>
                        <p>Labs Completed</p>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">📊</span>
                    <div class="stat-content">
                        <h4>${currentUser.quizScore || 0}%</h4>
                        <p>Best Quiz Score</p>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">⚡</span>
                    <div class="stat-content">
                        <h4>${currentUser.commandsLearned || 0}</h4>
                        <p>Commands Learned</p>
                    </div>
                </div>
            </div>

            <div class="profile-section">
                <h3>🏆 Achievements (${unlockedCount}/${allAchievements.length})</h3>
                <div class="achievements-grid-profile">
                    ${allAchievements.map(achievement => `
                        <div class="achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}">
                            <div class="achievement-icon">${achievement.name.split(' ')[0]}</div>
                            <h4>${achievement.name}</h4>
                            <p>${achievement.desc}</p>
                            ${!achievement.unlocked ? '<span class="achievement-locked">🔒 Locked</span>' : '<span class="achievement-unlocked">✓ Unlocked</span>'}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="profile-section">
                <h3>⚙️ Settings</h3>
                <div class="profile-settings">
                    <button class="settings-btn" onclick="changePassword()">🔐 Change Password</button>
                    <button class="settings-btn" onclick="editProfile()">✏️ Edit Profile</button>
                    <button class="settings-btn" onclick="downloadCertificate()">📥 Download Certificate</button>
                </div>
            </div>
        </div>
    `;
}

// Change password
function changePassword() {
    const newPassword = prompt('Enter new password (min 6 chars, with uppercase, lowercase, numbers):');
    if (!newPassword) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const result = authSystem.changePassword(currentUser.id, currentUser.password, newPassword, newPassword);
    
    if (result.success) {
        alert('✅ Password changed successfully!');
        currentUser.password = result.user.password;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        alert('❌ ' + result.message);
    }
}

// Edit profile
function editProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const newEmail = prompt('Enter new email:', currentUser.email);
    if (!newEmail) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        alert('❌ Invalid email format!');
        return;
    }

    currentUser.email = newEmail;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert('✅ Profile updated successfully!');
    renderProfile();
}

// Download certificate
function downloadCertificate() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    if ((currentUser.quizScore || 0) < 80) {
        alert('📊 You need 80% quiz score to download certificate!');
        return;
    }

    const certificateHTML = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 40px; background: #f5f5f5; }
                    .certificate { background: white; max-width: 900px; margin: 0 auto; padding: 60px; box-shadow: 0 0 30px rgba(0,0,0,0.2); }
                    .certificate h1 { color: #2c3e50; font-size: 48px; margin-bottom: 30px; }
                    .certificate-text { color: #555; font-size: 18px; margin: 30px 0; }
                    .student-name { font-size: 36px; font-weight: bold; color: #3b82f6; margin: 30px 0; }
                    .date { color: #888; font-size: 14px; margin-top: 40px; }
                    .signature { margin-top: 60px; border-top: 2px solid #333; display: inline-block; padding-top: 20px; }
                </style>
            </head>
            <body>
                <div class="certificate">
                    <h1>🏆 Certificate of Achievement</h1>
                    <p class="certificate-text">This is to certify that</p>
                    <div class="student-name">${currentUser.username}</div>
                    <p class="certificate-text">has successfully completed the SOC Blue Team Academy course with a quiz score of <strong>${currentUser.quizScore}%</strong></p>
                    <p class="certificate-text">and demonstrated proficiency in PowerShell, Command Prompt, and SOC operations.</p>
                    <p class="date">Issued on: ${new Date().toLocaleDateString()}</p>
                    <div class="signature">SOC Blue Team Academy</div>
                </div>
            </body>
        </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(certificateHTML);
    win.print();
}


// Render Lessons
function renderLessons() {
    const container = document.getElementById('lessonsContainer');
    if (!container) return;

    container.innerHTML = lessonsData.map(lesson => `
        <div class="course-card" onclick="viewLesson(${lesson.id})">
            <div class="card-header">
                <h3 class="card-title">${lesson.title}</h3>
                <span class="badge badge-${lesson.difficulty.toLowerCase()}">${lesson.difficulty}</span>
            </div>
            <p class="card-description">${lesson.description}</p>
            <div class="card-meta">
                <span>⏱️ ${lesson.duration}</span>
                <span>📚 ${lesson.category}</span>
            </div>
            <button class="card-button" onclick="event.stopPropagation(); viewLesson(${lesson.id})">Start Learning</button>
        </div>
    `).join('');
}

// Render Labs
function renderLabs() {
    const container = document.getElementById('labsContainer');
    if (!container) return;

    container.innerHTML = labsData.map(lab => `
        <div class="lab-card" onclick="viewLab(${lab.id})">
            <div class="card-header">
                <h3 class="card-title">${lab.title}</h3>
                <span class="badge badge-${lab.difficulty.toLowerCase()}">${lab.difficulty}</span>
            </div>
            <p class="card-description">${lab.description}</p>
            <div class="card-meta">
                <span>⏱️ ${lab.duration}</span>
                <span>📊 Practice Exercise</span>
            </div>
            <button class="card-button" onclick="event.stopPropagation(); viewLab(${lab.id})">Start Lab</button>
        </div>
    `).join('');
}

// Render Tools
function renderTools() {
    const container = document.getElementById('toolsContainer');
    if (!container) return;

    container.innerHTML = toolsData.map((tool, index) => `
        <div class="tool-card">
            <h3 class="card-title">${tool.name}</h3>
            <p class="badge" style="background: rgba(59, 130, 246, 0.3); color: #3b82f6;">${tool.category}</p>
            <p class="card-description">${tool.description}</p>
            <div style="margin: 15px 0;">
                <strong style="color: #f1f5f9;">Key Tools:</strong>
                <ul style="margin-top: 8px;">
                    ${tool.tools.map(t => `<li style="color: #cbd5e1; font-size: 13px;">• ${t}</li>`).join('')}
                </ul>
            </div>
            <div style="padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 6px; border-left: 2px solid #10b981; margin-top: 15px;">
                <small style="color: #10b981;"><strong>✓ ${tool.helpfulness}</strong></small>
            </div>
        </div>
    `).join('');
}

// View Lesson Details
function viewLesson(lessonId) {
    const lesson = lessonsData.find(l => l.id === lessonId);
    if (!lesson) return;

    // Create modal/overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: #1e293b;
        border: 1px solid #475569;
        border-radius: 10px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 30px;
        color: #f1f5f9;
    `;

    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="color: #3b82f6; margin: 0;">${lesson.title}</h2>
            <button onclick="this.closest('div').parentElement.parentElement.remove()" style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Close</button>
        </div>
        <div style="display: flex; gap: 15px; margin-bottom: 25px;">
            <span class="badge badge-${lesson.difficulty.toLowerCase()}" style="padding: 6px 12px;">${lesson.difficulty}</span>
            <span style="padding: 6px 12px; background: #334155; border-radius: 6px; font-size: 12px;">⏱️ ${lesson.duration}</span>
            <span style="padding: 6px 12px; background: #334155; border-radius: 6px; font-size: 12px;">📚 ${lesson.category}</span>
        </div>
        <div class="lesson-content">
            ${lesson.content}
        </div>
        <button onclick="completeLessonProgress(${lesson.id}); this.closest('div').parentElement.parentElement.remove();" style="width: 100%; margin-top: 20px; padding: 12px; background: #10b981; border: none; border-radius: 6px; color: white; font-weight: 600; cursor: pointer;">Mark as Complete</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// View Lab Details
function viewLab(labId) {
    const lab = labsData.find(l => l.id === labId);
    if (!lab) return;

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: #1e293b;
        border: 1px solid #475569;
        border-radius: 10px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 30px;
        color: #f1f5f9;
    `;

    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="color: #3b82f6; margin: 0;">🔧 ${lab.title}</h2>
            <button onclick="this.closest('div').parentElement.parentElement.remove()" style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Close</button>
        </div>
        <div style="display: flex; gap: 15px; margin-bottom: 25px;">
            <span class="badge badge-${lab.difficulty.toLowerCase()}" style="padding: 6px 12px;">${lab.difficulty}</span>
            <span style="padding: 6px 12px; background: #334155; border-radius: 6px; font-size: 12px;">⏱️ ${lab.duration}</span>
        </div>
        <h3 style="color: #3b82f6; margin-top: 0;">Lab Objectives:</h3>
        <ol style="color: #cbd5e1; line-height: 1.8;">
            ${lab.tasks.map(task => `<li style="margin-bottom: 10px;">${task}</li>`).join('')}
        </ol>
        <div style="background: #0f172a; padding: 20px; border-radius: 6px; border-left: 3px solid #f59e0b; margin: 20px 0;">
            <p style="margin: 0; color: #f59e0b;"><strong>💡 Tip:</strong> Use the Command Reference section while completing this lab to look up commands and syntax.</p>
        </div>
        <button onclick="completeLabProgress(${lab.id}); this.closest('div').parentElement.parentElement.remove();" style="width: 100%; margin-top: 20px; padding: 12px; background: #10b981; border: none; border-radius: 6px; color: white; font-weight: 600; cursor: pointer;">Complete Lab</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Filter Commands by Type
function filterCommands(type) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter and render commands
    const filtered = type === 'all' ? commandsReference : commandsReference.filter(cmd => cmd.type.toLowerCase() === type.toLowerCase());
    
    const list = document.getElementById('commandsReference');
    if (list) {
        list.innerHTML = filtered.map(cmd => `
            <div class="command-item">
                <div class="command-header">
                    <span class="command-name">${cmd.name}</span>
                    <span class="command-type">${cmd.type}</span>
                </div>
                <div class="command-syntax">${cmd.syntax}</div>
                <p class="command-description"><strong>Description:</strong> ${cmd.description}</p>
                <div class="command-example">
                    <label>Example:</label>
                    <code>${cmd.example}</code>
                </div>
                <div class="command-usecase">
                    <strong>💼 SOC Use Case:</strong> ${cmd.useCase}
                </div>
            </div>
        `).join('');
    }
}

// Initialize Command Reference on load
function renderCommandReference() {
    if (!document.getElementById('commandsReference')) return;
    
    filterCommands('all');
}

// Track Progress
function completeLessonProgress(lessonId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    if (!currentUser.id) return;
    
    // Track the lesson in authSystem
    const result = authSystem.completLesson(currentUser.id, lessonId);
    if (result.success) {
        // Update localStorage with new user data
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        updateStats();
        showNotification('✓ Lesson marked as complete!', 'success');
    }
}

function completeLabProgress(labId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    if (!currentUser.id) return;
    
    // Track the lab in authSystem
    const result = authSystem.completeLab(currentUser.id, labId);
    if (result.success) {
        // Update localStorage with new user data
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        updateStats();
        showNotification('✓ Lab completed! Great work!', 'success');
    }
}

// Update Statistics
function updateStats() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    const elements = {
        'lessonsCompleted': currentUser.lessonsCompleted || 0,
        'labsCompleted': currentUser.labsCompleted || 0,
        'commandsLearned': currentUser.commandsLearned || 0,
        'quizScore': currentUser.quizScore ? currentUser.quizScore + '%' : '0%'
    };

    Object.keys(elements).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.textContent = elements[key];
        }
    });

    // Update user name in header
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = currentUser.username ? `Welcome, ${currentUser.username}!` : 'Welcome!';
    }
}

// Helper function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
