Write-Host "Starting JobSync Development Environment..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend will run on: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Frontend will run on: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop both services" -ForegroundColor Red
Write-Host ""

try {
    $backendJob = Start-Job -ScriptBlock {
        Set-Location "backend"
        npm run start:dev
    } -Name "Backend"

    $frontendJob = Start-Job -ScriptBlock {
        Set-Location "frontend"
        npm run start:dev
    } -Name "Frontend"

    Write-Host "Both services are starting..." -ForegroundColor Green
    Write-Host "Backend Job ID: $($backendJob.Id)" -ForegroundColor Cyan
    Write-Host "Frontend Job ID: $($frontendJob.Id)" -ForegroundColor Cyan
    Write-Host ""

    while ($backendJob.State -eq "Running" -or $frontendJob.State -eq "Running") {
        Start-Sleep -Seconds 2
        
        if ($backendJob.State -eq "Failed") {
            Write-Host "Backend failed to start!" -ForegroundColor Red
            Receive-Job $backendJob
            break
        }
        
        if ($frontendJob.State -eq "Failed") {
            Write-Host "Frontend failed to start!" -ForegroundColor Red
            Receive-Job $frontendJob
            break
        }
    }

    Write-Host "Services stopped." -ForegroundColor Yellow
}
catch {
    Write-Host "Error starting services: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    if ($backendJob) {
        Stop-Job $backendJob -ErrorAction SilentlyContinue
        Remove-Job $backendJob -ErrorAction SilentlyContinue
    }
    if ($frontendJob) {
        Stop-Job $frontendJob -ErrorAction SilentlyContinue
        Remove-Job $frontendJob -ErrorAction SilentlyContinue
    }
} 