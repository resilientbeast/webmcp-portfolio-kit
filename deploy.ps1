# Deploy to Google Cloud Run Helper Script

Write-Host "🚀 Starting Deployment to Google Cloud Run..." -ForegroundColor Cyan

# Check if gcloud is installed
if (!(Get-Command "gcloud" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: Google Cloud SDK (gcloud) is not installed." -ForegroundColor Red
    Write-Host "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Check login status
$account = gcloud config get-value account 2>$null
if (-not $account) {
    Write-Host "⚠️  You are not logged in. Redirecting to login..." -ForegroundColor Yellow
    gcloud auth login
}

# Get current project
$project = gcloud config get-value project 2>$null
if (-not $project -or $project -eq "") {
    Write-Host "⚠️  No project selected. Setting to provided project..." -ForegroundColor Yellow
    $projectId = "drive-project-478208"
    gcloud config set project $projectId
    $project = $projectId
}
else {
    Write-Host "✅ Using Project: $project" -ForegroundColor Green
}

# deploy
Write-Host "📦 Building and Deploying to Cloud Run..." -ForegroundColor Cyan
Write-Host "ℹ️  This may take a few minutes..."

gcloud run deploy portfolio-website `
    --source . `
    --region us-central1 `
    --allow-unauthenticated

if ($?) {
    Write-Host "✅ Deployment Complete! Your site is live." -ForegroundColor Green
}
else {
    Write-Host "❌ Deployment failed. Check the logs above." -ForegroundColor Red
}

Pause
