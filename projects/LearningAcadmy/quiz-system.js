// Enhanced Quiz System with Advanced Features

class EnhancedQuizSystem {
    constructor(quizData) {
        this.quizData = quizData;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.startTime = null;
        this.endTime = null;
        this.quizScore = 0;
    }

    // Start quiz
    start() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.startTime = new Date();
        this.renderQuestion();
    }

    // Render current question
    renderQuestion() {
        const quizContainer = document.getElementById('enhanced-quiz-container');
        if (!quizContainer) return;

        const question = this.quizData[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / this.quizData.length) * 100;

        quizContainer.innerHTML = `
            <div class="quiz-wrapper">
                <!-- Progress Bar -->
                <div class="quiz-progress-section">
                    <div class="progress-info">
                        <span class="question-counter">Question ${this.currentQuestionIndex + 1} of ${this.quizData.length}</span>
                        <span class="progress-percent">${Math.round(progress)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>

                <!-- Question -->
                <div class="quiz-question-section">
                    <h3 class="question-text">${question.q}</h3>
                    <p class="question-hint">Select the correct answer</p>
                </div>

                <!-- Options -->
                <div class="quiz-options-section">
                    ${question.options.map((option, index) => `
                        <label class="quiz-option ${this.answers[this.currentQuestionIndex] === index ? 'selected' : ''}">
                            <input type="radio" name="answer" value="${index}" 
                                   ${this.answers[this.currentQuestionIndex] === index ? 'checked' : ''}
                                   onchange="enhancedQuiz.selectAnswer(${index})">
                            <span class="option-text">${option}</span>
                            <span class="option-indicator"></span>
                        </label>
                    `).join('')}
                </div>

                <!-- Navigation -->
                <div class="quiz-navigation">
                    <button class="nav-btn prev-btn" onclick="enhancedQuiz.previousQuestion()" 
                            ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    
                    <div class="quiz-dots">
                        ${Array.from({ length: this.quizData.length }).map((_, i) => `
                            <span class="dot ${i === this.currentQuestionIndex ? 'active' : ''} 
                                  ${this.answers[i] !== undefined ? 'answered' : ''}"
                                  onclick="enhancedQuiz.goToQuestion(${i})"></span>
                        `).join('')}
                    </div>

                    <button class="nav-btn next-btn" onclick="enhancedQuiz.nextQuestion()">
                        ${this.currentQuestionIndex === this.quizData.length - 1 ? 'Submit Quiz' : 'Next'} →
                    </button>
                </div>

                <!-- Quiz Stats -->
                <div class="quiz-stats">
                    <div class="stat">
                        <span class="stat-label">Answered</span>
                        <span class="stat-value">${Object.keys(this.answers).length}/${this.quizData.length}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Time Elapsed</span>
                        <span class="stat-value" id="time-elapsed">0s</span>
                    </div>
                </div>
            </div>
        `;

        // Start timer
        this.updateTimer();
        setInterval(() => this.updateTimer(), 1000);
    }

    // Update timer display
    updateTimer() {
        const elapsed = Math.floor((new Date() - this.startTime) / 1000);
        const display = elapsed < 60 ? elapsed + 's' : Math.floor(elapsed / 60) + 'm';
        const timeElement = document.getElementById('time-elapsed');
        if (timeElement) timeElement.textContent = display;
    }

    // Select answer
    selectAnswer(index) {
        this.answers[this.currentQuestionIndex] = index;
    }

    // Next question
    nextQuestion() {
        if (this.answers[this.currentQuestionIndex] === undefined) {
            this.showMessage('⚠️ Please select an answer', 'warning');
            return;
        }

        if (this.currentQuestionIndex === this.quizData.length - 1) {
            this.submitQuiz();
        } else {
            this.currentQuestionIndex++;
            this.renderQuestion();
        }
    }

    // Previous question
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    }

    // Go to specific question
    goToQuestion(index) {
        this.currentQuestionIndex = index;
        this.renderQuestion();
    }

    // Submit quiz
    submitQuiz() {
        this.endTime = new Date();
        let correct = 0;

        this.quizData.forEach((question, index) => {
            if (this.answers[index] === question.answer) {
                correct++;
            }
        });

        this.quizScore = (correct / this.quizData.length * 100).toFixed(1);
        this.showResults();
    }

    // Show results with detailed feedback
    showResults() {
        const quizContainer = document.getElementById('enhanced-quiz-container');
        const timeTaken = Math.floor((this.endTime - this.startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        const correct = Object.keys(this.answers).filter(i => 
            this.answers[i] === this.quizData[i].answer
        ).length;

        let performanceLevel = 'Excellent';
        let performanceColor = '#10b981';
        if (this.quizScore < 50) {
            performanceLevel = 'Needs Improvement';
            performanceColor = '#ef4444';
        } else if (this.quizScore < 70) {
            performanceLevel = 'Good';
            performanceColor = '#f59e0b';
        } else if (this.quizScore < 85) {
            performanceLevel = 'Very Good';
            performanceColor = '#10b981';
        }

        quizContainer.innerHTML = `
            <div class="quiz-results">
                <!-- Score Display -->
                <div class="results-header">
                    <h2>Quiz Complete! 🎉</h2>
                    <p>Great job completing the assessment</p>
                </div>

                <!-- Main Score -->
                <div class="score-display">
                    <div class="score-circle" style="border-color: ${performanceColor}">
                        <span class="score-number">${Math.round(this.quizScore)}</span>
                        <span class="score-percent">%</span>
                    </div>
                    <div class="score-info">
                        <h3 class="performance-level" style="color: ${performanceColor}">${performanceLevel}</h3>
                        <p class="performance-desc">${this.getPerformanceMessage(this.quizScore)}</p>
                    </div>
                </div>

                <!-- Statistics -->
                <div class="results-stats">
                    <div class="stat-item">
                        <span class="stat-icon">✓</span>
                        <span class="stat-text">Correct</span>
                        <span class="stat-value">${correct}/${this.quizData.length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">⏱</span>
                        <span class="stat-text">Time Taken</span>
                        <span class="stat-value">${minutes}m ${seconds}s</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">📊</span>
                        <span class="stat-text">Accuracy</span>
                        <span class="stat-value">${(correct / this.quizData.length * 100).toFixed(0)}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">⚡</span>
                        <span class="stat-text">Avg Time/Q</span>
                        <span class="stat-value">${Math.round(timeTaken / this.quizData.length)}s</span>
                    </div>
                </div>

                <!-- Detailed Answers -->
                <div class="results-answers">
                    <h3>Answer Review</h3>
                    ${this.quizData.map((question, index) => {
                        const isCorrect = this.answers[index] === question.answer;
                        return `
                            <div class="answer-review ${isCorrect ? 'correct' : 'incorrect'}">
                                <div class="answer-header">
                                    <span class="answer-status">${isCorrect ? '✓' : '✗'}</span>
                                    <span class="answer-question">Q${index + 1}: ${question.q}</span>
                                </div>
                                <div class="answer-details">
                                    <p><strong>Your Answer:</strong> ${question.options[this.answers[index]]}</p>
                                    ${!isCorrect ? `<p><strong>Correct Answer:</strong> ${question.options[question.answer]}</p>` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Action Buttons -->
                <div class="results-actions">
                    <button class="action-btn outline" onclick="enhancedQuiz.retakeQuiz()">
                        🔄 Retake Quiz
                    </button>
                    <button class="action-btn primary" onclick="window.location.href='dashboard.html'">
                        📊 Back to Dashboard
                    </button>
                </div>

                <!-- Recommendations -->
                <div class="results-recommendations">
                    <h3>📚 Recommendations</h3>
                    ${this.getRecommendations(this.quizScore)}
                </div>
            </div>
        `;

        // Save score to user account
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        if (currentUser.id && typeof authSystem !== 'undefined') {
            const result = authSystem.updateQuizScore(currentUser.id, Math.round(this.quizScore));
            if (result.success) {
                localStorage.setItem('currentUser', JSON.stringify(result.user));
            }
        }

        // Also save to progress for backwards compatibility
        const progress = JSON.parse(localStorage.getItem('progress')) || {};
        progress.quizScore = Math.max(progress.quizScore || 0, Math.round(this.quizScore));
        localStorage.setItem('progress', JSON.stringify(progress));
    }

    // Get performance message
    getPerformanceMessage(score) {
        if (score >= 90) return "Outstanding! You've mastered this content.";
        if (score >= 75) return "Excellent work! You understand the material well.";
        if (score >= 60) return "Good performance. Keep practicing to improve.";
        return "Keep studying! Review the material and try again.";
    }

    // Get recommendations
    getRecommendations(score) {
        let recommendations = [];
        
        if (score < 60) {
            recommendations.push('⇒ Review the lesson materials before retaking the quiz');
            recommendations.push('⇒ Focus on questions you got wrong');
            recommendations.push('⇒ Try the hands-on labs to reinforce learning');
        } else if (score < 80) {
            recommendations.push('⇒ Review challenging areas to boost your score');
            recommendations.push('⇒ Practice with the command reference');
            recommendations.push('⇒ Explore related lessons for deeper understanding');
        } else {
            recommendations.push('⇒ Great foundation! Move on to advanced modules');
            recommendations.push('⇒ Challenge yourself with hands-on labs');
            recommendations.push('⇒ Explore threat hunting and forensics courses');
        }

        return recommendations.map(rec => `<p>${rec}</p>`).join('');
    }

    // Show message
    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `quiz-message ${type}`;
        messageEl.textContent = message;
        document.body.appendChild(messageEl);
        
        setTimeout(() => messageEl.remove(), 3000);
    }

    // Retake quiz
    retakeQuiz() {
        this.start();
    }
}

// Initialize enhanced quiz system
let enhancedQuiz;
