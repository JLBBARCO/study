# run.ps1 - Install project dependencies on Windows

# Install required tools using winget. This includes Python, Java JDK, Node.js and WinLibs (C/C++ compiler).
# Ensure winget is available on your system.

# Install Python 3.12 (or latest)
winget install -e --id Python.Python.3.12
# Install OpenJDK 21
winget install -e --id OpenJDK.OpenJDK.21
# Install Node.js (latest LTS)
winget install -e --id OpenJS.NodeJS
# Install WinLibs which provides gcc/clang for C/C++ compilation
winget install -e --id WinLibs.WinLibs

# Refresh the PATH for the current session (might require restarting the shell for full effect)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Create a Python virtual environment and activate it
python -m venv .venv
& .venv\Scripts\Activate.ps1

# Upgrade pip and install Python requirements safely via the module interface (avoids Windows Defender false positives)
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# Install Node.js dependencies
npm install

Write-Host "All dependencies installed successfully."
