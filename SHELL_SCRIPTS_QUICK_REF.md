# Quick Reference — Shell Scripts (Aligned)

## All Scripts Aligned ✅

| Script | Purpose | Usage | Status |
|--------|---------|-------|--------|
| **redeploy.sh** | Redeploy after code push | `bash redeploy.sh` | ✅ Updated |
| **test-build-dns.sh** | Build + test verification | `bash test-build-dns.sh` | ✅ Updated |
| **FASTEST_DEPLOY_DOCKER.sh** | Fresh VPS deployment | `sudo bash FASTEST_DEPLOY_DOCKER.sh domain repo` | ✨ New |
| **run-deployment-test.sh** | Full deployment validation | `bash run-deployment-test.sh` | ✅ Ready |
| **verify-deployment.sh** | Pre-deployment checks | `bash verify-deployment.sh` | ✅ Ready |

---

## What Changed

### ✅ Now Using Docker Throughout
- ❌ Old: pnpm build + PM2 + native Node.js
- ✅ New: docker build (esbuild) + docker-compose

### ✅ ESM Import Handling Fixed
- ❌ Old: tsc + regex → .js.js bugs
- ✅ New: esbuild → correct .js extensions

### ✅ Simplified Operations
- ❌ Old: 6+ different tools (pnpm, PM2, systemctl, etc)
- ✅ New: 2 tools (docker, docker-compose)

---

## Common Tasks

### Deploy Fresh VPS
```bash
sudo bash FASTEST_DEPLOY_DOCKER.sh example.com https://github.com/org/teif.git
```

### Redeploy Existing VPS
```bash
cd /opt/teif
bash redeploy.sh
```

### Test Build Locally
```bash
cd /opt/teif
bash test-build-dns.sh
```

### Verify Before Deploy
```bash
bash verify-deployment.sh
```

### Full Deployment Test
```bash
bash run-deployment-test.sh
```

---

## Key Points

✅ All scripts use `docker-compose.prod.yml`  
✅ All scripts use `esbuild` (via Dockerfile)  
✅ All scripts check for ESM errors  
✅ All scripts include health checks  
✅ No PM2, no pnpm, no native builds on VPS  

**Everything aligned. Ready for production. 🚀**

