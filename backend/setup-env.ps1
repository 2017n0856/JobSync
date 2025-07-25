# Setup Environment Variables Script
# This script creates a .env file from the template

Write-Host "🔧 Setting up environment variables..." -ForegroundColor Green

# Check if .env already exists
if (Test-Path ".env") {
    Write-Host "⚠️  .env file already exists. Do you want to overwrite it? (y/n)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "❌ Setup cancelled." -ForegroundColor Red
        exit 0
    }
}

# Copy env.config to .env
if (Test-Path "env.config") {
    Copy-Item "env.config" ".env"
    Write-Host "✅ .env file created successfully!" -ForegroundColor Green
    Write-Host "📝 Please review and update the database credentials in .env if needed." -ForegroundColor Cyan
} else {
    Write-Host "❌ env.config template not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Environment Variables Set:" -ForegroundColor White
Write-Host "   DATABASE_HOST=localhost" -ForegroundColor Gray
Write-Host "   DATABASE_PORT=5432" -ForegroundColor Gray
Write-Host "   DATABASE_USER=postgres" -ForegroundColor Gray
Write-Host "   DATABASE_PASSWORD=root" -ForegroundColor Gray
Write-Host "   DATABASE_NAME=jobsync" -ForegroundColor Gray
Write-Host "   PORT=3000" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Green
Write-Host "   1. Update database credentials in .env if needed" -ForegroundColor White
Write-Host "   2. Run: npm run db:setup-with-data" -ForegroundColor White
Write-Host "   3. Run: npm run start:dev" -ForegroundColor White 