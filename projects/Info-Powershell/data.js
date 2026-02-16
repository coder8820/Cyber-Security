// Course Data and Content

const lessonsData = [
    {
        id: 1,
        title: "PowerShell Fundamentals",
        category: "Basics",
        difficulty: "Beginner",
        duration: "45 min",
        description: "Learn the basics of PowerShell scripting and core concepts",
        content: `
            <h3>What is PowerShell?</h3>
            <p>PowerShell is a task automation and configuration management framework from Microsoft. It's designed specifically for system administrators and SOC analysts.</p>
            
            <h3>Key Concepts:</h3>
            <ul>
                <li><strong>Cmdlets:</strong> Lightweight commands built into PowerShell (Get-Service, Get-Process, etc.)</li>
                <li><strong>Objects:</strong> PowerShell works with objects, not text strings</li>
                <li><strong>Piping:</strong> Send output from one cmdlet to another using |</li>
                <li><strong>Variables:</strong> Store data using $variableName</li>
                <li><strong>Operators:</strong> -eq, -lt, -gt, -and, -or for comparisons</li>
            </ul>

            <h3>Basic Syntax:</h3>
            <pre><code>Get-Command                    # List all available cmdlets
Get-Help Get-Service           # Get help about a cmdlet
Get-Service | Where-Object {$_.Status -eq 'Running'}  # Filter services</code></pre>

            <h3>Exercise:</h3>
            <p>Try opening PowerShell and running these commands to explore.</p>
        `
    },
    {
        id: 2,
        title: "Command Prompt Essentials",
        category: "Basics",
        difficulty: "Beginner",
        duration: "40 min",
        description: "Master essential CMD commands for SOC operations",
        content: `
            <h3>Command Prompt Overview</h3>
            <p>CMD (Command Prompt) is the traditional Windows shell for system administration and troubleshooting.</p>

            <h3>Essential Commands:</h3>
            <ul>
                <li><strong>ipconfig:</strong> Display network configuration</li>
                <li><strong>netstat:</strong> Show network connections and listening ports</li>
                <li><strong>tasklist:</strong> List all running processes</li>
                <li><strong>taskkill:</strong> Terminate a process</li>
                <li><strong>sc query:</strong> Query service information</li>
                <li><strong>systeminfo:</strong> System configuration information</li>
            </ul>

            <h3>Common Usage:</h3>
            <pre><code>ipconfig /all                  # Full network details
netstat -an                   # Show all connections
tasklist /v                   # Verbose process list
sc query state=all            # Query all services</code></pre>

            <h3>SOC Analyst Tip:</h3>
            <p>CMD is lighter than PowerShell and often used for quick system checks and legacy automation.</p>
        `
    },
    {
        id: 3,
        title: "Network Troubleshooting",
        category: "Networking",
        difficulty: "Intermediate",
        duration: "60 min",
        description: "Investigate network issues using PowerShell and CMD",
        content: `
            <h3>Network Troubleshooting Commands</h3>

            <h3>PowerShell Commands:</h3>
            <ul>
                <li><strong>Get-NetIPAddress:</strong> View all IP addresses</li>
                <li><strong>Get-NetTCPConnection:</strong> Show TCP connections</li>
                <li><strong>Get-NetListener:</strong> Show listening ports</li>
                <li><strong>Resolve-DnsName:</strong> DNS resolution</li>
                <li><strong>Test-NetConnection:</strong> Test connectivity to remote host</li>
            </ul>

            <h3>CMD Commands:</h3>
            <ul>
                <li><strong>ipconfig:</strong> View IP configuration</li>
                <li><strong>ping:</strong> Test reachability</li>
                <li><strong>tracert:</strong> Trace route to destination</li>
                <li><strong>nslookup:</strong> Query DNS servers</li>
                <li><strong>arp -a:</strong> Show ARP cache</li>
            </ul>

            <h3>Real-World Scenario:</h3>
            <pre><code>Get-NetTCPConnection -State Established | Group-Object LocalPort | Sort-Object Count -Descending
# This shows which ports have the most active connections</code></pre>

            <h3>Investigation Tip:</h3>
            <p>Use Get-NetTCPConnection combined with Get-Process to identify suspicious network activity.</p>
        `
    },
    {
        id: 4,
        title: "Process and Service Management",
        category: "System Administration",
        difficulty: "Intermediate",
        duration: "55 min",
        description: "Monitor and manage processes and Windows services",
        content: `
            <h3>Process Management</h3>

            <h3>PowerShell Commands:</h3>
            <ul>
                <li><strong>Get-Process:</strong> List all processes with detailed info</li>
                <li><strong>Get-Process -Name:</strong> Get specific process details</li>
                <li><strong>Stop-Process:</strong> Terminate a process</li>
                <li><strong>Get-Process | Where-Object {$_.CPU -gt 50}:</strong> Find resource hogs</li>
            </ul>

            <h3>Service Management:</h3>
            <ul>
                <li><strong>Get-Service:</strong> List all services</li>
                <li><strong>Get-Service | Where-Object {$_.Status -eq 'Running'}:</strong> Show running services</li>
                <li><strong>Start-Service / Stop-Service:</strong> Control services</li>
                <li><strong>Set-Service -StartupType:</strong> Change startup type</li>
            </ul>

            <h3>SOC Investigation Example:</h3>
            <pre><code># Find suspicious processes using high CPU
Get-Process | Where-Object {$_.CPU -gt 100} | Select-Object Name, Id, CPU, Memory

# Check if a critical service is running
Get-Service -Name 'WinRM' | Select-Object Status, StartType</code></pre>

            <h3>Security Best Practice:</h3>
            <p>Regularly monitor running processes and services for unauthorized or suspicious activity.</p>
        `
    },
    {
        id: 5,
        title: "Event Log Analysis",
        category: "Security",
        difficulty: "Advanced",
        duration: "75 min",
        description: "Deep dive into Windows Event Logs for security investigations",
        content: `
            <h3>Windows Event Logs Overview</h3>
            <p>Event Logs are crucial for SOC analysts - they contain all system, application, and security events.</p>

            <h3>Key Log Types:</h3>
            <ul>
                <li><strong>Security Log:</strong> Authentication, access, and security events</li>
                <li><strong>System Log:</strong> System startup, driver, and service events</li>
                <li><strong>Application Log:</strong> Application-specific events</li>
                <li><strong>ForwardedEvents:</strong> Events from other computers</li>
            </ul>

            <h3>PowerShell Commands:</h3>
            <ul>
                <li><strong>Get-EventLog -LogName Security:</strong> Read security events</li>
                <li><strong>Get-WinEvent -LogName 'Windows PowerShell':</strong> PowerShell activity</li>
                <li><strong>Get-EventLog -After (Get-Date).AddHours(-1):</strong> Events from last hour</li>
                <li><strong>Get-EventLog | Select-Object TimeGenerated, EventId, Message:</strong> Filter details</li>
            </ul>

            <h3>Important Event IDs:</h3>
            <ul>
                <li><strong>4624:</strong> Successful logon</li>
                <li><strong>4625:</strong> Failed logon</li>
                <li><strong>4672:</strong> Special privileges assigned</li>
                <li><strong>4688:</strong> Process creation</li>
                <li><strong>4698:</strong> Scheduled task created</li>
                <li><strong>4720:</strong> User account created</li>
            </ul>

            <h3>Example Query:</h3>
            <pre><code># Find failed login attempts in last 24 hours
Get-EventLog -LogName Security -InstanceId 4625 -After (Get-Date).AddDays(-1) | 
  Select-Object TimeGenerated, Message</code></pre>
        `
    },
    {
        id: 6,
        title: "Advanced PowerShell Scripting",
        category: "Advanced",
        difficulty: "Advanced",
        duration: "90 min",
        description: "Write powerful scripts for automated SOC tasks",
        content: `
            <h3>Script Fundamentals</h3>

            <h3>Variables and Data Types:</h3>
            <pre><code>$processName = "svchost"
$portNumber = 8080
$isRunning = $true
$services = @("WinRM", "EventLog", "SecurityCenter")</code></pre>

            <h3>Control Structures:</h3>
            <pre><code>if ($status -eq "Running") {
    Write-Host "Service is active"
}

foreach ($service in $services) {
    Get-Service $service
}

while ($count -lt 10) {
    Write-Host $count
    $count++
}</code></pre>

            <h3>Functions:</h3>
            <pre><code>function Get-SuspiciousProcess {
    param([int]$CPUThreshold = 50)
    Get-Process | Where-Object {$_.CPU -gt $CPUThreshold}
}

Get-SuspiciousProcess -CPUThreshold 100</code></pre>

            <h3>Real-World SOC Script:</h3>
            <pre><code># Monitor for brute force attempts
$now = Get-Date
$hour_ago = $now.AddHours(-1)
$failed_logins = Get-EventLog -LogName Security -InstanceId 4625 -After $hour_ago

if ($failed_logins.Count -gt 5) {
    Write-Warning "Potential brute force attack detected!"
}</code></pre>
        `
    },
    {
        id: 7,
        title: "Forensics & Digital Evidence",
        category: "Forensics",
        difficulty: "Advanced",
        duration: "120 min",
        description: "Collect and analyze digital evidence from Windows systems",
        content: `
            <h3>Digital Forensics Fundamentals</h3>
            <p>Digital forensics is the process of uncovering and interpreting electronic data.</p>

            <h3>Key Evidence Sources:</h3>
            <ul>
                <li><strong>Registry Hives:</strong> Store system configuration and user activity</li>
                <li><strong>Event Logs:</strong> Application, System, and Security events</li>
                <li><strong>Artifacts:</strong> Browser history, prefetch files, temporary files</li>
                <li><strong>File System:</strong> MFT, journal, shadow copies</li>
                <li><strong>Memory:</strong> RAM dumps for volatile data</li>
            </ul>

            <h3>Evidence Collection Commands:</h3>
            <pre><code># Collect system information
systeminfo > evidence.txt
Get-ChildItem C:\ -Attributes Hidden -Recurse > hidden_files.txt

# Memory dump
powershell "Get-MpComputerStatus" > av_status.txt

# Event logs Export
wevtutil export-log security C:\\evidence\\security.evtx</code></pre>

            <h3>Best Practices:</h3>
            <ul>
                <li>Preserve chain of custody</li>
                <li>Create forensic images of drives</li>
                <li>Use write blockers</li>
                <li>Document all findings</li>
                <li>Make copies for analysis</li>
            </ul>
        `
    },
    {
        id: 8,
        title: "Malware Analysis & Response",
        category: "Threat Hunting",
        difficulty: "Advanced",
        duration: "100 min",
        description: "Detect, analyze, and respond to malware threats",
        content: `
            <h3>Malware Analysis Process</h3>
            <p>A systematic approach to understanding malicious code behavior and impact.</p>

            <h3>Stages of Malware:</h3>
            <ul>
                <li><strong>Initial Access:</strong> How malware enters the system</li>
                <li><strong>Execution:</strong> How malware runs</li>
                <li><strong>Persistence:</strong> How malware survives reboots</li>
                <li><strong>Lateral Movement:</strong> How malware spreads</li>
                <li><strong>Data Exfiltration:</strong> How data is stolen</li>
            </ul>

            <h3>Detection Commands:</h3>
            <pre><code># Check running exe locations
Get-Process | Where-Object {$_.ProcessName -notmatch "svchost|csrss|System"} | Select-Object Name, Path

# Find suspicious DLLs
Get-ChildItem "C:\\Windows\\System32" -Filter "*.dll" | Get-AuthenticodeSignature | Where-Object {$_.Status -ne "Valid"}

# Check startup locations
Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run</code></pre>

            <h3>Response Actions:</h3>
            <ul>
                <li>Isolate affected systems from network</li>
                <li>Preserve evidence and memory dump</li>
                <li>Kill malicious processes</li>
                <li>Remove persistence mechanisms</li>
                <li>Scan for similar signatures</li>
            </ul>
        `
    },
    {
        id: 9,
        title: "Threat Hunting & Detection Engineering",
        category: "Threat Hunting",
        difficulty: "Advanced",
        duration: "110 min",
        description: "Proactively hunt for threats and develop detection rules",
        content: `
            <h3>Threat Hunting Methodology</h3>
            <p>Proactively searching for cyber threats that may have evaded traditional security tools.</p>

            <h3>Hunting Techniques:</h3>
            <ul>
                <li><strong>Behavioral Analysis:</strong> Identify unusual patterns</li>
                <li><strong>Anomaly Detection:</strong> Find statistical outliers</li>
                <li><strong>Hunt Hypotheses:</strong> Test specific attack patterns</li>
                <li><strong>Indicator Intelligence:</strong> Use known IOCs</li>
                <li><strong>User Behavior:</strong> Track unusual user activities</li>
            </ul>

            <h3>Detection Rule Examples:</h3>
            <pre><code># Hunt for suspicious PowerShell usage
Get-EventLog -LogName "Windows PowerShell" | Where-Object {
    $_.Message -match "DownloadFile|WebClient|Invoke-Expression"
}

# Find unusual account activity
Get-EventLog -LogName Security -InstanceId 4688 | Where-Object {
    $_.Message -match "cmd.exe|powershell.exe" -and $_.TimeGenerated -gt (Get-Date).AddDays(-1)
}

# Detect lateral movement attempts
Get-EventLog -LogName Security -InstanceId 4625 | Group-Object UserName | 
    Where-Object {$_.Count -gt 5}</code></pre>

            <h3>Intelligence Framework:</h3>
            <ul>
                <li><strong>MITRE ATT&CK:</strong> Adversary tactics and techniques</li>
                <li><strong>Indicators of Compromise (IOC):</strong> Known bad signatures</li>
                <li><strong>Threat Intelligence:</strong> External threat data</li>
                <li><strong>YARA Rules:</strong> Pattern matching for malware</li>
            </ul>
        `
    }
];


const labsData = [
    {
        id: 1,
        title: "Network Reconnaissance",
        difficulty: "Beginner",
        duration: "30 min",
        description: "Map your network using basic tools",
        tasks: [
            "Run 'ipconfig /all' to find your network configuration",
            "Use 'ping google.com' to test external connectivity",
            "Run 'netstat -an' to see active connections",
            "Use 'tracert' to trace the route to a website"
        ]
    },
    {
        id: 2,
        title: "Process Investigation",
        difficulty: "Intermediate",
        duration: "45 min",
        description: "Identify and analyze running processes",
        tasks: [
            "Get all running processes and export to CSV",
            "Find processes using high CPU/Memory",
            "Identify which process is listening on port 443",
            "Stop a non-critical service safely"
        ]
    },
    {
        id: 3,
        title: "Event Log Hunting",
        difficulty: "Intermediate",
        duration: "60 min",
        description: "Hunt for security events",
        tasks: [
            "Find all failed login attempts from today",
            "Identify accounts with special privileges assigned",
            "Look for new process creation events (Event ID 4688)",
            "Generate a report of top error events"
        ]
    },
    {
        id: 4,
        title: "Incident Response Simulation",
        difficulty: "Advanced",
        duration: "90 min",
        description: "Simulate a real SOC incident response",
        tasks: [
            "Identify suspicious network connections",
            "Correlate failed logins with process creation",
            "Document the attack timeline",
            "Recommend remediation steps"
        ]
    }
];

const commandsReference = [
    // PowerShell Commands
    {
        name: "Get-Service",
        type: "PowerShell",
        category: "Service Management",
        syntax: "Get-Service [-Name <string>]",
        description: "Gets the services on a local or remote computer",
        example: "Get-Service -Name 'WinRM'",
        useCase: "Query service status in SOC monitoring"
    },
    {
        name: "Get-Process",
        type: "PowerShell",
        category: "Process Management",
        syntax: "Get-Process [[-Name] <string[]>]",
        description: "Gets the processes running on the local computer",
        example: "Get-Process | Where-Object {$_.CPU -gt 50}",
        useCase: "Identify resource-intensive processes during incidents"
    },
    {
        name: "Get-EventLog",
        type: "PowerShell",
        category: "Event Management",
        syntax: "Get-EventLog -LogName <string>",
        description: "Gets the events in an event log",
        example: "Get-EventLog -LogName Security -After (Get-Date).AddDays(-1)",
        useCase: "Investigation of security events"
    },
    {
        name: "Get-NetTCPConnection",
        type: "PowerShell",
        category: "Networking",
        syntax: "Get-NetTCPConnection [-State <string>]",
        description: "Shows established TCP connections",
        example: "Get-NetTCPConnection -State Established",
        useCase: "Monitor active connections for anomalies"
    },
    {
        name: "Stop-Process",
        type: "PowerShell",
        category: "Process Management",
        syntax: "Stop-Process -Name <string> [-Force]",
        description: "Stops one or more running processes",
        example: "Stop-Process -Name 'notepad' -Force",
        useCase: "Terminate malicious or unauthorized processes"
    },
    {
        name: "Get-WinEvent",
        type: "PowerShell",
        category: "Event Management",
        syntax: "Get-WinEvent -LogName <string>",
        description: "Gets events from logs or event tracing log files",
        example: "Get-WinEvent -LogName 'Windows PowerShell'",
        useCase: "Advanced event log analysis and forensics"
    },
    {
        name: "Test-NetConnection",
        type: "PowerShell",
        category: "Networking",
        syntax: "Test-NetConnection -ComputerName <string> [-Port <int>]",
        description: "Tests connectivity to a remote computer",
        example: "Test-NetConnection -ComputerName 'google.com' -Port 443",
        useCase: "Network troubleshooting and connectivity checks"
    },
    {
        name: "Get-ChildItem",
        type: "PowerShell",
        category: "File System",
        syntax: "Get-ChildItem [-Path] <string>",
        description: "Gets the items and child items in locations",
        example: "Get-ChildItem -Path 'C:\\\\' -Filter '*.exe'",
        useCase: "File system investigation for malware"
    },

    // CMD Commands
    {
        name: "ipconfig",
        type: "CMD",
        category: "Networking",
        syntax: "ipconfig [/all | /release | /renew]",
        description: "Displays all current TCP/IP network configuration",
        example: "ipconfig /all",
        useCase: "Quick network configuration review"
    },
    {
        name: "netstat",
        type: "CMD",
        category: "Networking",
        syntax: "netstat [-a | -b | -n]",
        description: "Displays protocol statistics and current connections",
        example: "netstat -an | findstr :8080",
        useCase: "Identify suspicious listening ports"
    },
    {
        name: "tasklist",
        type: "CMD",
        category: "Process Management",
        syntax: "tasklist [/v] [/svc]",
        description: "Lists all currently running processes",
        example: "tasklist /v",
        useCase: "Process monitoring on systems with limited PowerShell"
    },
    {
        name: "taskkill",
        type: "CMD",
        category: "Process Management",
        syntax: "taskkill /PID <pid> [/F]",
        description: "Terminates a process by Process ID or Image name",
        example: "taskkill /IM malware.exe /F",
        useCase: "Force terminate malicious processes"
    },
    {
        name: "sc query",
        type: "CMD",
        category: "Service Management",
        syntax: "sc query [service_name]",
        description: "Queries the status of a service",
        example: "sc query WinRM",
        useCase: "Check service status on remote systems"
    },
    {
        name: "systeminfo",
        type: "CMD",
        category: "System Information",
        syntax: "systeminfo",
        description: "Displays system configuration information",
        example: "systeminfo",
        useCase: "System intelligence during initial response"
    },
    {
        name: "ping",
        type: "CMD",
        category: "Networking",
        syntax: "ping [-n count] host",
        description: "Tests connectivity to a remote host",
        example: "ping -n 4 google.com",
        useCase: "Basic network connectivity testing"
    },
    {
        name: "nslookup",
        type: "CMD",
        category: "Networking",
        syntax: "nslookup domain [nameserver]",
        description: "Queries the DNS name services",
        example: "nslookup google.com",
        useCase: "DNS resolution and domain investigation"
    },
    {
        name: "arp -a",
        type: "CMD",
        category: "Networking",
        syntax: "arp -a",
        description: "Displays the ARP cache",
        example: "arp -a",
        useCase: "Check for ARP spoofing or rogue devices"
    },
    {
        name: "wevtutil",
        type: "CMD",
        category: "Event Management",
        syntax: "wevtutil qe Security /c:100",
        description: "Queries event logs from command line",
        example: "wevtutil qe Security /c:10 /f:text",
        useCase: "Event log queries on remote systems"
    }
];

const quizData = [
    {
        q: "Which PowerShell cmdlet shows active TCP connections?",
        options: ["Get-Service", "Get-NetTCPConnection", "Get-Process", "Get-EventLog"],
        a: "Get-NetTCPConnection"
    },
    {
        q: "What does 'netstat -an' command display?",
        options: ["Running services", "Active connections and ports", "System processes", "Event logs"],
        a: "Active connections and ports"
    },
    {
        q: "Event ID 4625 in Windows Security Log represents:",
        options: ["Successful logon", "Failed logon", "Process creation", "Service started"],
        a: "Failed logon"
    },
    {
        q: "Which cmdlet lists all running process?",
        options: ["Get-Service", "Get-EventLog", "Get-Process", "Get-NetTCPConnection"],
        a: "Get-Process"
    },
    {
        q: "How do you pipe output in PowerShell?",
        options: ["&", "|", "->", "::"],
        a: "|"
    },
    {
        q: "What is the purpose of 'ipconfig /all'?",
        options: ["List processes", "Show full network config", "Query services", "Clear DNS cache"],
        a: "Show full network config"
    },
    {
        q: "Which command tests connectivity to a remote host in PowerShell?",
        options: ["Test-Net", "Test-NetConnection", "Check-Connection", "Ping-Host"],
        a: "Test-NetConnection"
    },
    {
        q: "Event ID 4688 represents:",
        options: ["Failed logon", "Process creation", "Service started", "Privilege assigned"],
        a: "Process creation"
    },
    {
        q: "How do you filter results in PowerShell?",
        options: ["Use grep", "Use Where-Object", "Use findstr", "Use filter keyword"],
        a: "Use Where-Object"
    },
    {
        q: "What does 'taskkill /F' do?",
        options: ["List tasks", "Find a task", "Force terminate a process", "Filter tasks"],
        a: "Force terminate a process"
    }
];

const toolsData = [
    {
        name: "Sysinternals Suite",
        category: "System Tools",
        description: "Advanced system utilities by Microsoft for diagnostics",
        tools: ["Process Explorer", "Network Monitor", "Procmon", "Autoruns"],
        helpfulness: "Critical for SOC teams"
    },
    {
        name: "Event Log Explorer",
        category: "Event Analysis",
        description: "Advanced Windows Event Log viewer and analyzer",
        tools: ["Log filtering", "Event correlation", "Timeline analysis"],
        helpfulness: "Essential for investigations"
    },
    {
        name: "Network Monitor (Wireshark)",
        category: "Network Tools",
        description: "Packet analysis and network troubleshooting",
        tools: ["Packet capture", "Protocol analysis", "Network statistics"],
        helpfulness: "Core SOC tool for network analysis"
    },
    {
        name: "Process Monitoring Tools",
        category: "Process Tools",
        description: "Advanced process monitoring and analysis",
        tools: ["Performance Monitor", "Task Manager", "Process Hacker"],
        helpfulness: "For real-time system monitoring"
    },
    {
        name: "Security Tools",
        category: "Security",
        description: "Windows Defender, Windows Firewall, User Account Control",
        tools: ["Defender", "Firewall", "UAC", "BitLocker"],
        helpfulness: "Built-in defense mechanisms"
    },
    {
        name: "Logging & Auditing",
        category: "Logging",
        description: "Configure enhanced logging for SOC operations",
        tools: ["Windows Event Forwarding", "Sysmon", "Process Tracing"],
        helpfulness: "Essential for comprehensive monitoring"
    }
];
