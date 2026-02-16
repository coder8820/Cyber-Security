const commandDatabase = [
/* NETWORK */
{category:"network", name:"ipconfig", desc:"Displays IP configuration details.", example:"ipconfig /all"},
{category:"network", name:"ping", desc:"Tests network connectivity.", example:"ping 8.8.8.8"},
{category:"network", name:"netstat", desc:"Shows active connections.", example:"netstat -ano"},
{category:"network", name:"tracert", desc:"Trace route to host.", example:"tracert google.com"},
{category:"network", name:"nslookup", desc:"DNS query tool.", example:"nslookup example.com"},
{category:"network", name:"arp", desc:"Displays ARP table.", example:"arp -a"},
{category:"network", name:"route", desc:"Displays routing table.", example:"route print"},
{category:"network", name:"pathping", desc:"Network latency analysis.", example:"pathping 8.8.8.8"},
{category:"network", name:"netsh", desc:"Network configuration tool.", example:"netsh interface show interface"},
{category:"network", name:"Get-NetTCPConnection", desc:"Shows TCP connections (PowerShell).", example:"Get-NetTCPConnection"},

/* PROCESS */
{category:"process", name:"tasklist", desc:"Lists running processes.", example:"tasklist"},
{category:"process", name:"taskkill", desc:"Terminates process.", example:"taskkill /PID 1234"},
{category:"process", name:"Get-Process", desc:"PowerShell process list.", example:"Get-Process"},
{category:"process", name:"Stop-Process", desc:"Stops a process.", example:"Stop-Process -Name notepad"},
{category:"process", name:"wmic process list", desc:"WMIC process list.", example:"wmic process list"},
{category:"process", name:"Get-WmiObject Win32_Process", desc:"Advanced process query.", example:"Get-WmiObject Win32_Process"},

/* LOGS */
{category:"logs", name:"eventvwr", desc:"Opens event viewer.", example:"eventvwr"},
{category:"logs", name:"wevtutil", desc:"Event log query tool.", example:"wevtutil qe Security"},
{category:"logs", name:"Get-EventLog", desc:"PowerShell log reader.", example:"Get-EventLog -LogName Security"},
{category:"logs", name:"Get-WinEvent", desc:"Advanced log reader.", example:"Get-WinEvent -LogName Security"},
{category:"logs", name:"auditpol", desc:"Audit policy tool.", example:"auditpol /get /category:*"},

/* SERVICES */
{category:"services", name:"sc query", desc:"Queries services.", example:"sc query"},
{category:"services", name:"sc start", desc:"Starts service.", example:"sc start spooler"},
{category:"services", name:"sc stop", desc:"Stops service.", example:"sc stop spooler"},
{category:"services", name:"Get-Service", desc:"Lists services.", example:"Get-Service"},
{category:"services", name:"Restart-Service", desc:"Restarts service.", example:"Restart-Service spooler"},
];
