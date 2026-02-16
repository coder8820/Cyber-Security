// Quiz functionality for SOC Blue Team Academy

let currentQuizAnswers = {};

// Initialize Quiz
function initializeQuiz() {
    const quizArea = document.getElementById('quizArea');
    if (!quizArea) return;

    quizArea.innerHTML = quizData.map((item, index) => `
        <div class="quiz-question">
            <div class="question-text">Q${index + 1}: ${item.q}</div>
            <div class="question-options">
                ${item.options.map((option, optIndex) => `
                    <label class="option-label">
                        <input type="radio" name="question_${index}" value="${option}" 
                               onchange="currentQuizAnswers[${index}] = '${option}'">
                        ${option}
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Submit Quiz
function submitQuiz() {
    const quizArea = document.getElementById('quizArea');
    const resultDiv = document.getElementById('result');

    if (!quizArea || !resultDiv) return;

    // Check if all questions answered
    if (Object.keys(currentQuizAnswers).length !== quizData.length) {
        showNotification('Please answer all questions before submitting', 'error');
        return;
    }

    let score = 0;
    let correctAnswers = 0;
    let totalQuestions = quizData.length;

    quizData.forEach((item, index) => {
        if (currentQuizAnswers[index] === item.a) {
            correctAnswers++;
        }
    });

    score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save progress
    let progress = JSON.parse(localStorage.getItem('progress') || '{}');
    progress.quizScore = score + '%';
    progress.quizAttempts = (progress.quizAttempts || 0) + 1;
    localStorage.setItem('progress', JSON.stringify(progress));
    updateStats();

    // Display results
    let resultHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #3b82f6; font-size: 24px; margin: 0;">Quiz Results</h3>
            <div style="margin: 20px 0;">
                <div style="font-size: 48px; font-weight: bold; color: ${score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'};">
                    ${score}%
                </div>
                <p style="font-size: 18px; color: #cbd5e1; margin: 10px 0;">
                    You answered <strong style="color: #3b82f6;">${correctAnswers}</strong> out of <strong style="color: #3b82f6;">${totalQuestions}</strong> questions correctly
                </p>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background: ${score >= 70 ? 'rgba(16, 185, 129, 0.1)' : score >= 50 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; 
                        border-left: 3px solid ${score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}; 
                        border-radius: 6px;">
                <p style="margin: 0; color: ${score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}; font-weight: 600;">
                    ${score >= 80 ? '🎉 Excellent Work! You are ready for advanced SOC tasks!' : 
                      score >= 70 ? '✓ Great Job! Keep practicing to master these commands!' : 
                      score >= 50 ? '⚠️ Good effort! Review the lessons and try again!' : 
                      '📚 Keep learning! Review the material and retake the quiz.'}
                </p>
            </div>

            <div style="margin: 20px 0;">
                <h4 style="color: #cbd5e1; text-align: left;">Details by Question:</h4>
                <div style="max-height: 300px; overflow-y: auto; background: #0f172a; padding: 15px; border-radius: 6px; margin-top: 10px;">
    `;

    quizData.forEach((item, index) => {
        const userAnswer = currentQuizAnswers[index];
        const isCorrect = userAnswer === item.a;
        resultHTML += `
            <div style="margin-bottom: 15px; padding: 10px; background: #1e293b; border-radius: 4px; border-left: 3px solid ${isCorrect ? '#10b981' : '#ef4444'};">
                <p style="margin: 0 0 8px 0; color: #3b82f6; font-weight: 600;">Q${index + 1}: ${item.q}</p>
                <p style="margin: 0; color: #cbd5e1; font-size: 13px;">
                    Your answer: <strong style="color: ${isCorrect ? '#10b981' : '#ef4444'};">${userAnswer}</strong>
                    ${!isCorrect ? `<br>Correct answer: <strong style="color: #10b981;">${item.a}</strong>` : ''}
                </p>
            </div>
        `;
    });

    resultHTML += `
                </div>
            </div>

            <button onclick="resetQuiz()" style="width: 100%; padding: 12px; background: #3b82f6; border: none; border-radius: 6px; color: white; font-weight: 600; cursor: pointer; margin-top: 15px;">
                Retake Quiz
            </button>
        </div>
    `;

    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';

    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Reset Quiz
function resetQuiz() {
    currentQuizAnswers = {};
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = '';
        resultDiv.style.display = 'none';
    }
    initializeQuiz();
    
    // Scroll to top
    document.getElementById('quizArea')?.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Quiz reset. Ready to try again!', 'info');
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

// Update stats helper
function updateStats() {
    const progress = JSON.parse(localStorage.getItem('progress') || '{}');
    
    if (document.getElementById('quizScore')) {
        document.getElementById('quizScore').textContent = progress.quizScore || '0%';
    }
}
