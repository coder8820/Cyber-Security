



\# Windows CMD Cheat Sheet for Cybersecurity

&nbsp;	 Students (50+ Commands)





1️⃣ System \& User Info\*\*



| Command                     | Description                              |

| ---------------------------------------------------------------- |

| `systeminfo`                 | Detailed OS, patch, RAM, and system info |

| `whoami`                     | Current logged-in user                   |

| `net user`                    | Lists all user accounts                  |

| `net user <username>`   | Shows info about a specific user         |

| `tasklist`                     | Lists all running processes              |

| `taskkill /PID <pid> /F`  | Force kills a process by PID             |

| `hostname`                  | Shows computer name                      |

| `set`                          | Lists environment variables              |



---



2️⃣ File \& Directory Operations



| Command                       | Description                             |

| ----------------------------- | --------------------------------------- |

| `dir`                               | List files/folders in current directory |

| `cd <folder>`                  | Change directory                        |

| `mkdir <folder>`              | Create new folder                       |

| `rmdir /S /Q <folder>`        | Delete folder and contents              |

| `type <file>`                     | View file contents                      |

| `copy <source> <destination>` | Copy file                               |

| `move <source> <destination>` | Move file                               |

| `del <file>`                  | Delete file                             |

| `attrib +h <file>`            | Hide file                               |

| `attrib -h <file>`            | Unhide file                             |

| `cipher /w:<drive>`           | Securely wipe deleted data              |



---



3️⃣ Networking \& Connectivity



| Command                | Description                          |                            |

| ---------------------- | ------------------------------------ | -------------------------- |

| `ipconfig`             | Show basic network info              |                            |

| `ipconfig /all`        | Detailed network info                |                            |

| `ping <host>`          | Check connectivity                   |                            |

| `tracert <host>`       | Trace route to a host                |                            |

| `netstat -ano`         | Active connections \& listening ports |                            |

| `netstat -an           | find "80"`                           | Check if port 80 is in use |

| `nslookup <domain>`    | DNS query                            |                            |

| `arp -a`               | View ARP table                       |                            |

| `route print`          | Show routing table                   |                            |

| `telnet <host> <port>` | Test connectivity (if installed)     |                            |



---



4️⃣ Security \& Permissions



| Command                              | Description                        |

| ------------------------------------ | ---------------------------------- |

| `net localgroup administrators`      | Check admin users                  |

| `whoami /priv`                       | Show current privileges            |

| `gpresult /r`                        | Display applied group policies     |

| `icacls <file>`                      | View/change file permissions       |

| `net accounts`                       | Password policy info               |

| `secedit /export /cfg secconfig.cfg` | Export security config             |

| `sc qc <service>`                    | Check service permissions \& config |



---



5️⃣ System Monitoring \& Logs



| Command                                                | Description                  |

| ------------------------------------------------------ | ---------------------------- |

| `eventvwr`                                             | Open Event Viewer GUI        |

| `wevtutil qe Security /c:20 /rd:true`                  | View last 20 security events |

| `powershell Get-EventLog -LogName Security -Newest 20` | View recent security events  |

| `schtasks /query`                                      | List scheduled tasks         |

| `wmic service list brief`                              | List all services            |

| `tasklist /v`                                          | Detailed task info           |

| `driverquery`                                          | List installed drivers       |



---



6️⃣ Advanced / Forensics \& Pentesting



| Command                              | Description                            |

| ------------------------------------ | -------------------------------------- |

| `wmic product get name,version`      | List installed software                |

| `netsh firewall show state`          | Firewall status                        |

| `netsh advfirewall show allprofiles` | Detailed firewall info                 |

| `powershell Get-Process`             | List processes in PowerShell           |

| `powershell Get-Service`             | List services in PowerShell            |

| `certutil -hashfile file.exe SHA256` | Check file hash                        |

| `fsutil fsinfo drives`               | List all drives                        |

| `fsutil file createnew file.txt 0`   | Create empty file                      |

| `handle.exe` (Sysinternals)          | Find which process uses a file/port    |

| `strings.exe <file>`                 | Extract readable strings from binaries |



---



7️⃣ Miscellaneous Useful Commands



| Command                                    | Description                   |

| ------------------------------------------ | ----------------------------- |

| `cls`                                      | Clear screen                  |

| `echo <text>`                              | Print text                    |

| `echo. > file.txt`                         | Create empty file             |

| `shutdown /s /t 0`                         | Shutdown computer immediately |

| `shutdown /r /t 0`                         | Restart computer immediately  |

| `powershell Start-Process cmd -Verb runAs` | Open admin CMD                |

| `assoc`                                    | File extension associations   |

| `ftype`                                    | File types linked to programs |

| `comp <file1> <file2>`                     | Compare two files             |

| `find /i "text" <file>`                    | Search text in a file         |



---





## &nbsp;✅ Pro Tips for Cybersecurity Students



1\. Combine commands for \*\*quick investigations\*\*:



```cmd

netstat -ano | find "443"

tasklist | find "chrome"

```



2\. Always check \*\*permissions and running processes\*\* for security auditing:



```cmd

whoami /priv

net localgroup administrators

```



3\. Use \*\*hashes for malware analysis\*\*:



```cmd

certutil -hashfile suspect.exe SHA256

```



4\. Leverage \*\*PowerShell\*\* for more advanced queries:



```powershell

Get-EventLog -LogName Security -Newest 50

Get-Process | Sort CPU -Descending

```



--- Do it yourself ---

