#!/usr/bin/env pwsh

<#
Simple helper to start the full local stack (Postgres + backend + frontend)
with a single command.
#>

$composeFiles = @(
  "docker-compose.dev.yml",
  "docker-compose.local.yml"
)

Write-Host "Starting local stack (Postgres + backend + frontend)" -ForegroundColor Cyan
Write-Host "Using compose files: $($composeFiles -join ', ')" -ForegroundColor Gray

# Clean up any manually-run leftover containers so compose starts cleanly.
Write-Host "Removing leftover manual containers (if any)..." -ForegroundColor Yellow
docker rm -f teif-backend teif-frontend 2>$null | Out-Null

# Build & start in detached mode
$cmd = "docker compose -f $($composeFiles[0]) -f $($composeFiles[1]) up --build -d"
Write-Host "Running: $cmd" -ForegroundColor Yellow
Invoke-Expression $cmd

Write-Host "\n✅ Local stack started." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "Backend:  http://localhost:4000" -ForegroundColor Green
