export const lessonsData = [
  {
    id: 1,
    title: "PowerShell Fundamentals",
    category: "Basics",
    difficulty: "Beginner",
    duration: "45 min",
    level: "Beginner",
    description: "Learn the basics of PowerShell scripting and core concepts",
    objectives: [
      "Understand PowerShell as an object-oriented shell",
      "Master cmdlet syntax and usage",
      "Learn piping and object manipulation",
      "Create and manage variables"
    ],
    prerequisites: ["Basic Windows knowledge", "Command line familiarity"],
    resources: [
      { title: "Microsoft PowerShell Documentation", url: "https://docs.microsoft.com/en-us/powershell/" },
      { title: "PowerShell Gallery", url: "https://www.powershellgallery.com/" }
    ],
    content: `
      <h3>What is PowerShell?</h3>
      <p>PowerShell is a task automation framework from Microsoft consisting of a command-line shell and scripting language built on the .NET Framework.</p>
      <h3>Key Concepts:</h3>
      <ul>
        <li><strong>Cmdlets:</strong> Built-in commands like Get-Service</li>
        <li><strong>Objects:</strong> PowerShell works with objects, not text</li>
        <li><strong>Piping:</strong> Send output using |</li>
        <li><strong>Variables:</strong> Store data using $variableName</li>
      </ul>
    `,
    keyCommands: [
      { command: "Get-Command", description: "Lists all available cmdlets and functions" },
      { command: "Get-Help [cmdlet]", description: "Displays help for a specific cmdlet" },
      { command: "Get-Service", description: "Lists all services on the system" },
      { command: "Get-Process", description: "Lists all running processes" },
      { command: "Get-Item", description: "Gets files and folders" }
    ],
    codeSnippets: [
      {
        title: "Basic Variable Assignment",
        language: "powershell",
        code: "$variable = \"Hello World\"\nWrite-Host $variable"
      },
      {
        title: "Piping Example",
        language: "powershell",
        code: "Get-Service | Where-Object {$_.Status -eq 'Running'} | Select-Object Name, Status"
      },
      {
        title: "Simple Function",
        language: "powershell",
        code: "function Get-SystemInfo {\n  $os = Get-WmiObject -Class Win32_OperatingSystem\n  return $os.Caption\n}"
      }
    ],
    practiceExercises: [
      {
        title: "Exercise 1: List All Services",
        instructions: "Use Get-Service to list all services on your system. Filter to show only running services."
      },
      {
        title: "Exercise 2: Create Windows Event Log Report",
        instructions: "Use Get-EventLog to retrieve the last 10 errors from the System log."
      },
      {
        title: "Exercise 3: Process Discovery",
        instructions: "Create a script that lists all processes using more than 100MB of memory."
      }
    ]
  },
  {
    id: 2,
    title: "Command Prompt Essentials",
    category: "Basics",
    difficulty: "Beginner",
    duration: "40 min",
    level: "Beginner",
    description: "Master essential CMD commands for SOC operations",
    objectives: [
      "Navigate the Windows file system using CMD",
      "Execute system commands and scripts",
      "Understand networking diagnostics",
      "Master batch file creation basics"
    ],
    prerequisites: ["Windows operating system knowledge"],
    resources: [
      { title: "CMD Commands Reference", url: "https://www.microsoft.com/en-us/learning" },
    ],
    content: `
      <h3>Command Prompt Overview</h3>
      <p>CMD is the traditional Windows shell for system administration and the foundation for Windows scripting.</p>
      <h3>Essential Commands:</h3>
      <ul>
        <li><strong>ipconfig</strong> - Display network configuration</li>
        <li><strong>netstat</strong> - Show network connections and listening ports</li>
        <li><strong>tasklist</strong> - List all running processes</li>
        <li><strong>systeminfo</strong> - Display detailed system configuration</li>
      </ul>
    `,
    keyCommands: [
      { command: "ipconfig /all", description: "Shows detailed network configuration including DNS and DHCP" },
      { command: "netstat -ano", description: "Shows all connections with process IDs" },
      { command: "tasklist /v", description: "Verbose process list with memory and status information" },
      { command: "systeminfo", description: "Displays comprehensive system information" },
      { command: "wmic os get caption", description: "Query operating system information" }
    ],
    codeSnippets: [
      {
        title: "Check Network Configuration",
        language: "batch",
        code: "@echo off\necho === Network Configuration ===\nipconfig /all\npause"
      },
      {
        title: "Find Listening Ports",
        language: "batch",
        code: "@echo off\necho === Active Connections ===\nnetstat -ano | findstr LISTENING\npause"
      },
      {
        title: "List High Memory Processes",
        language: "batch",
        code: "@echo off\necho === Processes with High Memory Usage ===\nwmic process list brief /format:list | findstr VirtualSize\npause"
      }
    ],
    practiceExercises: [
      {
        title: "Exercise 1: Network Diagnostic Report",
        instructions: "Create a batch file that captures ipconfig and netstat output to a file for analysis."
      },
      {
        title: "Exercise 2: Active Process Investigation",
        instructions: "List all running processes and their process IDs using tasklist command."
      },
      {
        title: "Exercise 3: System Information Gathering",
        instructions: "Create a script that gathers systeminfo, ipconfig, and tasklist output into a single report."
      }
    ]
  },
  {
    id: 3,
    title: "Network Diagnostics",
    category: "Intermediate",
    difficulty: "Intermediate",
    duration: "50 min",
    level: "Intermediate",
    description: "Advanced network troubleshooting techniques",
    objectives: [
      "Master network troubleshooting tools",
      "Analyze network connectivity issues",
      "Use advanced packet analysis",
      "Identify suspicious network activity"
    ],
    prerequisites: ["Basic networking knowledge", "PowerShell Fundamentals"],
    resources: [
      { title: "Wireshark Official Guide", url: "https://www.wireshark.org/" },
    ],
    content: `
      <h3>Advanced Network Diagnostics</h3>
      <p>Learn to diagnose and troubleshoot network issues like a professional SOC analyst.</p>
      <h3>Key Tools:</h3>
      <ul>
        <li><strong>Wireshark:</strong> Network packet analyzer</li>
        <li><strong>nslookup:</strong> DNS query tool</li>
        <li><strong>tracert:</strong> Route tracing utility</li>
        <li><strong>Get-NetTCPConnection:</strong> PowerShell network analysis</li>
      </ul>
    `,
    keyCommands: [
      { command: "Get-NetTCPConnection -State Established", description: "Lists all established network connections" },
      { command: "Get-NetStatistics", description: "Displays network interface statistics" },
      { command: "Resolve-DnsName", description: "Performs DNS name resolution" },
      { command: "Get-NetRoute", description: "Displays network routing table" },
      { command: "nslookup [domain]", description: "Queries DNS servers for domain information" }
    ],
    codeSnippets: [
      {
        title: "Monitor Network Connections",
        language: "powershell",
        code: "Get-NetTCPConnection -State Established | Group-Object -Property State | Select-Object Name, Count"
      },
      {
        title: "DNS Resolution Test",
        language: "powershell",
        code: "Resolve-DnsName -Name 'example.com' -Type A | Select-Object Name, IPAddress, Type"
      },
      {
        title: "Identify Suspicious Connections",
        language: "powershell",
        code: "$suspicious = Get-NetTCPConnection | Where-Object {$_.RemotePort -eq 4444 -or $_.RemotePort -eq 8080}\n$suspicious | Select-Object LocalAddress, LocalPort, RemoteAddress, RemotePort"
      }
    ],
    practiceExercises: [
      {
        title: "Exercise 1: Connection Analysis",
        instructions: "Create a script to identify all outbound connections on unusual ports (not 80, 443, 53)."
      },
      {
        title: "Exercise 2: DNS Investigation",
        instructions: "Resolve multiple domains and display their IP addresses and record types."
      },
      {
        title: "Exercise 3: Network Performance Analysis",
        instructions: "Create a script that monitors network interface statistics and alerts on high packet loss."
      }
    ]
  },
  {
    id: 4,
    title: "Advanced PowerShell Techniques",
    category: "Advanced",
    difficulty: "Advanced",
    duration: "60 min",
    level: "Advanced",
    description: "Master advanced PowerShell scripting for SOC automation",
    objectives: [
      "Create complex PowerShell functions and modules",
      "Implement error handling and logging",
      "Use advanced filtering and pipeline operations",
      "Automate security operations workflows"
    ],
    prerequisites: ["PowerShell Fundamentals", "Command Prompt Essentials"],
    resources: [
      { title: "Advanced PowerShell Scripting", url: "https://docs.microsoft.com/en-us/powershell/scripting/" },
    ],
    content: `
      <h3>Professional PowerShell Automation</h3>
      <p>Learn enterprise-grade PowerShell scripting techniques used by professional SOC teams.</p>
      <h3>Advanced Topics:</h3>
      <ul>
        <li><strong>Custom Functions:</strong> Build reusable automation components</li>
        <li><strong>Error Handling:</strong> Robust Try-Catch-Finally blocks</li>
        <li><strong>Remote Management:</strong> PSRemoting for distributed operations</li>
        <li><strong>Logging:</strong> Comprehensive audit trails and reporting</li>
      </ul>
    `,
    keyCommands: [
      { command: "Invoke-Command", description: "Execute scripts on remote systems" },
      { command: "New-PSSession", description: "Create persistent remote session" },
      { command: "Try-Catch-Finally", description: "Advanced error handling structure" },
      { command: "Write-EventLog", description: "Log events to Windows Event Log" },
      { command: "Export-CSV", description: "Export results to CSV files" }
    ],
    codeSnippets: [
      {
        title: "Function with Error Handling",
        language: "powershell",
        code: "function Get-ProcessAlerts {\n  param([string]$ComputerName)\n  try {\n    $processes = Get-Process -ComputerName $ComputerName\n    return $processes | Where-Object {$_.WorkingSet -gt 500MB}\n  }\n  catch {\n    Write-Error \"Failed to query $ComputerName: $_\"\n  }\n}"
      },
      {
        title: "Remote Investigation Script",
        language: "powershell",
        code: "$session = New-PSSession -ComputerName 'SERVER01'\n$data = Invoke-Command -Session $session -ScriptBlock {\n  Get-EventLog -LogName Security | Where-Object {$_.EventID -eq 4625}\n}\nRemove-PSSession $session"
      },
      {
        title: "Security Event Monitoring",
        language: "powershell",
        code: "function Monitor-FailedLogins {\n  $events = Get-EventLog -LogName Security -InstanceId 4625 -Newest 100\n  $events | Group-Object -Property UserName | Select-Object Name, Count |\n  Where-Object {$_.Count -gt 5}\n}"
      }
    ],
    practiceExercises: [
      {
        title: "Exercise 1: Build a Security Audit Function",
        instructions: "Create a function that audits user permissions, login history, and system changes."
      },
      {
        title: "Exercise 2: Remote System Investigation",
        instructions: "Write a script that collects security logs from multiple remote systems and merges results."
      },
      {
        title: "Exercise 3: Automated Alert System",
        instructions: "Create an automated system that monitors security events and sends notifications on suspicious activity."
      }
    ]
  },
  {
    id: 5,
    title: "SOC Threat Analysis & Response",
    category: "Professional",
    difficulty: "Advanced",
    duration: "90 min",
    level: "Professional",
    description: "Professional-level threat analysis and incident response procedures",
    objectives: [
      "Understand threat actor tactics and procedures (TTPs)",
      "Perform forensic analysis and incident investigation",
      "Create and manage incident response playbooks",
      "Implement threat intelligence integration"
    ],
    prerequisites: ["Advanced PowerShell Techniques", "Network Diagnostics"],
    resources: [
      { title: "MITRE ATT&CK Framework", url: "https://attack.mitre.org/" },
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" }
    ],
    content: `
      <h3>Professional Threat Analysis Framework</h3>
      <p>Master the investigation techniques used by enterprise SOC teams during active incidents.</p>
      <h3>Core Competencies:</h3>
      <ul>
        <li><strong>Threat Intelligence:</strong> Understand the adversary landscape</li>
        <li><strong>Forensic Analysis:</strong> Investigate compromised systems</li>
        <li><strong>Incident Response:</strong> Coordinate response activities</li>
        <li><strong>Threat Hunting:</strong> Proactively search for threats</li>
      </ul>
    `,
    keyCommands: [
      { command: "Get-EventLog -LogName Security -Newest", description: "Retrieve security event log entries" },
      { command: "Get-ChildItem -Recurse -Force", description: "Find hidden files and folders" },
      { command: "Get-FileHash", description: "Calculate file hashes for comparison" },
      { command: "Get-ItemProperty -Path Registry", description: "Query registry for persistence mechanisms" },
      { command: "Get-MpComputerStatus", description: "Check Windows Defender status and settings" }
    ],
    codeSnippets: [
      {
        title: "Incident Investigation Toolkit",
        language: "powershell",
        code: "function Start-IncidentInvestigation {\n  param([string]$ComputerName, [datetime]$StartTime)\n  \n  $report = @{\n    RecentProcesses = Get-Process -ComputerName $ComputerName\n    SecurityEvents = Get-EventLog -LogName Security -Newest 500 -After $StartTime\n    NetworkConnections = Get-NetTCPConnection -State Established\n    InstalledSoftware = Get-WmiObject -Class Win32_Product\n  }\n  return $report\n}"
      },
      {
        title: "Malware Signature Detection",
        language: "powershell",
        code: "function Find-SuspiciousFiles {\n  param([string]$Path)\n  \n  $files = Get-ChildItem -Path $Path -Recurse -Force\n  foreach ($file in $files) {\n    $hash = Get-FileHash -Path $file.FullName\n    Write-Host \"File: $($file.Name) | Hash: $($hash.Hash)\"\n  }\n}"
      },
      {
        title: "Timeline Analysis",
        language: "powershell",
        code: "$timeline = Get-EventLog -LogName Security | Select-Object TimeGenerated, EventID, Message |\n Sort-Object TimeGenerated -Descending |\n Format-Table -AutoSize\n$timeline | Export-Csv -Path \"incident_timeline.csv\" -NoTypeInformation"
      }
    ],
    practiceExercises: [
      {
        title: "Exercise 1: Live Incident Response",
        instructions: "Simulate a breach scenario and create a comprehensive incident timeline with evidence collection."
      },
      {
        title: "Exercise 2: Threat Hunting Campaign",
        instructions: "Develop a threat hunting script that searches for indicators of compromise (IoCs) across systems."
      },
      {
        title: "Exercise 3: Playbook Development",
        instructions: "Create an automated incident response playbook that responds to specific threat scenarios."
      }
    ]
  },
  {
    id: 6,
    title: "Windows Forensics & Analysis",
    category: "Professional",
    difficulty: "Advanced",
    duration: "75 min",
    level: "Professional",
    description: "Master Windows forensic analysis and digital investigation techniques",
    objectives: [
      "Collect forensic evidence from Windows systems",
      "Analyze file systems and artifacts",
      "Recover deleted files and data",
      "Create forensic reports and timelines"
    ],
    prerequisites: ["SOC Threat Analysis & Response"],
    resources: [
      { title: "Windows Forensics Guide", url: "https://www.microsoft.com/" },
    ],
    content: `
      <h3>Digital Forensics on Windows Platforms</h3>
      <p>Learn professional forensic analysis techniques for Windows systems used in legal investigations and incident response.</p>
      <h3>Forensic Artifacts:</h3>
      <ul>
        <li><strong>Event Logs:</strong> System, Security, Application logs</li>
        <li><strong>Registry Hives:</strong> System and user configuration data</li>
        <li><strong>File Metadata:</strong> MAC times for timeline analysis</li>
        <li><strong>Memory Artifacts:</strong> Running processes and network connections</li>
      </ul>
    `,
    keyCommands: [
      { command: "Get-ItemProperty", description: "Query file properties and timestamps" },
      { command: "Get-MftRecord", description: "Analyze Master File Table records" },
      { command: "Get-AlternateDataStream", description: "Find hidden file streams" },
      { command: "Get-Shortcut", description: "Analyze Window shortcut files" },
      { command: "Export-ScheduledTask", description: "Extract scheduled task details" }
    ],
    codeSnippets: [
      {
        title: "File Timeline Generation",
        language: "powershell",
        code: "function Get-FileTimeline {\n  param([string]$Path)\n  \n  Get-ChildItem -Path $Path -Recurse -Force |\n  Select-Object FullName, CreationTime, LastWriteTime, LastAccessTime |\n  Sort-Object LastWriteTime -Descending |\n  Export-Csv -Path \"file_timeline.csv\" -NoTypeInformation\n}"
      },
      {
        title: "Registry Analysis for Persistence",
        language: "powershell",
        code: "function Find-RegistryPersistence {\n  $paths = @(\n    \"HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\",\n    \"HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce\"\n  )\n  \n  foreach ($path in $paths) {\n    Get-ItemProperty -Path $path | Select-Object PSPath, *\n  }\n}"
      },
      {
        title: "Artifact Collection Script",
        language: "powershell",
        code: "function Collect-ForensicArtifacts {\n  param([string]$OutputPath)\n  \n  $artifacts = @{\n    EventLogs = Get-EventLog -List\n    RunningProcesses = Get-Process\n    NetworkConnections = Get-NetTCPConnection\n    ScheduledTasks = Get-ScheduledTask\n  }\n  \n  $artifacts | ConvertTo-Json | Out-File \"$OutputPath\\artifacts.json\"\n}"
      }
    ],
    practiceExercises: [
      {
        title: "Exercise 1: Timeline Creation",
        instructions: "Create a comprehensive file timeline from a suspect directory and analyze unusual access patterns."
      },
      {
        title: "Exercise 2: Registry Investigation",
        instructions: "Search the Windows Registry for persistence mechanisms and unauthorized modifications."
      },
      {
        title: "Exercise 3: Evidence Collection",
        instructions: "Build an automated evidence collection script that preserves chain of custody."
      }
    ]
  }
]

export const labsData = [
  {
    id: 1,
    title: "PowerShell Script Basics",
    difficulty: "Beginner",
    duration: "1h",
    description: "Write your first PowerShell script"
  },
  {
    id: 2,
    title: "Network Monitoring Lab",
    difficulty: "Intermediate",
    duration: "2h",
    description: "Monitor and analyze network traffic"
  },
  {
    id: 3,
    title: "Process Management",
    difficulty: "Beginner",
    duration: "1.5h",
    description: "Learn to manage Windows processes"
  },
]

export const quizData = [
  {
    id: 1,
    q: "What does 'Get-Service' do in PowerShell?",
    options: ["Lists running services", "Stops a service", "Creates a new service", "Deletes a service"],
    correct: 0
  },
  {
    id: 2,
    q: "Which command shows network statistics in CMD?",
    options: ["netstat", "ipconfig", "tasklist", "systeminfo"],
    correct: 0
  },
  {
    id: 3,
    q: "What symbol is used for piping in PowerShell?",
    options: [">", "|", "&", "$"],
    correct: 1
  },
  {
    id: 4,
    q: "How do you list running processes in PowerShell?",
    options: ["Get-Process", "tasklist", "ps", "process-list"],
    correct: 0
  },
  {
    id: 5,
    q: "Which is a PowerShell comparison operator?",
    options: ["-eq", "==", "=", "==="],
    correct: 0
  },
  {
    id: 6,
    q: "What returns the current date/time in PowerShell?",
    options: ["Get-Date", "Get-Time", "Get-Clock", "Get-DateTime"],
    correct: 0
  },
  {
    id: 7,
    q: "How do you define a variable in PowerShell?",
    options: ["$var = value", "var = value", "let var = value", "const var = value"],
    correct: 0
  },
  {
    id: 8,
    q: "Which command filters objects in PowerShell?",
    options: ["Where-Object", "Filter-Object", "Find-Object", "Select-Object"],
    correct: 0
  },
  {
    id: 9,
    q: "What is a cmdlet in PowerShell?",
    options: ["A built-in command", "A text file", "A configuration file", "A variable"],
    correct: 0
  },
  {
    id: 10,
    q: "How do you get help in PowerShell?",
    options: ["Get-Help", "Help", "man", "All of the above"],
    correct: 3
  },
]
export const certificationsData = [
  {
    id: 1,
    name: "SOC Fundamentals",
    description: "Master the basics of Security Operations Center operations and procedures",
    issuer: "Blue Team Academy",
    requirements: [
      "Complete 3 Fundamentals lessons",
      "Score 70%+ on SOC Basics Quiz",
      "Pass the hands-on lab assessment"
    ],
    status: "available",
    progress: 0,
    icon: "🛡️",
    prerequisites: [],
    earnedAt: undefined,
    expiresAt: undefined
  },
  {
    id: 2,
    name: "Network Security Expert",
    description: "Advanced network monitoring, threat detection, and incident response",
    issuer: "Blue Team Academy",
    requirements: [
      "Complete Network Diagnostics lesson",
      "Score 80%+ on Network Security Quiz",
      "Complete 2 network security labs",
      "Complete 5 advanced lessons"
    ],
    status: "in-progress",
    progress: 60,
    icon: "🌐",
    prerequisites: ["SOC Fundamentals"],
    earnedAt: undefined,
    expiresAt: undefined
  },
  {
    id: 3,
    name: "PowerShell Automation Master",
    description: "Expert-level PowerShell scripting for security automation and analysis",
    issuer: "Blue Team Academy",
    requirements: [
      "Complete Advanced PowerShell Techniques",
      "Complete Windows Forensics & Analysis",
      "Pass 3 PowerShell automation projects",
      "Score 90%+ on advanced quiz"
    ],
    status: "available",
    progress: 0,
    icon: "⚙️",
    prerequisites: ["SOC Fundamentals", "Network Security Expert"],
    earnedAt: undefined,
    expiresAt: undefined
  },
  {
    id: 4,
    name: "Threat Hunter",
    description: "Advanced threat hunting techniques and proactive cyber defense strategies",
    issuer: "Blue Team Academy",
    requirements: [
      "Complete SOC Threat Analysis & Response",
      "Complete 4 professional-level lessons",
      "Pass threat hunting capstone project",
      "Score 85%+ on threat analysis quiz"
    ],
    status: "available",
    progress: 0,
    icon: "🔍",
    prerequisites: ["Network Security Expert"],
    earnedAt: undefined,
    expiresAt: undefined
  },
  {
    id: 5,
    name: "Digital Forensics Specialist",
    description: "Master Windows forensics, evidence collection, and incident investigation",
    issuer: "Blue Team Academy",
    requirements: [
      "Complete Windows Forensics & Analysis",
      "Pass forensics lab simulations",
      "Complete evidence collection project",
      "Score 85%+ on forensics quiz"
    ],
    status: "available",
    progress: 0,
    icon: "🔬",
    prerequisites: ["SOC Fundamentals"],
    earnedAt: undefined,
    expiresAt: undefined
  },
]

export const reportsData = [
  {
    id: 1,
    title: "Learning Progress Report",
    type: "learning",
    description: "Comprehensive overview of your learning journey and achievements",
    generatedAt: new Date(),
    metrics: [
      { label: "Lessons Completed", value: 8, trend: "up" },
      { label: "Labs Completed", value: 4, trend: "up" },
      { label: "Average Quiz Score", value: "82%", trend: "up" },
      { label: "Commands Mastered", value: 60, trend: "up" },
      { label: "Hours Invested", value: 120, trend: "up" },
      { label: "Current Streak", value: 12, trend: "stable" }
    ],
    insights: [
      "You have completed 80% of Intermediate level content",
      "Your quiz performance has improved by 15% in the last week",
      "Strong progress in network diagnostics and PowerShell fundamentals",
      "You're on track to earn Network Security Expert certification"
    ],
    recommendations: [
      "Start Advanced PowerShell Techniques to prepare for Automation Master cert",
      "Review network diagnostic commands to strengthen weak areas",
      "Complete remaining labs to unlock professional-level courses",
      "Practice daily to maintain your 12-day learning streak"
    ]
  },
  {
    id: 2,
    title: "Skill Assessment Report",
    type: "performance",
    description: "Detailed analysis of your technical skills and competencies",
    generatedAt: new Date(),
    metrics: [
      { label: "PowerShell Proficiency", value: "Intermediate", trend: "up" },
      { label: "Network Knowledge", value: "Advanced", trend: "up" },
      { label: "Command Execution", value: 85, trend: "up" },
      { label: "Problem-Solving", value: 78, trend: "stable" },
      { label: "Security Awareness", value: 90, trend: "up" },
      { label: "Lab Performance", value: "Very Good", trend: "up" }
    ],
    insights: [
      "Exceptional performance in security fundamentals and network analysis",
      "Strong command-line skills with demonstrated proficiency in PowerShell",
      "Above-average problem-solving abilities shown in lab assessments",
      "Security mindset well-developed for SOC operations"
    ],
    recommendations: [
      "Focus on advanced automation techniques to reach expert level",
      "Dedicate more time to forensics topics for well-rounded expertise",
      "Prepare for Network Security Expert certification exam",
      "Consider specializing in threat hunting or forensics paths"
    ]
  },
  {
    id: 3,
    title: "Certification Readiness Report",
    type: "progress",
    description: "Analysis of your progress toward available certifications",
    generatedAt: new Date(),
    metrics: [
      { label: "SOC Fundamentals", value: "0%", trend: "stable" },
      { label: "Network Security Expert", value: "60%", trend: "up" },
      { label: "PowerShell Automation", value: "35%", trend: "up" },
      { label: "Threat Hunter", value: "25%", trend: "stable" },
      { label: "Digital Forensics", value: "15%", trend: "stable" },
      { label: "Avg Certification Progress", value: "27%", trend: "up" }
    ],
    insights: [
      "On track to earn Network Security Expert within 2-3 weeks",
      "SOC Fundamentals can be completed with minimal additional effort",
      "Need 2 more lessons for PowerShell Automation prerequisites",
      "Forensics and Threat Hunting paths require more foundational work"
    ],
    recommendations: [
      "Complete Network Security Expert exam in next 2 weeks",
      "Immediately enroll in Windows Forensics lesson",
      "Schedule practical labs for threat hunting preparation",
      "Establish timeline for PowerShell Automation certification"
    ]
  },
  {
    id: 4,
    title: "Security Operations Readiness",
    type: "security",
    description: "Assessment of your readiness for SOC operations roles",
    generatedAt: new Date(),
    metrics: [
      { label: "Incident Response", value: 75, trend: "up" },
      { label: "Network Monitoring", value: 88, trend: "up" },
      { label: "Log Analysis", value: 70, trend: "stable" },
      { label: "Threat Detection", value: 82, trend: "up" },
      { label: "Tool Proficiency", value: 78, trend: "up" },
      { label: "SOC Readiness Score", value: 79, trend: "up" }
    ],
    insights: [
      "Demonstrated strong capabilities in network monitoring and threat detection",
      "Log analysis and event correlation skills need further development",
      "Tool proficiency above industry standard for entry-level SOC positions",
      "Incident response procedures well understood"
    ],
    recommendations: [
      "Complete advanced log analysis and SIEM training",
      "Practice incident response scenarios in simulated environment",
      "Earn Network Security Expert certification to strengthen resume",
      "Gain hands-on experience with actual SOC tools and platforms"
    ]
  }
]