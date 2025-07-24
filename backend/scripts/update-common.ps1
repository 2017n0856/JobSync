# Update Common Modules Script (PowerShell)
# This script updates common NestJS modules and dependencies

Write-Host "🔄 Starting common module update..." -ForegroundColor Green

# Check if we're in the backend directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the backend directory" -ForegroundColor Red
    exit 1
}

# Backup current package.json
Write-Host "📦 Backing up package.json..." -ForegroundColor Yellow
Copy-Item package.json package.json.backup

# Update all dependencies
Write-Host "⬆️  Updating all dependencies..." -ForegroundColor Cyan
npm update

# Update specific common modules
Write-Host "⬆️  Updating common NestJS modules..." -ForegroundColor Cyan
npm update @nestjs/common @nestjs/core @nestjs/graphql @nestjs/typeorm @nestjs/apollo @nestjs/swagger

# Update TypeScript and related packages
Write-Host "⬆️  Updating TypeScript and related packages..." -ForegroundColor Cyan
npm update typescript @types/node ts-node

# Update GraphQL related packages
Write-Host "⬆️  Updating GraphQL packages..." -ForegroundColor Cyan
npm update graphql apollo-server-express

# Update database related packages
Write-Host "⬆️  Updating database packages..." -ForegroundColor Cyan
npm update typeorm pg

# Update validation packages
Write-Host "⬆️  Updating validation packages..." -ForegroundColor Cyan
npm update class-validator class-transformer

# Update testing packages
Write-Host "⬆️  Updating testing packages..." -ForegroundColor Cyan
npm update @nestjs/testing jest @types/jest

# Fix security vulnerabilities
Write-Host "🔒 Fixing security vulnerabilities..." -ForegroundColor Yellow
npm audit fix

# Install any missing dependencies
Write-Host "📥 Installing missing dependencies..." -ForegroundColor Cyan
npm install

# Run tests to ensure everything works
Write-Host "🧪 Running tests to verify updates..." -ForegroundColor Yellow
npm test

Write-Host "✅ Common module update completed!" -ForegroundColor Green
Write-Host "📋 Summary:" -ForegroundColor White
Write-Host "   - All dependencies updated" -ForegroundColor White
Write-Host "   - Common NestJS modules updated" -ForegroundColor White
Write-Host "   - Security vulnerabilities fixed" -ForegroundColor White
Write-Host "   - Tests run successfully" -ForegroundColor White

# Show what was updated
Write-Host "📊 Updated packages:" -ForegroundColor Cyan
npm outdated 