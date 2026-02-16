// Learning Roadmap Component

class LearningRoadmap {
    constructor() {
        this.lessons = lessonsData || [];
        this.progress = JSON.parse(localStorage.getItem('progress')) || {};
    }

    // Render interactive roadmap
    render() {
        const container = document.getElementById('roadmap-container');
        if (!container) return;

        const roadmapHTML = `
            <div class="roadmap">
                <div class="roadmap-header">
                    <h3>Learning Path Progress</h3>
                    <span class="roadmap-percentages">${this.calculateOverallProgress()}% Complete</span>
                </div>

                <div class="roadmap-stages">
                    ${this.renderStages()}
                </div>

                <div class="roadmap-timeline">
                    ${this.renderTimeline()}
                </div>

                <div class="roadmap-achievements">
                    ${this.renderAchievements()}
                </div>
            </div>
        `;

        container.innerHTML = roadmapHTML;
    }

    // Render stages
    renderStages() {
        const stages = [
            {
                title: 'Beginner',
                icon: '🌱',
                description: 'Learn the fundamentals',
                lessons: this.lessons.filter(l => l.difficulty === 'Beginner')
            },
            {
                title: 'Intermediate',
                icon: '🎯',
                description: 'Build practical skills',
                lessons: this.lessons.filter(l => l.difficulty === 'Intermediate')
            },
            {
                title: 'Advanced',
                icon: '🏔️',
                description: 'Master advanced techniques',
                lessons: this.lessons.filter(l => l.difficulty === 'Advanced')
            }
        ];

        return stages.map((stage, index) => {
            const completed = stage.lessons.filter(l => this.progress.lessonsCompleted >= this.lessons.indexOf(l) + 1).length;
            const progress = (completed / stage.lessons.length * 100) || 0;

            return `
                <div class="roadmap-stage">
                    <div class="stage-header">
                        <span class="stage-icon">${stage.icon}</span>
                        <div class="stage-info">
                            <h4>${stage.title}</h4>
                            <p>${stage.description}</p>
                        </div>
                        <span class="stage-progress">${completed}/${stage.lessons.length}</span>
                    </div>
                    
                    <div class="stage-progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>

                    <div class="stage-lessons">
                        ${stage.lessons.map((lesson, i) => {
                            const isCompleted = this.progress.lessonsCompleted >= this.lessons.indexOf(lesson) + 1;
                            return `
                                <div class="lesson-item ${isCompleted ? 'completed' : ''}">
                                    <div class="lesson-status">${isCompleted ? '✓' : '◯'}</div>
                                    <div class="lesson-content">
                                        <p class="lesson-title">${lesson.title}</p>
                                        <p class="lesson-duration">⏱ ${lesson.duration}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render timeline
    renderTimeline() {
        return `
            <div class="roadmap-timeline-section">
                <h3>Your Progress Timeline</h3>
                <div class="timeline">
                    <div class="timeline-item completed">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Started Journey</h4>
                            <p>Account created</p>
                        </div>
                    </div>

                    ${this.progress.lessonsCompleted > 0 ? `
                        <div class="timeline-item completed">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h4>Lessons Completed</h4>
                                <p>${this.progress.lessonsCompleted} lessons finished</p>
                            </div>
                        </div>
                    ` : `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h4>Complete First Lesson</h4>
                                <p>Start your journey</p>
                            </div>
                        </div>
                    `}

                    ${this.progress.labsCompleted > 0 ? `
                        <div class="timeline-item completed">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h4>Hands-On Labs</h4>
                                <p>${this.progress.labsCompleted} labs practiced</p>
                            </div>
                        </div>
                    ` : `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h4>Complete a Lab</h4>
                                <p>Practice real scenarios</p>
                            </div>
                        </div>
                    `}

                    ${this.progress.quizScore >= 60 ? `
                        <div class="timeline-item completed">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h4>Quiz Mastery</h4>
                                <p>Score: ${this.progress.quizScore}%</p>
                            </div>
                        </div>
                    ` : `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h4>Take Quiz</h4>
                                <p>Test your knowledge</p>
                            </div>
                        </div>
                    `}

                    <div class="timeline-item ${this.isAllComplete() ? 'completed' : ''}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>${this.isAllComplete() ? 'Master Complete!' : 'Become a Master'}</h4>
                            <p>${this.isAllComplete() ? 'All courses completed' : 'Complete all content'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Render achievements
    renderAchievements() {
        const achievements = [
            { id: 'first-lesson', icon: '📚', title: 'First Steps', condition: this.progress.lessonsCompleted >= 1 },
            { id: 'lesson-streak', icon: '🔥', title: '5 Lesson Streak', condition: this.progress.lessonsCompleted >= 5 },
            { id: 'lab-master', icon: '🔧', title: 'Lab Master', condition: this.progress.labsCompleted >= 2 },
            { id: 'knowledge-test', icon: '🧠', title: 'Knowledge Test', condition: this.progress.quizScore >= 70 },
            { id: 'speed-demon', icon: '⚡', title: 'Quick Learner', condition: this.progress.lessonsCompleted >= 3 },
            { id: 'all-commands', icon: '📖', title: 'Command Expert', condition: this.progress.commandsLearned >= 15 },
        ];

        return `
            <div class="roadmap-achievements-section">
                <h3>🏆 Achievements Earned</h3>
                <div class="achievements-grid">
                    ${achievements.map(achievement => `
                        <div class="achievement-badge ${achievement.condition ? 'unlocked' : 'locked'}">
                            <span class="achievement-icon">${achievement.icon}</span>
                            <p class="achievement-title">${achievement.title}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Calculate overall progress
    calculateOverallProgress() {
        const total = (this.lessons.length + 4 + 20 + 100); // lessons + labs + commands + quiz
        const completed = (this.progress.lessonsCompleted * 10) + (this.progress.labsCompleted * 25) + 
                         this.progress.commandsLearned + Math.min(this.progress.quizScore, 100);
        return Math.min(Math.round((completed / total) * 100), 100);
    }

    // Check if all content is complete
    isAllComplete() {
        return this.progress.lessonsCompleted === this.lessons.length && 
               this.progress.quizScore >= 60;
    }
}

// Initialize roadmap
let learningRoadmap;
