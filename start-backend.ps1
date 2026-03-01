#!/usr/bin/env pwsh
# Complete setup script for TEIF backend with database

Write-Host "================================"  -ForegroundColor Cyan
Write-Host "TEIF Backend Setup & Database Connection" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill existing processes
Write-Host "[1/4] Cleaning up existing processes..." -ForegroundColor Yellow
Get-Process node,tsx -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500

# Step 2: Setup port forwarding
Write-Host "[2/4] Setting up WSL→Windows port forwarding..." -ForegroundColor Yellow
$wslIP = wsl hostname -I 2>/dev/null | ForEach-Object { $_.Trim() } | Select-Object -First 1
if ($wslIP) {
    Write-Host "  WSL IP detected: $wslIP" -ForegroundColor Green
    
    # Remove old rule if exists
    netsh interface portproxy delete v4tov4 listenport=5432 listenaddress=127.0.0.1 2>&1 | Out-Null
    
    # Add new rule
    $result = netsh interface portproxy add v4tov4 listenport=5432 listenaddress=127.0.0.1 connectport=5432 connectaddress=$wslIP 2>&1
    if ($result -match "Error" -or $result -match "error") {
        Write-Host "  ⚠️  Port forwarding might already exist (that's OK)" -ForegroundColor Yellow
    } else {
        Write-Host "  ✅ Port forwarding enabled: localhost:5432 → $wslIP:5432" -ForegroundColor Green
    }
} else {
    Write-Host "  ⚠️  Could not get WSL IP" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Start PostgreSQL container
Write-Host "[3/4] Starting PostgreSQL container..." -ForegroundColor Yellow
Set-Location "C:\Users\Makseb-DEV-05\Downloads\TEIF-main"
$dockerResult = wsl -d Ubuntu-24.04 -- docker compose -f docker-compose.dev.yml up -d postgres 2>&1
if ($dockerResult -match "running" -or $dockerResult -match "Created") {
    Write-Host "  ✅ PostgreSQL container started" -ForegroundColor Green
} else {
    Write-Host "  Database startup output:" -ForegroundColor Gray
    $dockerResult | Select-Object -First 5 | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
}
Start-Sleep -Seconds 3
Write-Host ""

# Step 4: Start backend
Write-Host "[4/4] Starting backend server..." -ForegroundColor Yellow
Set-Location "C:\Users\Makseb-DEV-05\Downloads\TEIF-main\packages\backend"
Write-Host "  Command: pnpm dev" -ForegroundColor Gray
Write-Host ""
Write-Host "================================"  -ForegroundColor Cyan
Write-Host "Backend starting in 3 seconds..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:DATABASE_URL="postgresql://postgres:password@localhost:5432/teif_dev"
$env:NODE_ENV="development"
$env:FRONTEND_URL="http://localhost:5173"
$env:JWT_SECRET="local-dev-secret-key-minimum-32-characters-please"
$env:JWT_REFRESH_SECRET="local-dev-refresh-secret-key-minimum-32-characters"
$env:SIGNATURE_ENCRYPTION_KEY="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
$env:PORT="3000"

Start-Sleep -Seconds 3
pnpm dev
