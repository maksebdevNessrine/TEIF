# Port forwarding script for WSL Docker to Windows
# This forwards WSL port 5432 to Windows localhost:5432

Write-Host "Setting up port forwarding from WSL to Windows localhost..."

# Get WSL IP address
$wslIP = (wsl hostname -I).Trim().Split()[0]
Write-Host "WSL IP Address: $wslIP"

# Remove any existing rule
Remove-NetFirewallRule -DisplayName "WSL-PostgreSQL" -ErrorAction SilentlyContinue

# Create new firewall rule
New-NetFirewallRule -DisplayName "WSL-PostgreSQL" `
    -Direction Inbound `
    -Action Allow `
    -Protocol TCP `
    -LocalPort 5432 `
    -ErrorAction SilentlyContinue

# Add port proxy rule to forward localhost:5432 to WSL IP
netsh interface portproxy add v4tov4 listenport=5432 listenaddress=127.0.0.1 connectport=5432 connectaddress=$wslIP

Write-Host "✅ Port forwarding enabled!"
Write-Host "PostgreSQL should now be accessible at localhost:5432 from Windows"
Write-Host ""
Write-Host "To remove port forwarding later, run:"
Write-Host "  netsh interface portproxy delete v4tov4 listenport=5432 listenaddress=127.0.0.1"
