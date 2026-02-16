// Reports & Export Functions

function initializeReports() {
    renderReports();
}

function renderReports() {
    const container = document.getElementById('reportsContainer');
    const progress = JSON.parse(localStorage.getItem('progress')) || {
        lessonsCompleted: 0,
        labsCompleted: 0,
        commandsLearned: 0,
        quizScore: 0
    };
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    container.innerHTML = `
        <div class="reports-main">
            <div class="report-section">
                <h3>📊 Learning Report Overview</h3>
                <div class="report-card">
                    <div class="report-item">
                        <span class="label">Learner:</span>
                        <span class="value">${currentUser.username || 'Unknown'}</span>
                    </div>
                    <div class="report-item">
                        <span class="label">Role:</span>
                        <span class="value">${currentUser.role || 'Student'}</span>
                    </div>
                    <div class="report-item">
                        <span class="label">Report Date:</span>
                        <span class="value">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>
                    </div>
                    <div class="report-item">
                        <span class="label">Overall Progress:</span>
                        <span class="value font-bold">${calculateReportProgress(progress)}%</span>
                    </div>
                </div>
            </div>

            <div class="report-section">
                <h3>📈 Detailed Statistics</h3>
                <div class="statistics-grid">
                    <div class="stat-card">
                        <h4>📚 Lessons</h4>
                        <div class="stat-value">${progress.lessonsCompleted}/${lessonsData.length}</div>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${(progress.lessonsCompleted / lessonsData.length * 100).toFixed(0)}%"></div>
                        </div>
                        <div class="stat-percent">${(progress.lessonsCompleted / lessonsData.length * 100).toFixed(1)}%</div>
                    </div>
                    
                    <div class="stat-card">
                        <h4>🔧 Labs</h4>
                        <div class="stat-value">${progress.labsCompleted}/${labsData.length}</div>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${(progress.labsCompleted / labsData.length * 100).toFixed(0)}%"></div>
                        </div>
                        <div class="stat-percent">${(progress.labsCompleted / labsData.length * 100).toFixed(1)}%</div>
                    </div>
                    
                    <div class="stat-card">
                        <h4>📖 Commands</h4>
                        <div class="stat-value">${progress.commandsLearned}/${commandsReference.length}</div>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${(progress.commandsLearned / commandsReference.length * 100).toFixed(0)}%"></div>
                        </div>
                        <div class="stat-percent">${(progress.commandsLearned / commandsReference.length * 100).toFixed(1)}%</div>
                    </div>
                    
                    <div class="stat-card">
                        <h4>📝 Quiz</h4>
                        <div class="stat-value">${progress.quizScore}%</div>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${progress.quizScore}%"></div>
                        </div>
                        <div class="stat-percent">${progress.quizScore >= 60 ? '✅ PASSED' : '⏳ In Progress'}</div>
                    </div>
                </div>
            </div>

            <div class="report-section">
                <h3>📋 Completed Lessons</h3>
                <div class="completed-items">
                    ${generateLessonsReport(progress)}
                </div>
            </div>

            <div class="report-section">
                <h3>🔧 Completed Labs</h3>
                <div class="completed-items">
                    ${generateLabsReport(progress)}
                </div>
            </div>

            <div class="report-section">
                <h3>📤 Export Options</h3>
                <div class="export-buttons">
                    <button class="export-btn pdf-btn" onclick="exportReportPDF()">
                        <span class="btn-icon">📄</span>
                        <span class="btn-text">Export as PDF</span>
                    </button>
                    <button class="export-btn csv-btn" onclick="exportReportCSV()">
                        <span class="btn-icon">📊</span>
                        <span class="btn-text">Export as CSV</span>
                    </button>
                    <button class="export-btn json-btn" onclick="exportReportJSON()">
                        <span class="btn-icon">{ }</span>
                        <span class="btn-text">Export as JSON</span>
                    </button>
                    <button class="export-btn print-btn" onclick="window.print()">
                        <span class="btn-icon">🖨️</span>
                        <span class="btn-text">Print Report</span>
                    </button>
                    <button class="export-btn email-btn" onclick="generateEmailReport()">
                        <span class="btn-icon">📧</span>
                        <span class="btn-text">Email Report</span>
                    </button>
                </div>
            </div>

            <div class="report-section">
                <h3>💡 Performance Summary</h3>
                <div class="summary-card">
                    ${generatePerformanceSummary(progress)}
                </div>
            </div>

            <div class="report-section">
                <h3>🎯 Goals & Recommendations</h3>
                <div class="goals-list">
                    ${generateGoalsRecommendations(progress)}
                </div>
            </div>
        </div>
    `;
}

function calculateReportProgress(progress) {
    const total = lessonsData.length + labsData.length + 50 + 100; // Lessons + Labs + Commands + Quiz
    const completed = (progress.lessonsCompleted * 100) + (progress.labsCompleted * 100) + progress.commandsLearned + Math.min(progress.quizScore, 100);
    return Math.min((completed / total * 100).toFixed(1), 100);
}

function generateLessonsReport(progress) {
    if (progress.lessonsCompleted === 0) {
        return '<p class="no-data">No lessons completed yet. Start your learning journey!</p>';
    }
    
    let html = '';
    for (let i = 0; i < Math.min(progress.lessonsCompleted, lessonsData.length); i++) {
        const lesson = lessonsData[i];
        html += `
            <div class="report-item-box completed">
                <div class="item-header">
                    <span class="item-number">${i + 1}</span>
                    <span class="item-name">${lesson.title}</span>
                    <span class="check-mark">✓</span>
                </div>
                <div class="item-details">
                    <span class="detail">Level: ${lesson.level}</span>
                    <span class="detail">Duration: ${lesson.duration}</span>
                </div>
            </div>
        `;
    }
    return html;
}

function generateLabsReport(progress) {
    if (progress.labsCompleted === 0) {
        return '<p class="no-data">No labs completed yet. Start practicing!</p>';
    }
    
    let html = '';
    for (let i = 0; i < Math.min(progress.labsCompleted, labsData.length); i++) {
        const lab = labsData[i];
        html += `
            <div class="report-item-box completed">
                <div class="item-header">
                    <span class="item-number">${i + 1}</span>
                    <span class="item-name">${lab.title}</span>
                    <span class="check-mark">✓</span>
                </div>
                <div class="item-details">
                    <span class="detail">Level: ${lab.level}</span>
                    <span class="detail">Duration: ${lab.duration}</span>
                    <span class="detail">Tasks: ${lab.tasks.length}</span>
                </div>
            </div>
        `;
    }
    return html;
}

function generatePerformanceSummary(progress) {
    let summary = '<ul class="summary-list">';
    
    summary += `<li><strong>Total Learning Time:</strong> ${Math.ceil(progress.lessonsCompleted * 45 + progress.labsCompleted * 50)} minutes</li>`;
    summary += `<li><strong>Lessons Completed:</strong> ${progress.lessonsCompleted} of ${lessonsData.length}</li>`;
    summary += `<li><strong>Labs Practiced:</strong> ${progress.labsCompleted} of ${labsData.length}</li>`;
    summary += `<li><strong>Commands Learned:</strong> ${progress.commandsLearned} of ${commandsReference.length}</li>`;
    summary += `<li><strong>Quiz Score:</strong> ${progress.quizScore}% (${progress.quizScore >= 80 ? 'Excellent' : progress.quizScore >= 60 ? 'Good' : 'Needs Improvement'})</li>`;
    
    const overallLevel = calculateReportProgress(progress);
    summary += `<li><strong>Proficiency Level:</strong> ${overallLevel >= 80 ? 'Advanced' : overallLevel >= 60 ? 'Intermediate' : 'Beginner'}</li>`;
    
    summary += '</ul>';
    return summary;
}

function generateGoalsRecommendations(progress) {
    let goals = '';
    
    const remaining = lessonsData.length - progress.lessonsCompleted;
    const labsRemaining = labsData.length - progress.labsCompleted;
    
    goals += `<div class="goal-item">
        <span class="goal-icon">🎯</span>
        <div class="goal-content">
            <h4>Next Steps</h4>
            <p>${remaining > 0 ? `Complete ${remaining} more lessons to finish the course.` : 'All lessons completed! 🎉'}</p>
        </div>
    </div>`;
    
    if (progress.quizScore < 60) {
        goals += `<div class="goal-item">
            <span class="goal-icon">📝</span>
            <div class="goal-content">
                <h4>Improve Quiz Score</h4>
                <p>Your current score is ${progress.quizScore}%. Review lessons and retake the quiz to improve your proficiency.</p>
            </div>
        </div>`;
    }
    
    if (progress.commandsLearned < 10) {
        goals += `<div class="goal-item">
            <span class="goal-icon">📖</span>
            <div class="goal-content">
                <h4>Master More Commands</h4>
                <p>Learn and practice ${commandsReference.length - progress.commandsLearned} more commands to become an expert.</p>
            </div>
        </div>`;
    }
    
    if (labsRemaining > 0) {
        goals += `<div class="goal-item">
            <span class="goal-icon">🔧</span>
            <div class="goal-content">
                <h4>Hands-On Practice</h4>
                <p>Complete ${labsRemaining} more labs to strengthen your practical skills.</p>
            </div>
        </div>`;
    }
    
    return goals;
}

function exportReportPDF() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    const reportData = `
Learning Report - ${currentUser.username}
Generated: ${new Date().toLocaleDateString()}

SUMMARY
-------
Learner: ${currentUser.username}
Role: ${currentUser.role}
Overall Progress: ${calculateReportProgress(progress)}%

STATISTICS
----------
Lessons Completed: ${progress.lessonsCompleted}/${lessonsData.length}
Labs Completed: ${progress.labsCompleted}/${labsData.length}
Commands Learned: ${progress.commandsLearned}/${commandsReference.length}
Quiz Score: ${progress.quizScore}%

PERFORMANCE
-----------
Learning Time: ${Math.ceil(progress.lessonsCompleted * 45 + progress.labsCompleted * 50)} minutes
Status: ${progress.quizScore >= 80 ? 'Excellent' : progress.quizScore >= 60 ? 'Good' : 'In Progress'}
    `;
    
    downloadReport(reportData, 'learning-report.txt', 'text/plain');
    showNotification('✅ Report downloaded as text file!', 'success');
}

function exportReportCSV() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    const csvData = [
        ['Metric', 'Value'],
        ['Learner', currentUser.username],
        ['Role', currentUser.role],
        ['Report Date', new Date().toLocaleDateString()],
        ['Lessons Completed', `${progress.lessonsCompleted}/${lessonsData.length}`],
        ['Labs Completed', `${progress.labsCompleted}/${labsData.length}`],
        ['Commands Learned', `${progress.commandsLearned}/${commandsReference.length}`],
        ['Quiz Score', `${progress.quizScore}%`],
        ['Overall Progress', `${calculateReportProgress(progress)}%`],
        ['Learning Time (minutes)', Math.ceil(progress.lessonsCompleted * 45 + progress.labsCompleted * 50)]
    ].map(row => row.join(',')).join('\n');
    
    downloadReport(csvData, 'learning-report.csv', 'text/csv');
    showNotification('✅ Report downloaded as CSV!', 'success');
}

function exportReportJSON() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    const jsonData = {
        reportDate: new Date().toISOString(),
        learner: currentUser.username,
        role: currentUser.role,
        progress: progress,
        statistics: {
            lessonsCompleted: progress.lessonsCompleted,
            totalLessons: lessonsData.length,
            labsCompleted: progress.labsCompleted,
            totalLabs: labsData.length,
            commandsLearned: progress.commandsLearned,
            totalCommands: commandsReference.length,
            quizScore: progress.quizScore,
            overallProgress: calculateReportProgress(progress)
        },
        learningTime: {
            lessonsMinutes: progress.lessonsCompleted * 45,
            labsMinutes: progress.labsCompleted * 50,
            totalMinutes: Math.ceil(progress.lessonsCompleted * 45 + progress.labsCompleted * 50)
        }
    };
    
    downloadReport(JSON.stringify(jsonData, null, 2), 'learning-report.json', 'application/json');
    showNotification('✅ Report downloaded as JSON!', 'success');
}

function generateEmailReport() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
    const emailBody = `
Subject: Learning Report - ${currentUser.username}

Dear ${currentUser.username},

Your Blue Team SOC Academy Learning Report has been generated!

PROGRESS SUMMARY
================
Overall Progress: ${calculateReportProgress(progress)}%
Learning Time: ${Math.ceil(progress.lessonsCompleted * 45 + progress.labsCompleted * 50)} minutes

ACHIEVEMENTS
============
✓ Lessons Completed: ${progress.lessonsCompleted}/${lessonsData.length}
✓ Labs Completed: ${progress.labsCompleted}/${labsData.length}
✓ Commands Learned: ${progress.commandsLearned}/${commandsReference.length}
✓ Quiz Score: ${progress.quizScore}%

RECOMMENDATIONS
===============
${progress.lessonsCompleted < lessonsData.length ? `- Complete ${lessonsData.length - progress.lessonsCompleted} more lessons\n` : ''}${progress.quizScore < 80 ? `- Improve quiz score by ${80 - progress.quizScore} points\n` : ''}${progress.labsCompleted < labsData.length ? `- Practice ${labsData.length - progress.labsCompleted} more labs\n` : ''}
Keep up the great work!

Generated: ${new Date().toLocaleDateString()}
    `;
    
    const mailtoLink = `mailto:?subject=Learning Report - ${currentUser.username}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    showNotification('📧 Opening default email client...', 'info');
}

function downloadReport(data, filename, type) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Initialize reports on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('reportsContainer')) {
        initializeReports();
    }
});
