#!/bin/bash
# Monitor Docker build progress in WSL

echo "🔄 TEIF Backend Docker Build Monitor"
echo "======================================"
echo ""

# Check if build is running
docker_running=$(wsl -d Ubuntu-24.04 -e bash -c "ps aux | grep 'docker' | grep -v grep | wc -l" 2>/dev/null || echo "0")

if [ "$docker_running" -gt 0 ]; then
    echo "⏳ Build Status: IN PROGRESS"
    echo ""
    
    # Show Docker build output size
    wsl -d Ubuntu-24.04 -e bash -c "du -sh /tmp/backend-build.log 2>/dev/null || echo 'No log yet'" | sed 's/^/   Build log: /'
    
    # Check if backend dist folder exists (build progressing)
    wsl -d Ubuntu-24.04 -e bash -c "ls -lh ~/teif/packages/backend/dist/ 2>/dev/null | wc -l" > /tmp/dist_count.txt
    dist_count=$(cat /tmp/dist_count.txt)
    if [ "$dist_count" -gt 2 ]; then
        echo "   ✅ Backend dist folder populated (files: $dist_count)"
    else
        echo "   ⏳ Waiting for backend compilation..."
    fi
    
    echo ""
    echo "Waiting 10 seconds before checking again..."
    sleep 10
    echo ""
    exec bash "$0"  # Recursive loop
else
    echo "✅ Build Status: COMPLETED (process ended)"
    echo ""
    
    # Check if image was created
    wsl -d Ubuntu-24.04 -e bash -c "docker images | grep teif-backend" | head -1 | sed 's/^/   Image: /'
    
    if [ -f "$0" ]; then
        echo ""
        echo "📋 Next: Run verification script"
        echo "   bash /root/teif/verify-deployment.sh"
    fi
fi
