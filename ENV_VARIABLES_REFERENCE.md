# TEIF Environment Variables Reference

**Complete reference for all configuration options used in TEIF deployment.**

---

## Quick Reference Table

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `POSTGRES_USER` | ✅ Yes | `postgres` | Database user |
| `POSTGRES_PASSWORD` | ✅ Yes | `SecurePass123!` | Database password (32+ chars) |
| `POSTGRES_DB` | ✅ Yes | `teif_prod` | Database name |
| `DATABASE_URL` | ✅ Yes | `postgresql://...@postgres:5432/teif_prod` | Full connection string |
| `NODE_ENV` | ✅ Yes | `production` | Environment mode |
| `JWT_SECRET` | ✅ Yes | `abcd1234...` (32+ chars) | Secret for signing JWT tokens |
| `JWT_EXPIRY` | ⏳ Optional | `3600` | Token expiry in seconds |
| `SITE_URL` | ✅ Yes | `https://yourdomain.com` | Frontend URL for email links |
| `CORS_ORIGIN` | ✅ Yes | `https://yourdomain.com` | Frontend domain for CORS |
| `SMTP_HOST` | ✅ Yes | `smtp.gmail.com` | SMTP server address |
| `SMTP_PORT` | ✅ Yes | `587` | SMTP port |
| `SMTP_USER` | ✅ Yes | `your-email@gmail.com` | SMTP username |
| `SMTP_PASSWORD` | ✅ Yes | `abcd efgh ijkl mnop` | SMTP password |
| `SMTP_FROM` | ✅ Yes | `noreply@yourdomain.com` | Email sender address |
| `VITE_API_BASE_URL` | ✅ Yes | `https://yourdomain.com/api` | Backend API URL |
| `VITE_APP_NAME` | ⏳ Optional | `TEIF` | Application name for UI |
| `GEMINI_API_KEY` | ⏳ Optional | `AIzaSy...` | Google Gemini API key |
| `LOG_LEVEL` | ⏳ Optional | `info` | Log level (error/warn/info/debug) |

---

## Database Environment Variables
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-32-character-random-secret-here-change-this

# JWT expiration time in seconds (default: 3600 = 1 hour)
JWT_EXPIRY=3600

# Site URL (used for email verification links, password reset, etc.)
SITE_URL=https://yourdomain.com

# Allowed CORS origin (should match frontend domain)
CORS_ORIGIN=https://yourdomain.com
```

### Email Configuration (SMTP)

#### Using Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
# Generate app-specific password at https://myaccount.google.com/apppasswords
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
SMTP_FROM=noreply@yourdomain.com
```

#### Using SendGrid:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.your-sendgrid-api-key
SMTP_FROM=noreply@yourdomain.com
```

#### Using Amazon SES:
```env
SMTP_HOST=email-smtp.region.amazonaws.com
SMTP_PORT=587
SMTP_USER=AKIA...
SMTP_PASSWORD=your-ses-password
SMTP_FROM=noreply@yourdomain.com
```

### AI Features (Optional)

```env
# Google Gemini API key (optional, for AI features)
GEMINI_API_KEY=your-gemini-api-key-here
```

### Example Production Backend .env

```env
# Database
DATABASE_URL="postgresql://postgres:super-secure-password-32chars-min@teif-postgres:5432/teif_prod"

# Server
PORT=3000
NODE_ENV=production

# Security
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
JWT_EXPIRY=3600

# Application URLs
SITE_URL=https://teif.yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-app@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
SMTP_FROM=noreply@yourdomain.com

# Optional
GEMINI_API_KEY=AIza...
```

---

## Frontend Environment Variables

### API Configuration

```env
# Backend API base URL (with /api path)
# Examples:
#   https://yourdomain.com/api
#   https://api.yourdomain.com/api
#   http://localhost:3000/api
VITE_API_BASE_URL=https://yourdomain.com/api
```

### AI Features (Optional)

```env
# Google Gemini API key (optional, for AI features)
GEMINI_API_KEY=your-gemini-api-key-here
```

### Example Production Frontend .env

```env
# API Configuration
VITE_API_BASE_URL=https://teif.yourdomain.com/api

# Optional AI
GEMINI_API_KEY=AIza...
```

---

## Coolify-Specific Settings

When setting environment variables in Coolify:

1. Go to Service → Environment Variables
2. Add each variable separately
3. Click Save
4. Redeploy the service

**Backend Service Variables:**
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://postgres:password@teif-postgres:5432/teif_prod
JWT_SECRET=your-secret
JWT_EXPIRY=3600
SITE_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@yourdomain.com
```

**Frontend Service Variables:**
```
VITE_API_BASE_URL=https://yourdomain.com/api
```

---

## How to Generate Secure Secrets

### JWT Secret (32+ characters):
```bash
# On your local machine or server terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output example:
# a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f

# Or using OpenSSL:
openssl rand -hex 32
```

### Database Password (20+ characters):
```bash
# Generate strong database password:
openssl rand -base64 20

# Output example:
# Lx+KmN9p7qR2sT4uV5wX6y8z
```

### POSTGRES_PASSWORD (for docker-compose):
```bash
# Same as DATABASE_URL password above
POSTGRES_PASSWORD=Lx+KmN9p7qR2sT4uV5wX6y8z
```

---

## Database Connection String Formats

### Local Development:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

### Docker Compose (services on same network):
```env
DATABASE_URL="postgresql://postgres:password@teif-postgres:5432/teif_prod"
```

### Coolify/Remote Server:
```env
DATABASE_URL="postgresql://postgres:password@teif-postgres:5432/teif_prod"
# or if using separate database server
DATABASE_URL="postgresql://postgres:password@db.example.com:5432/teif_prod"
```

### External Hosted Database (Supabase, Railway, etc.):
```env
DATABASE_URL="postgresql://user:password@db.example.com:5432/database?sslmode=require"
```

---

## Email Provider Configuration

### Gmail (Recommended for small projects)

1. Enable 2FA: https://myaccount.google.com/security
2. Generate app password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in `SMTP_PASSWORD`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
SMTP_FROM=your-email@gmail.com
```

### SendGrid (Recommended for production)

1. Create account at https://sendgrid.com
2. Create API key
3. Add sender domain verification

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.your-full-api-key-including-SG-prefix
SMTP_FROM=noreply@yourdomain.com
```

### AWS SES

1. Configure in AWS SES console
2. Verify sender email/domain
3. Create SMTP credentials

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=AKIA...
SMTP_PASSWORD=your-ses-password
SMTP_FROM=verified-email@yourdomain.com
```

### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@yourdomain.com
SMTP_PASSWORD=your-mailgun-password
SMTP_FROM=noreply@yourdomain.com
```

---

## Environment Variable Validation Checklist

Before deploying, ensure:

### Required Backend Variables
- [ ] `DATABASE_URL` - Valid PostgreSQL connection string
- [ ] `JWT_SECRET` - 32+ character random string
- [ ] `SITE_URL` - Your production domain
- [ ] `CORS_ORIGIN` - Frontend domain
- [ ] `SMTP_HOST` - Valid SMTP server
- [ ] `SMTP_PORT` - 587 (TLS) or 465 (SSL)
- [ ] `SMTP_USER` - Email account
- [ ] `SMTP_PASSWORD` - Email password or app-specific password
- [ ] `SMTP_FROM` - Sender email address

### Required Frontend Variables
- [ ] `VITE_API_BASE_URL` - Points to backend API endpoint

### Optional Variables
- [ ] `GEMINI_API_KEY` - Only if using AI features
- [ ] `PORT` - Defaults to 3000 if not set
- [ ] `JWT_EXPIRY` - Defaults to 3600 if not set

---

## Testing Variable Configuration

### Test Backend Connection:
```bash
# After setting DATABASE_URL, run in backend container:
psql $DATABASE_URL -c "SELECT 1"
# Should return: 1
```

### Test Email Configuration:
```bash
# Send test email from backend:
curl -X POST http://localhost:3000/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com"}'
```

### Test API Health:
```bash
curl https://yourdomain.com/api/health
# Should return: {"status":"ok","timestamp":"...","environment":"production"}
```

---

## Security Best Practices

1. **Never commit .env files** - Use `.env.example` as template
2. **Use strong secrets** - Minimum 32 characters for JWT_SECRET
3. **Rotate secrets regularly** - Change JWT_SECRET every 90 days
4. **Use environment-specific values** - Different secrets for dev/staging/prod
5. **Restrict CORS_ORIGIN** - Only allow your domain
6. **Use HTTPS** - Ensure SITE_URL uses `https://`
7. **Store secrets securely** - Use Coolify's secure environment variables
8. **Never log secrets** - Backend logs should never contain secrets
9. **Use app-specific passwords** - For email providers (Gmail app passwords)
10. **Audit access** - Review who has access to secrets

---

## Troubleshooting Environment Variables

### Backend won't start - "DATABASE_URL is required"
- Ensure `DATABASE_URL` is set in Coolify environment
- Verify PostgreSQL service is running
- Check connection string format is valid

### Frontend shows API errors
- Verify `VITE_API_BASE_URL` is set
- Ensure it includes `/api` at the end
- Check CORS is properly configured in backend

### Email verification not working
- Verify SMTP credentials are correct
- Test with `telnet smtp.gmail.com 587`
- Check email provider allows outbound connections
- Review backend logs for SMTP errors

### JWT authentication fails
- Ensure `JWT_SECRET` is same on all backend instances
- Verify `JWT_EXPIRY` is not too short
- Check system clock is synchronized

---

## Quick Reference

| Variable | Backend | Frontend | Required | Sensitive |
|----------|---------|----------|----------|-----------|
| DATABASE_URL | ✅ | ❌ | ✅ | ✅ |
| JWT_SECRET | ✅ | ❌ | ✅ | ✅ |
| JWT_EXPIRY | ✅ | ❌ | ❌ | ❌ |
| SMTP_HOST | ✅ | ❌ | ✅ | ❌ |
| SMTP_PORT | ✅ | ❌ | ✅ | ❌ |
| SMTP_USER | ✅ | ❌ | ✅ | ✅ |
| SMTP_PASSWORD | ✅ | ❌ | ✅ | ✅ |
| SMTP_FROM | ✅ | ❌ | ✅ | ❌ |
| SITE_URL | ✅ | ❌ | ✅ | ❌ |
| CORS_ORIGIN | ✅ | ❌ | ✅ | ❌ |
| PORT | ✅ | ❌ | ❌ | ❌ |
| NODE_ENV | ✅ | ❌ | ✅ | ❌ |
| VITE_API_BASE_URL | ❌ | ✅ | ✅ | ❌ |
| GEMINI_API_KEY | ✅ | ✅ | ❌ | ✅ |

---

Last Updated: January 17, 2026
