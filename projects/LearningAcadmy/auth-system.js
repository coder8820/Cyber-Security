// Advanced Authentication System for Blue Team Academy

class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.initializeDefaultUsers();
    }

    // Initialize default test users
    initializeDefaultUsers() {
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                email: 'admin@blueteam.com',
                password: this.hashPassword('admin123'),
                role: 'Instructor',
                createdAt: new Date(),
                profilePicture: '👨‍💼',
                lessonsCompleted: 10,
                labsCompleted: 5,
                quizScore: 95,
                commandsLearned: 75,
                completedLessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                completedLabs: [1, 2, 3, 4, 5]
            },
            {
                id: 2,
                username: 'analyst',
                email: 'analyst@blueteam.com',
                password: this.hashPassword('analyst123'),
                role: 'SOC Analyst',
                createdAt: new Date(),
                profilePicture: '👨‍💻',
                lessonsCompleted: 8,
                labsCompleted: 4,
                quizScore: 88,
                commandsLearned: 60,
                completedLessons: [1, 2, 3, 4, 5, 6, 7, 8],
                completedLabs: [1, 2, 3, 4]
            },
            {
                id: 3,
                username: 'student',
                email: 'student@blueteam.com',
                password: this.hashPassword('student123'),
                role: 'Student',
                createdAt: new Date(),
                profilePicture: '👨‍🎓',
                lessonsCompleted: 3,
                labsCompleted: 1,
                quizScore: 65,
                commandsLearned: 25,
                completedLessons: [1, 2, 3],
                completedLabs: [1]
            }
        ];

        // Only initialize if no users exist
        if (this.users.length === 0) {
            this.users = defaultUsers;
            this.saveUsers();
        }
    }

    // Simple hash function for password (for demo purposes)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }

    // Validate email format
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Validate password strength
    validatePassword(password) {
        if (password.length < 6) {
            return { valid: false, message: 'Password must be at least 6 characters' };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Password must contain lowercase letters' };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Password must contain uppercase letters' };
        }
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Password must contain numbers' };
        }
        return { valid: true, message: 'Password is strong' };
    }

    // Register new user
    register(username, email, password, confirmPassword, role) {
        // Validate input
        if (!username || !email || !password || !confirmPassword) {
            return { success: false, message: 'All fields are required' };
        }

        if (password !== confirmPassword) {
            return { success: false, message: 'Passwords do not match' };
        }

        // Validate email format
        if (!this.isValidEmail(email)) {
            return { success: false, message: 'Invalid email format' };
        }

        // Validate password strength
        const passwordValidation = this.validatePassword(password);
        if (!passwordValidation.valid) {
            return { success: false, message: passwordValidation.message };
        }

        // Check if user already exists
        if (this.users.find(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        if (this.users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: this.users.length + 1,
            username: username,
            email: email,
            password: this.hashPassword(password),
            role: role || 'Student',
            createdAt: new Date(),
            profilePicture: this.getProfilePicture(role),
            settings: {
                theme: 'dark',
                notifications: true,
                emailUpdates: true
            },
            lessonsCompleted: 0,
            labsCompleted: 0,
            quizScore: 0,
            commandsLearned: 0,
            completedLessons: [],
            completedLabs: []
        };

        this.users.push(newUser);
        this.saveUsers();

        return { success: true, message: 'Registration successful!', user: newUser };
    }

    // Login user
    login(username, password) {
        if (!username || !password) {
            return { success: false, message: 'Username and password required' };
        }

        const user = this.users.find(u => u.username === username);
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Invalid password' };
        }

        // Create session
        const session = {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            loginTime: new Date(),
            settings: user.settings || { theme: 'dark', notifications: true }
        };

        localStorage.setItem('currentUser', JSON.stringify(session));
        localStorage.setItem('authToken', this.generateToken(user));

        return { success: true, message: 'Login successful!', user: session };
    }

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        return { success: true, message: 'Logged out successfully' };
    }

    // Get current user
    getCurrentUser() {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return localStorage.getItem('authToken') !== null && this.getCurrentUser() !== null;
    }

    // Generate auth token
    generateToken(user) {
        return btoa(user.id + ':' + user.username + ':' + Date.now());
    }

    // Get profile picture emoji based on role
    getProfilePicture(role) {
        const pictures = {
            'Instructor': '👨‍💼',
            'SOC Analyst': '👨‍💻',
            'Student': '👨‍🎓'
        };
        return pictures[role] || '👤';
    }

    // Update user settings
    updateUserSettings(settings) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Not authenticated' };

        const userIndex = this.users.findIndex(u => u.id === user.userId);
        if (userIndex === -1) return { success: false, message: 'User not found' };

        this.users[userIndex].settings = { ...this.users[userIndex].settings, ...settings };
        this.saveUsers();

        user.settings = this.users[userIndex].settings;
        localStorage.setItem('currentUser', JSON.stringify(user));

        return { success: true, message: 'Settings updated' };
    }

    // Get all users (admin only)
    getAllUsers(currentUserId) {
        const user = this.users.find(u => u.id === currentUserId);
        if (!user || user.role !== 'Instructor') {
            return null;
        }
        return this.users.map(u => ({
            id: u.id,
            username: u.username,
            email: u.email,
            role: u.role,
            createdAt: u.createdAt
        }));
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('authUsers', JSON.stringify(this.users));
    }

    // Load users from localStorage
    loadUsers() {
        const data = localStorage.getItem('authUsers');
        return data ? JSON.parse(data) : [];
    }

    // Change password
    changePassword(userId, oldPassword, newPassword, confirmPassword) {
        if (newPassword !== confirmPassword) {
            return { success: false, message: 'New passwords do not match' };
        }

        const passwordValidation = this.validatePassword(newPassword);
        if (!passwordValidation.valid) {
            return { success: false, message: passwordValidation.message };
        }

        const user = this.users.find(u => u.id === userId);
        if (!user) return { success: false, message: 'User not found' };

        if (user.password !== this.hashPassword(oldPassword)) {
            return { success: false, message: 'Current password is incorrect' };
        }

        user.password = this.hashPassword(newPassword);
        this.saveUsers();

        return { success: true, message: 'Password changed successfully' };
    }

    // Track lesson completion
    completLesson(userId, lessonId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return { success: false, message: 'User not found' };

        if (!user.completedLessons) user.completedLessons = [];
        if (!user.completedLessons.includes(lessonId)) {
            user.completedLessons.push(lessonId);
            user.lessonsCompleted = user.completedLessons.length;
        }

        this.saveUsers();
        return { success: true, user: user };
    }

    // Track lab completion
    completeLab(userId, labId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return { success: false, message: 'User not found' };

        if (!user.completedLabs) user.completedLabs = [];
        if (!user.completedLabs.includes(labId)) {
            user.completedLabs.push(labId);
            user.labsCompleted = user.completedLabs.length;
        }

        this.saveUsers();
        return { success: true, user: user };
    }

    // Update quiz score
    updateQuizScore(userId, score) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return { success: false, message: 'User not found' };

        if (score > (user.quizScore || 0)) {
            user.quizScore = score;
        }

        this.saveUsers();
        return { success: true, user: user };
    }

    // Track commands learned
    trackCommand(userId, commandCount) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return { success: false, message: 'User not found' };

        user.commandsLearned = commandCount || 0;

        this.saveUsers();
        return { success: true, user: user };
    }

    // Get user achievements
    getUserAchievements(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return [];

        const achievements = [];
        if ((user.lessonsCompleted || 0) >= 1) achievements.push('First Steps');
        if ((user.lessonsCompleted || 0) >= 5) achievements.push('Lesson Streak');
        if ((user.labsCompleted || 0) >= 3) achievements.push('Lab Master');
        if ((user.quizScore || 0) >= 80) achievements.push('Knowledge Test');
        if (user.quickLearner) achievements.push('Quick Learner');
        if ((user.commandsLearned || 0) >= 50) achievements.push('Command Expert');

        return achievements;
    }
}

// Initialize auth system
const authSystem = new AuthSystem();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}
