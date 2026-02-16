// Certificate Generation Functions

function initializeCertificates() {
    renderCertificates();
}

function renderCertificates() {
    const container = document.getElementById('certificatesContainer');
    const progress = JSON.parse(localStorage.getItem('progress')) || {
        lessonsCompleted: 0,
        labsCompleted: 0,
        commandsLearned: 0,
        quizScore: 0
    };
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const allComplete = progress.lessonsCompleted === lessonsData.length && 
                        progress.labsCompleted === labsData.length && 
                        progress.quizScore >= 60;

    container.innerHTML = `
        <div class="certificates-container-main">
            <div class="cert-section">
                <h3>🎓 Available Certificates</h3>
                <div class="certs-grid">
                    <!-- PowerShell Fundamentals Certificate -->
                    <div class="cert-card ${progress.lessonsCompleted >= 2 ? 'unlocked' : 'locked'}">
                        <div class="cert-icon">📜</div>
                        <h4>PowerShell Essentials Certificate</h4>
                        <p>Master PowerShell fundamentals and commands</p>
                        <div class="cert-requirement">
                            <span>${progress.lessonsCompleted >= 2 ? '✅' : '⏳'} Requires 2+ Lessons</span>
                        </div>
                        <button onclick="downloadCertificate('PowerShell Essentials')" 
                                class="cert-btn ${progress.lessonsCompleted >= 2 ? 'active' : 'disabled'}"
                                ${progress.lessonsCompleted < 2 ? 'disabled' : ''}>
                            ${progress.lessonsCompleted >= 2 ? 'Download Certificate' : 'In Progress'}
                        </button>
                    </div>

                    <!-- CMD Expert Certificate -->
                    <div class="cert-card ${progress.lessonsCompleted >= 3 ? 'unlocked' : 'locked'}">
                        <div class="cert-icon">⚙️</div>
                        <h4>CMD Command Expert Certificate</h4>
                        <p>Mastered Windows Command Prompt operations</p>
                        <div class="cert-requirement">
                            <span>${progress.lessonsCompleted >= 3 ? '✅' : '⏳'} Requires 3+ Lessons</span>
                        </div>
                        <button onclick="downloadCertificate('CMD Expert')" 
                                class="cert-btn ${progress.lessonsCompleted >= 3 ? 'active' : 'disabled'}"
                                ${progress.lessonsCompleted < 3 ? 'disabled' : ''}>
                            ${progress.lessonsCompleted >= 3 ? 'Download Certificate' : 'In Progress'}
                        </button>
                    </div>

                    <!-- Lab Practitioner Certificate -->
                    <div class="cert-card ${progress.labsCompleted >= 1 ? 'unlocked' : 'locked'}">
                        <div class="cert-icon">🔬</div>
                        <h4>Lab Practitioner Certificate</h4>
                        <p>Hands-on experience in SOC operations</p>
                        <div class="cert-requirement">
                            <span>${progress.labsCompleted >= 1 ? '✅' : '⏳'} Requires 1+ Labs</span>
                        </div>
                        <button onclick="downloadCertificate('Lab Practitioner')" 
                                class="cert-btn ${progress.labsCompleted >= 1 ? 'active' : 'disabled'}"
                                ${progress.labsCompleted < 1 ? 'disabled' : ''}>
                            ${progress.labsCompleted >= 1 ? 'Download Certificate' : 'In Progress'}
                        </button>
                    </div>

                    <!-- Quiz Master Certificate -->
                    <div class="cert-card ${progress.quizScore >= 80 ? 'unlocked' : 'locked'}">
                        <div class="cert-icon">🏆</div>
                        <h4>Quiz Master Certificate</h4>
                        <p>Demonstrated comprehensive knowledge mastery</p>
                        <div class="cert-requirement">
                            <span>${progress.quizScore >= 80 ? '✅' : '⏳'} Requires 80% Quiz Score</span>
                        </div>
                        <button onclick="downloadCertificate('Quiz Master')" 
                                class="cert-btn ${progress.quizScore >= 80 ? 'active' : 'disabled'}"
                                ${progress.quizScore < 80 ? 'disabled' : ''}>
                            ${progress.quizScore >= 80 ? 'Download Certificate' : 'In Progress'}
                        </button>
                    </div>

                    <!-- SOC Analyst Certification -->
                    <div class="cert-card ${allComplete ? 'unlocked' : 'locked'} premium">
                        <div class="cert-icon premium-icon">👑</div>
                        <h4>Professional SOC Analyst</h4>
                        <p>Complete mastery - Ready for professional SOC operations</p>
                        <div class="cert-requirement premium-req">
                            <span>${allComplete ? '✅' : '⏳'} All Courses + 60%+ Quiz</span>
                        </div>
                        <button onclick="downloadCertificate('Professional SOC Analyst')" 
                                class="cert-btn premium ${allComplete ? 'active' : 'disabled'}"
                                ${!allComplete ? 'disabled' : ''}>
                            ${allComplete ? 'Download Premium Certificate' : 'Complete All Courses'}
                        </button>
                    </div>

                    <!-- Advanced Blue Team Specialist -->
                    <div class="cert-card ${progress.quizScore >= 90 ? 'unlocked' : 'locked'} advanced">
                        <div class="cert-icon">🛡️</div>
                        <h4>Blue Team Specialist</h4>
                        <p>Expert-level blue team and defensive operations</p>
                        <div class="cert-requirement">
                            <span>${progress.quizScore >= 90 ? '✅' : '⏳'} Requires 90%+ Quiz Score</span>
                        </div>
                        <button onclick="downloadCertificate('Blue Team Specialist')" 
                                class="cert-btn ${progress.quizScore >= 90 ? 'active' : 'disabled'}"
                                ${progress.quizScore < 90 ? 'disabled' : ''}>
                            ${progress.quizScore >= 90 ? 'Download Certificate' : 'In Progress'}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Earned Certificates Display -->
            <div class="cert-section">
                <h3>📋 Your Earned Certificates</h3>
                <div id="earnedCertsContainer"></div>
            </div>

            <!-- Certificate Preview -->
            <div class="cert-section">
                <h3>👁️ Certificate Preview</h3>
                <div class="cert-preview">
                    <div class="cert-template">
                        <div class="cert-header">🎓</div>
                        <h2>Certificate of Achievement</h2>
                        <p>This certifies that</p>
                        <h3 class="cert-name">${currentUser.username || 'Student'}</h3>
                        <p>has successfully completed the</p>
                        <h3 class="cert-title">PowerShell & CMD Professional Training</h3>
                        <p>with demonstrated proficiency in Blue Team SOC Operations</p>
                        <div class="cert-date">Date: ${new Date().toLocaleDateString()}</div>
                        <div class="cert-seal">✓ VERIFIED</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    displayEarnedCertificates();
}

function displayEarnedCertificates() {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    const earned = [];

    if (progress.lessonsCompleted >= 2) earned.push('PowerShell Essentials');
    if (progress.lessonsCompleted >= 3) earned.push('CMD Expert');
    if (progress.labsCompleted >= 1) earned.push('Lab Practitioner');
    if (progress.quizScore >= 80) earned.push('Quiz Master');
    if (progress.quizScore >= 90) earned.push('Blue Team Specialist');
    if (progress.lessonsCompleted === lessonsData.length && 
        progress.labsCompleted === labsData.length && 
        progress.quizScore >= 60) {
        earned.push('Professional SOC Analyst');
    }

    const container = document.getElementById('earnedCertsContainer');
    if (earned.length === 0) {
        container.innerHTML = '<p class="no-certs">Complete courses and assessments to earn certificates!</p>';
    } else {
        container.innerHTML = earned.map(cert => `
            <div class="earned-cert-badge">
                <span class="badge-icon">✅</span>
                <span class="badge-name">${cert}</span>
                <span class="badge-date">${new Date().toLocaleDateString()}</span>
            </div>
        `).join('');
    }
}

function downloadCertificate(certName) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const progress = JSON.parse(localStorage.getItem('progress')) || {};

    const certData = {
        name: certName,
        username: currentUser.username || 'Student',
        role: currentUser.role || 'Learner',
        date: new Date().toLocaleDateString(),
        score: progress.quizScore,
        lessons: progress.lessonsCompleted,
        labs: progress.labsCompleted,
        commands: progress.commandsLearned
    };

    // Generate HTML certificate
    const html = generateCertificateHTML(certData);
    
    // Create downloadable file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
    element.setAttribute('download', `${certName.replace(/\s+/g, '_')}_${currentUser.username}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification(`✅ Certificate "${certName}" downloaded!`, 'success');
}

function generateCertificateHTML(certData) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Certificate - ${certData.name}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        
        .certificate {
            width: 900px;
            max-width: 100%;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            border: 3px solid #ffd700;
            position: relative;
            overflow: hidden;
        }
        
        .certificate::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .certificate::after {
            content: '';
            position: absolute;
            bottom: -50%;
            left: -50%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .cert-content {
            position: relative;
            z-index: 1;
        }
        
        .cert-header {
            font-size: 80px;
            margin-bottom: 30px;
        }
        
        .cert-title-main {
            font-size: 42px;
            color: #2d3748;
            margin-bottom: 20px;
            font-weight: bold;
            text-decoration: underline;
            text-decoration-color: #ffd700;
        }
        
        .cert-subtitle {
            font-size: 18px;
            color: #4a5568;
            margin: 15px 0;
        }
        
        .cert-recipient {
            font-size: 36px;
            color: #2d3748;
            margin: 30px 0;
            padding: 20px;
            background: rgba(255, 215, 0, 0.2);
            border-radius: 10px;
            border-bottom: 2px dashed #ffd700;
        }
        
        .cert-description {
            font-size: 16px;
            color: #4a5568;
            margin: 20px 0;
            line-height: 1.8;
        }
        
        .cert-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 40px 0;
            font-size: 14px;
        }
        
        .detail-item {
            background: rgba(0, 0, 0, 0.05);
            padding: 15px;
            border-radius: 8px;
        }
        
        .detail-label {
            color: #718096;
            font-size: 12px;
            text-transform: uppercase;
        }
        
        .detail-value {
            color: #2d3748;
            font-size: 16px;
            font-weight: bold;
            margin-top: 5px;
        }
        
        .cert-seal {
            display: inline-block;
            width: 140px;
            height: 140px;
            border: 3px solid #ffd700;
            border-radius: 50%;
            margin-top: 30px;
            background: radial-gradient(circle, #ffd700, #ffed4e);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
        }
        
        .cert-signature {
            margin-top: 40px;
            font-size: 14px;
            color: #4a5568;
        }
        
        .signature-line {
            border-top: 2px solid #2d3748;
            margin: 50px auto 10px;
            width: 250px;
        }
        
        .verification-code {
            margin-top: 30px;
            font-size: 12px;
            color: #718096;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .certificate {
                box-shadow: none;
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="cert-content">
            <div class="cert-header">🎓</div>
            
            <h1 class="cert-title-main">Certificate of Achievement</h1>
            
            <p class="cert-subtitle">This is proudly presented to</p>
            
            <div class="cert-recipient">${certData.username}</div>
            
            <p class="cert-description">
                For successfully completing and demonstrating excellence in
            </p>
            
            <h2 class="cert-subtitle" style="font-size: 28px; color: #667eea;">${certData.name}</h2>
            
            <p class="cert-description">
                As a ${certData.role} in the Blue Team SOC Academy, you have demonstrated 
                proficiency in PowerShell, Command Prompt, and defensive security operations. 
                This certificate recognizes your commitment to excellence in cybersecurity education.
            </p>
            
            <div class="cert-details">
                <div class="detail-item">
                    <div class="detail-label">Lessons Completed</div>
                    <div class="detail-value">${certData.lessons} / ${lessonsData.length}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Labs Completed</div>
                    <div class="detail-value">${certData.labs} / ${labsData.length}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Quiz Score</div>
                    <div class="detail-value">${certData.score}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Commands Mastered</div>
                    <div class="detail-value">${certData.commands} / ${commandsReference.length}</div>
                </div>
            </div>
            
            <div class="cert-seal">✓</div>
            
            <div class="cert-signature">
                <p>Issued on ${certData.date}</p>
                <div class="signature-line"></div>
                <p>Blue Team SOC Academy</p>
            </div>
            
            <div class="verification-code">
                Verification Code: BT-${Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
        </div>
    </div>
</body>
</html>
    `;
}

// Initialize certificates on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('certificatesContainer')) {
        initializeCertificates();
    }
});
