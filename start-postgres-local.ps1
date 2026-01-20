#!/usr/bin/env pwsh

# PostgreSQL Local Container Starter
# Run: .\start-postgres-local.ps1

$containerName = "teif-postgres"

Write-Host "🐳 PostgreSQL Local Setup" -ForegroundColor Cyan
Write-Host ""

# Check Docker is running
Write-Host "Checking Docker..." -ForegroundColor Yellow
try {
    $null = docker ps
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if container already exists
$existing = docker ps -a --filter "name=$containerName" --format "{{.Names}}"
if ($existing) {
    Write-Host "📦 Container '$containerName' already exists" -ForegroundColor Yellow
    $status = docker ps -a --filter "name=$containerName" --format "{{.Status}}"
    
    if ($status -like "Up*") {
        Write-Host "   Status: Running ✅" -ForegroundColor Green
        Write-Host ""
        Write-Host "Database is already running at localhost:5432" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "   Status: Stopped" -ForegroundColor Yellow
        Write-Host "   Starting container..." -ForegroundColor Cyan
        docker start $containerName
        Start-Sleep 5
    }
} else {
    Write-Host "Creating new PostgreSQL container..." -ForegroundColor Cyan
    
    docker run -d `
      --name $containerName `
      -e POSTGRES_DB=teif `
      -e POSTGRES_USER=teif_user `
      -e POSTGRES_PASSWORD=postgres `
      -p 5432:5432 `
      --health-cmd="pg_isready -U teif_user -d teif" `
      --health-interval=10s `
      --health-timeout=5s `
      --health-retries=5 `
      --health-start-period=40s `
      postgres:16-alpine
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to create container" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Container created" -ForegroundColor Green
    Write-Host "   Waiting for database to be ready..." -ForegroundColor Yellow
    Start-Sleep 10
}

# Verify container is running
$running = docker ps --filter "name=$containerName" --format "{{.Names}}"
if ($running) {
    Write-Host "✅ PostgreSQL is running" -ForegroundColor Green
} else {
    Write-Host "❌ Container is not running" -ForegroundColor Red
    docker logs $containerName
    exit 1
}

# Show status
Write-Host ""
Write-Host "📊 Container Status:" -ForegroundColor Cyan
docker ps --filter "name=$containerName" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Test connection
Write-Host ""
Write-Host "Testing database connection..." -ForegroundColor Yellow
for ($i = 1; $i -le 5; $i++) {
    try {
        $ready = docker exec $containerName pg_isready -U teif_user -d teif
        if ($ready -like "*accepting*") {
            Write-Host "✅ Database is ready" -ForegroundColor Green
            break
        }
    } catch {
        if ($i -lt 5) {
            Write-Host "   Attempt $i/5: Waiting..." -ForegroundColor Gray
            Start-Sleep 2
        }
    }
}

Write-Host ""
Write-Host "🎉 PostgreSQL is ready for local development!" -ForegroundColor Green
Write-Host ""
Write-Host "Connection details:" -ForegroundColor Cyan
Write-Host "  Host: localhost" -ForegroundColor Gray
Write-Host "  Port: 5432" -ForegroundColor Gray
Write-Host "  Database: teif" -ForegroundColor Gray
Write-Host "  User: teif_user" -ForegroundColor Gray
Write-Host "  Password: postgres" -ForegroundColor Gray
Write-Host ""
Write-Host "Your backend should now connect automatically 🚀" -ForegroundColor Green
