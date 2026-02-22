# Local PostgreSQL Setup - Quick Start

## Situation

Your backend and frontend are both running locally:
- **Frontend**: http://localhost:5173 ✅
- **Backend**: http://localhost:3000 ✅ (retrying DB connection every 5 seconds)
- **Database**: localhost:5432 ❌ (Not yet running)

## What You Need to Do

### Step 1: Ensure Docker Desktop is Running

Docker Desktop should be running. Look for the Docker icon in your system tray (bottom right).

If not running:
- Click on Docker Desktop in your Start Menu
- Wait 30-60 seconds for it to fully start

### Step 2: Start the PostgreSQL Container

Open **PowerShell** and run:

```powershell
cd "C:\Users\Makseb-DEV-05\Downloads\TEIF-main"

docker run -d `
  --name teif-postgres `
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
```

### Step 3: Verify Container is Running

```powershell
docker ps
```

You should see output like:
```
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS
abc1234d5e6f   postgres:16-alpine   "docker-entrypoint.s…"   10 seconds ago  Up 8 seconds (healthy)
```

### Step 4: Check Backend Connection

Your backend logs should change from:
```
⚠️ Database connection failed, will retry
```

To:
```
✅ Database connected successfully
```

### Step 5: Test Health Endpoint

Open browser or run:
```powershell
curl http://localhost:3000/api/health
```

You should get:
```json
{
  "status": "ok",
  "timestamp": 1234567890
}
```

---

## If Container Won't Start

### Option A: Check Docker is Running

```powershell
docker info
```

If you get an error, Docker Desktop is not running. Start it from the Start Menu.

### Option B: Container Already Exists

If you get an error like "name is already in use", stop and remove it:

```powershell
docker stop teif-postgres
docker rm teif-postgres
```

Then try the `docker run` command again.

### Option C: Check Logs

```powershell
docker logs teif-postgres
```

---

## After PostgreSQL Starts

Your full local stack will be ready:

```
Frontend (Vite)  → http://localhost:5173
    ↓
Backend (Hono)   → http://localhost:3000
    ↓
Database (PostgreSQL) → localhost:5432
```

You can now:
- ✅ Use the frontend with live backend
- ✅ Test API endpoints
- ✅ Develop and debug locally
- ✅ Prepare for VPS deployment

---

## Stopping the Database

To stop PostgreSQL without deleting data:

```powershell
docker stop teif-postgres
```

To start it again:

```powershell
docker start teif-postgres
```

To completely remove it:

```powershell
docker stop teif-postgres
docker rm teif-postgres
```

---

## Environment Variables

The container uses these credentials (set in your `.env` file):
- **Database Name**: `teif`
- **Username**: `teif_user`
- **Password**: `postgres`
- **Host**: `localhost`
- **Port**: `5432`

Your backend's `.env` file already has the correct connection string:
```
DATABASE_URL=postgresql://teif_user:postgres@localhost:5432/teif?schema=public
```

---

## Next Steps After DB is Running

1. ✅ Verify backend connects to database (check logs)
2. ✅ Test API endpoints work
3. ✅ Deploy to VPS with full stack
