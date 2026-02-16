// Dashboard functionality for SOC Blue Team Academy

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
    initializeQuiz();
    updateStats();
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
    let progress = JSON.parse(localStorage.getItem('progress') || '{}');
    progress.lessonsCompleted = (progress.lessonsCompleted || 0) + 1;
    progress.commandsLearned = (progress.commandsLearned || 0) + 15; // Add 15 commands per lesson
    localStorage.setItem('progress', JSON.stringify(progress));
    updateStats();
    showNotification('✓ Lesson marked as complete!', 'success');
}

function completeLabProgress(labId) {
    let progress = JSON.parse(localStorage.getItem('progress') || '{}');
    progress.labsCompleted = (progress.labsCompleted || 0) + 1;
    localStorage.setItem('progress', JSON.stringify(progress));
    updateStats();
    showNotification('✓ Lab completed! Great work!', 'success');
}

// Update Statistics
function updateStats() {
    const progress = JSON.parse(localStorage.getItem('progress') || '{}');
    
    const elements = {
        'lessonsCompleted': progress.lessonsCompleted || 0,
        'labsCompleted': progress.labsCompleted || 0,
        'commandsLearned': progress.commandsLearned || 0,
        'quizScore': progress.quizScore || '0%'
    };

    Object.keys(elements).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.textContent = elements[key];
        }
    });
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
