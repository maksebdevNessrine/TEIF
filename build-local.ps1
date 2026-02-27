# Local development build script
# Handles TypeScript + esbuild + ESM .js extension fixes

Write-Host "=== Local Development Build ===" -ForegroundColor Cyan

# Step 1: Build shared package
Write-Host "`nBuilding shared package..." -ForegroundColor Yellow
Push-Location packages/shared
rm -r dist -ErrorAction SilentlyContinue
npx esbuild 'src/**/*.ts' --outdir=dist --platform=neutral --format=esm --target=es2022
if ($LASTEXITCODE -ne 0) { throw "esbuild failed for shared" }
Pop-Location
Write-Host "OK Shared built" -ForegroundColor Green

# Step 2: Fix shared dist ESM imports - ALL relative imports need .js
Write-Host "`nFixing ESM imports in shared..." -ForegroundColor Yellow
$sharedFiles = Get-ChildItem -Recurse -Filter "*.js" packages/shared/dist
$fixedCount = 0
foreach ($file in $sharedFiles) {
  $content = Get-Content $file.FullName -Raw
  # Add .js to ALL relative imports (., ../) that don't already have it
  $modified = $content `
    -replace 'from "(\./[^"]+)(?<!\.js)"', 'from "$1.js"' `
    -replace "from '(\./[^']+)(?<!\.js)'", "from '$1.js'" `
    -replace 'from "(\.\./[^"]+)(?<!\.js)"', 'from "$1.js"' `
    -replace "from '(\.\./[^']+)(?<!\.js)'", "from '$1.js'" `
    -replace 'export \* from "(\./[^"]+)(?<!\.js)"', 'export * from "$1.js"' `
    -replace "export \* from '(\./[^']+)(?<!\.js)'", "export * from '$1.js'" `
    -replace 'export \* from "(\.\./[^"]+)(?<!\.js)"', 'export * from "$1.js"' `
    -replace "export \* from '(\.\./[^']+)(?<!\.js)'", "export * from '$1.js'"
  if ($modified -ne $content) {
    Set-Content $file.FullName $modified
    $fixedCount++
  }
}
Write-Host "OK Fixed $fixedCount files" -ForegroundColor Green

# Step 3: Build backend with esbuild
Write-Host "`nBuilding backend with esbuild..." -ForegroundColor Yellow
Push-Location packages/backend
rm -r dist -ErrorAction SilentlyContinue
npx esbuild 'src/**/*.ts' `
  --outdir=dist `
  --platform=node `
  --format=esm `
  --target=es2022 `
  --packages=external
if ($LASTEXITCODE -ne 0) { throw "esbuild failed for backend" }
Pop-Location
Write-Host "OK Backend compiled" -ForegroundColor Green

# Step 4: Fix backend dist ESM imports
Write-Host "`nFixing ESM imports in backend..." -ForegroundColor Yellow
$backendFiles = Get-ChildItem -Recurse -Filter "*.js" packages/backend/dist
$fixedCount = 0
foreach ($file in $backendFiles) {
  $content = Get-Content $file.FullName -Raw
  $modified = $content `
    -replace 'from "(\./[^"]+)(?<!\.js)"', 'from "$1.js"' `
    -replace "from '(\./[^']+)(?<!\.js)'", "from '$1.js'" `
    -replace 'from "(\.\./[^"]+)(?<!\.js)"', 'from "$1.js"' `
    -replace "from '(\.\./[^']+)(?<!\.js)'", "from '$1.js'"
  if ($modified -ne $content) {
    Set-Content $file.FullName $modified
    $fixedCount++
  }
}
Write-Host "OK Fixed $fixedCount files" -ForegroundColor Green

# Step 5: Run Prisma generate
Write-Host "`nGenerating Prisma client..." -ForegroundColor Yellow
cd packages/backend
npx prisma generate --schema=./prisma/schema.prisma
cd ../..
Write-Host "OK Prisma client generated" -ForegroundColor Green

# Step 6: Install shared in node_modules for local resolution
Write-Host "`nInstalling @teif/shared in node_modules..." -ForegroundColor Yellow
New-Item -ItemType Directory "node_modules/@teif" -Force -ErrorAction SilentlyContinue | Out-Null
Remove-Item "node_modules/@teif/shared" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path "packages/shared" -Destination "node_modules/@teif/shared" -Recurse
Write-Host "OK @teif/shared installed" -ForegroundColor Green

Write-Host "`nGenerated Prisma client..." -ForegroundColor Cyan
Write-Host "  node packages/backend/dist/index.js" -ForegroundColor Gray
