# Local development build script
# Handles TypeScript + esbuild + ESM .js extension fixes

Write-Host "=== Local Development Build ===" -ForegroundColor Cyan

# Step 1: Build shared package
Write-Host "`nBuilding shared package..." -ForegroundColor Yellow
Push-Location packages/shared
npx tsc --rootDir ./src --outDir ./dist --declaration --declarationMap
if ($LASTEXITCODE -ne 0) { throw "Shared build failed" }
Pop-Location
Write-Host "OK Shared built" -ForegroundColor Green

# Step 2: Fix shared dist ESM imports
Write-Host "`nFixing ESM imports in shared..." -ForegroundColor Yellow
$sharedFiles = Get-ChildItem -Recurse -Filter "*.js" packages/shared/dist
foreach ($file in $sharedFiles) {
  $content = Get-Content $file.FullName -Raw
  $modified = $content `
    -replace "from '(\./[^/]+)'", "from '`$1.js'" `
    -replace "export \* from '(\./[^/]+)'", "export * from '`$1.js'" `
    -replace "from '(\.\./[^/]+)'", "from '`$1.js'" `
    -replace "export \* from '(\.\./[^/]+)'", "export * from '`$1.js'"
  if ($modified -ne $content) {
    Set-Content $file.FullName $modified
    Write-Host "  OK Fixed: $($file.Name)"
  }
}

# Step 3: Build backend with esbuild
Write-Host "`nBuilding backend with esbuild..." -ForegroundColor Yellow
Push-Location packages/backend
npx esbuild 'src/**/*.ts' `
  --outdir=dist `
  --platform=node `
  --format=esm `
  --target=es2022 `
  --packages=external
if ($LASTEXITCODE -ne 0) { throw "esbuild failed" }
Pop-Location
Write-Host "OK Backend compiled" -ForegroundColor Green

# Step 4: Fix backend dist ESM imports
Write-Host "`nFixing ESM imports in backend..." -ForegroundColor Yellow
$backendFiles = Get-ChildItem -Recurse -Filter "*.js" packages/backend/dist
foreach ($file in $backendFiles) {
  $content = Get-Content $file.FullName -Raw
  $modified = $content `
    -replace 'from "(\./[^"]+)"', 'from "$1.js"' `
    -replace "from '(\./[^']+)'", "from '$1.js'" `
    -replace 'from "(\.\./[^"]+)"', 'from "$1.js"' `
    -replace "from '(\.\./[^']+)'", "from '$1.js'"
  if ($modified -ne $content) {
    Set-Content $file.FullName $modified
  }
}
Write-Host "OK Backend imports fixed" -ForegroundColor Green

# Step 5: Run Prisma generate
Write-Host "`nGenerating Prisma client..." -ForegroundColor Yellow
cd packages/backend
npx prisma generate --schema=./prisma/schema.prisma
cd ../..
Write-Host "OK Prisma client generated" -ForegroundColor Green

Write-Host "`nGenerated Prisma client..." -ForegroundColor Cyan
Write-Host "  node packages/backend/dist/index.js" -ForegroundColor Gray
