// Analytics Dashboard Functions

function initializeAnalytics() {
    renderAnalytics();
}

function renderAnalytics() {
    const container = document.getElementById('analyticsContainer');
    const progress = JSON.parse(localStorage.getItem('progress')) || {
        lessonsCompleted: 0,
        labsCompleted: 0,
        commandsLearned: 0,
        quizScore: 0
    };

    const totalLessons = lessonsData.length;
    const totalLabs = labsData.length;
    const totalCommands = commandsReference.length;
    const passedQuiz = progress.quizScore >= 60 ? true : false;

    const lessonsPercent = (progress.lessonsCompleted / totalLessons * 100).toFixed(1);
    const labsPercent = (progress.labsCompleted / totalLabs * 100).toFixed(1);
    const commandsPercent = (progress.commandsLearned / totalCommands * 100).toFixed(1);

    const streakDays = calculateStreak();
    const estimatedCompletion = calculateETA(progress);

    container.innerHTML = `
        <div class="analytics-grid">
            <!-- Progress Overview -->
            <div class="analytics-card large">
                <h3>📊 Course Progress</h3>
                <div class="progress-items">
                    <div class="progress-item">
                        <span class="label">Lessons</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${lessonsPercent}%"></div>
                        </div>
                        <span class="percent">${lessonsPercent}% (${progress.lessonsCompleted}/${totalLessons})</span>
                    </div>
                    <div class="progress-item">
                        <span class="label">Labs Completed</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${labsPercent}%"></div>
                        </div>
                        <span class="percent">${labsPercent}% (${progress.labsCompleted}/${totalLabs})</span>
                    </div>
                    <div class="progress-item">
                        <span class="label">Commands Mastered</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${commandsPercent}%"></div>
                        </div>
                        <span class="percent">${commandsPercent}% (${progress.commandsLearned}/${totalCommands})</span>
                    </div>
                    <div class="progress-item">
                        <span class="label">Quiz Proficiency</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress.quizScore}%"></div>
                        </div>
                        <span class="percent">${progress.quizScore}% (${passedQuiz ? '✅ PASSED' : '⏳ In Progress'})</span>
                    </div>
                </div>
            </div>

            <!-- Achievements & Stats -->
            <div class="analytics-card">
                <h3>🎯 Achievements</h3>
                <div class="achievements-list">
                    <div class="achievement ${progress.lessonsCompleted >= 3 ? 'unlocked' : 'locked'}">
                        <span class="icon">📚</span>
                        <span>First Steps</span>
                        <small>${progress.lessonsCompleted >= 3 ? 'Unlocked' : 'Complete 3 lessons'}</small>
                    </div>
                    <div class="achievement ${progress.labsCompleted >= 2 ? 'unlocked' : 'locked'}">
                        <span class="icon">🔧</span>
                        <span>Hands On</span>
                        <small>${progress.labsCompleted >= 2 ? 'Unlocked' : 'Complete 2 labs'}</small>
                    </div>
                    <div class="achievement ${progress.quizScore >= 80 ? 'unlocked' : 'locked'}">
                        <span class="icon">🏆</span>
                        <span>Expert</span>
                        <small>${progress.quizScore >= 80 ? 'Unlocked' : 'Score 80%+ on quiz'}</small>
                    </div>
                    <div class="achievement ${totalLessons === progress.lessonsCompleted && totalLabs === progress.labsCompleted ? 'unlocked' : 'locked'}">
                        <span class="icon">👑</span>
                        <span>Master</span>
                        <small>${totalLessons === progress.lessonsCompleted && totalLabs === progress.labsCompleted ? 'Unlocked' : 'Complete all content'}</small>
                    </div>
                </div>
            </div>

            <!-- Learning Stats -->
            <div class="analytics-card">
                <h3>📈 Learning Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="stat-number">${streakDays}</div>
                        <div class="stat-label">Day Streak</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${Math.ceil(progress.lessonsCompleted * 45 + progress.labsCompleted * 50)}</div>
                        <div class="stat-label">Minutes Learned</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${totalLessons - progress.lessonsCompleted}</div>
                        <div class="stat-label">Lessons Left</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${estimatedCompletion}</div>
                        <div class="stat-label">Est. Days to Complete</div>
                    </div>
                </div>
            </div>

            <!-- Level Indicator -->
            <div class="analytics-card">
                <h3>🎓 Proficiency Level</h3>
                <div class="level-indicator">
                    <div class="level-bar ${getLevelClass(progress)}">
                        <div class="level-progress" style="width: ${calculateOverallProgress(progress)}%"></div>
                    </div>
                    <div class="level-text">
                        <h4>${getLevelName(progress)}</h4>
                        <p>${getLevelDescription(progress)}</p>
                    </div>
                </div>
            </div>

            <!-- Time Overview -->
            <div class="analytics-card large">
                <h3>⏰ Time Analysis</h3>
                <div class="time-chart">
                    <div class="time-row">
                        <span class="label">Time on Lessons:</span>
                        <div class="bar-small" style="width: ${(progress.lessonsCompleted * 45 / 500 * 100).toFixed(0)}%"></div>
                        <span class="value">${progress.lessonsCompleted * 45} min</span>
                    </div>
                    <div class="time-row">
                        <span class="label">Time on Labs:</span>
                        <div class="bar-small" style="width: ${(progress.labsCompleted * 50 / 500 * 100).toFixed(0)}%"></div>
                        <span class="value">${progress.labsCompleted * 50} min</span>
                    </div>
                    <div class="time-row">
                        <span class="label">Time on Quizzes:</span>
                        <div class="bar-small" style="width: ${(15 / 500 * 100).toFixed(0)}%"></div>
                        <span class="value">~15 min</span>
                    </div>
                </div>
            </div>

            <!-- Recommendations -->
            <div class="analytics-card large">
                <h3>💡 Recommendations</h3>
                <div class="recommendations-list">
                    ${getRecommendations(progress)}
                </div>
            </div>
        </div>
    `;
}

function calculateStreak() {
    const lastAccess = localStorage.getItem('lastAccess');
    if (!lastAccess) {
        localStorage.setItem('lastAccess', new Date().toDateString());
        return 1;
    }
    
    const lastDate = new Date(lastAccess);
    const today = new Date();
    const diffTime = today - lastDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
        localStorage.setItem('streak', (parseInt(localStorage.getItem('streak')) || 1) + 1);
        localStorage.setItem('lastAccess', today.toDateString());
        return parseInt(localStorage.getItem('streak')) || 1;
    }
    return 1;
}

function calculateETA(progress) {
    const totalContent = lessonsData.length + labsData.length;
    const completed = progress.lessonsCompleted + progress.labsCompleted;
    const remaining = totalContent - completed;
    
    if (remaining <= 0) return 0;
    
    const avgPerDay = 1;
    return Math.ceil(remaining / avgPerDay);
}

function calculateOverallProgress(progress) {
    const total = lessonsData.length + labsData.length + quizData.length * 0.5;
    const completed = progress.lessonsCompleted + progress.labsCompleted + (progress.quizScore > 0 ? 5 : 0);
    return (completed / total * 100).toFixed(1);
}

function getLevelClass(progress) {
    const overall = calculateOverallProgress(progress);
    if (overall >= 90) return 'level-master';
    if (overall >= 70) return 'level-advanced';
    if (overall >= 50) return 'level-intermediate';
    if (overall >= 25) return 'level-beginner';
    return 'level-novice';
}

function getLevelName(progress) {
    const overall = calculateOverallProgress(progress);
    if (overall >= 90) return '👑 Master Analyst';
    if (overall >= 70) return '🥇 Advanced Analyst';
    if (overall >= 50) return '🥈 Intermediate Analyst';
    if (overall >= 25) return '🥉 Beginner Analyst';
    return '🌱 Novice';
}

function getLevelDescription(progress) {
    const overall = calculateOverallProgress(progress);
    if (overall >= 90) return 'You have mastered PowerShell & CMD! Ready for professional SOC operations.';
    if (overall >= 70) return 'Great progress! You\'re building professional-level skills.';
    if (overall >= 50) return 'Good foundation established. Continue with advanced modules.';
    if (overall >= 25) return 'You\'re off to a great start. Keep learning!';
    return 'Start your journey! Complete your first lessons.';
}

function getRecommendations(progress) {
    let recommendations = '';
    
    if (progress.lessonsCompleted < lessonsData.length) {
        recommendations += `<div class="rec-item"><span class="icon">📚</span><span>Complete remaining lessons for comprehensive knowledge</span></div>`;
    }
    if (progress.labsCompleted < labsData.length) {
        recommendations += `<div class="rec-item"><span class="icon">🔧</span><span>Practice hands-on labs to solidify your skills</span></div>`;
    }
    if (progress.quizScore < 80) {
        recommendations += `<div class="rec-item"><span class="icon">📝</span><span>Retake the quiz to boost your proficiency score</span></div>`;
    }
    if (progress.commandsLearned < 10) {
        recommendations += `<div class="rec-item"><span class="icon">📖</span><span>Master more commands in the reference section</span></div>`;
    }
    if (progress.lessonsCompleted >= lessonsData.length && progress.labsCompleted >= labsData.length && progress.quizScore >= 80) {
        recommendations += `<div class="rec-item"><span class="icon">🎉</span><span>Congratulations! you're ready for advanced certification</span></div>`;
    }
    
    return recommendations;
}

// Initialize analytics on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('analyticsContainer')) {
        initializeAnalytics();
    }
});