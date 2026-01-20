# Start PostgreSQL container for local development
# This script waits for Docker to be available before starting the container

Write-Host "🐳 Starting PostgreSQL container for local development..." -ForegroundColor Cyan

# Wait for Docker daemon to be available
$maxAttempts = 30
$attempt = 0

do {
    try {
        docker version --format '{{.Server.Version}}' | Out-Null
        Write-Host "✅ Docker daemon is available" -ForegroundColor Green
        break
    }
    catch {
        $attempt++
        if ($attempt -ge $maxAttempts) {
            Write-Host "❌ Docker daemon not responding after $maxAttempts attempts" -ForegroundColor Red
            Write-Host "   Please start Docker Desktop manually" -ForegroundColor Yellow
            exit 1
        }
        Write-Host "⏳ Waiting for Docker daemon... (attempt $attempt/$maxAttempts)" -ForegroundColor Yellow
        Start-Sleep 2
    }
}

# Start the PostgreSQL container
Write-Host "📦 Starting PostgreSQL 16-alpine container..." -ForegroundColor Cyan

docker-compose -f docker-compose.production.yml up -d postgres

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PostgreSQL container started" -ForegroundColor Green
    Start-Sleep 5
    
    # Check if container is healthy
    $status = docker ps --filter "name=teif-postgres" --format "{{.Status}}"
    Write-Host "   Status: $status" -ForegroundColor Green
    
    # Test connection
    Write-Host ""
    Write-Host "🔗 Testing database connection..." -ForegroundColor Cyan
    
    $testAttempts = 0
    do {
        try {
            docker exec teif-postgres pg_isready -U teif_user -d teif | Out-Null
            Write-Host "✅ Database is ready and accepting connections" -ForegroundColor Green
            break
        }
        catch {
            $testAttempts++
            if ($testAttempts -le 10) {
                Write-Host "⏳ Waiting for database to be ready... (attempt $testAttempts/10)" -ForegroundColor Yellow
                Start-Sleep 2
            }
            else {
                Write-Host "⚠️  Database startup is taking longer than expected" -ForegroundColor Yellow
                break
            }
        }
    } while ($testAttempts -lt 10)
    
    Write-Host ""
    Write-Host "📊 Container status:" -ForegroundColor Cyan
    docker ps --filter "name=teif-postgres"
    
    Write-Host ""
    Write-Host "✨ PostgreSQL is ready for local development!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Backend should now connect to the database." -ForegroundColor Cyan
    Write-Host "Check backend logs with: docker logs teif-postgres" -ForegroundColor Gray
}
else {
    Write-Host "❌ Failed to start PostgreSQL container" -ForegroundColor Red
    exit 1
}
