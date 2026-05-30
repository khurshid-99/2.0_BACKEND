# =============================================================
#  deploy.ps1 - One-Click Deploy for Kubernetes (Kind Cluster)
# =============================================================
#  Run this script every time you:
#    1. Recreate / restart the Kubernetes cluster
#    2. Change your application code
#
#  Usage:  .\deploy.ps1
# =============================================================

$ErrorActionPreference = "Stop"

# --- Configuration ---
$NODE_NAME       = "desktop-control-plane"
$IMAGE_NAME      = "cohort_express_2"
$IMAGE_TAG       = "latest"
$FULL_IMAGE      = "${IMAGE_NAME}:${IMAGE_TAG}"
$TAR_FILE        = "${IMAGE_NAME}.tar"
$DOCKERFILE_DIR  = "Backend\mainServer"
$K8S_DIR         = "Backend\k8s"

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Kubernetes Deploy Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# --- Step 1: Build Docker Image ---
Write-Host "[1/5] Building Docker image: $FULL_IMAGE ..." -ForegroundColor Yellow
docker build -t $FULL_IMAGE -f "$DOCKERFILE_DIR\dockerfile" $DOCKERFILE_DIR
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: Docker build failed!" -ForegroundColor Red; exit 1 }
Write-Host "      Done!" -ForegroundColor Green

# --- Step 2: Save image to tar ---
Write-Host "[2/5] Saving image to $TAR_FILE ..." -ForegroundColor Yellow
docker save $FULL_IMAGE -o $TAR_FILE
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: Docker save failed!" -ForegroundColor Red; exit 1 }
Write-Host "      Done!" -ForegroundColor Green

# --- Step 3: Copy tar into cluster node ---
Write-Host "[3/5] Copying image into cluster node ($NODE_NAME) ..." -ForegroundColor Yellow
docker cp $TAR_FILE "${NODE_NAME}:/${TAR_FILE}"
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: docker cp failed!" -ForegroundColor Red; exit 1 }
Write-Host "      Done!" -ForegroundColor Green

# --- Step 4: Import image into containerd ---
Write-Host "[4/5] Importing image into containerd (k8s.io namespace) ..." -ForegroundColor Yellow
docker exec $NODE_NAME ctr --namespace k8s.io images import "/$TAR_FILE"
if ($LASTEXITCODE -ne 0) { Write-Host "FAILED: containerd import failed!" -ForegroundColor Red; exit 1 }
Write-Host "      Done!" -ForegroundColor Green

# --- Cleanup tar files ---
Write-Host "      Cleaning up temporary files ..." -ForegroundColor Gray
docker exec $NODE_NAME rm -f "/$TAR_FILE" 2>$null
Remove-Item $TAR_FILE -ErrorAction SilentlyContinue

# --- Step 5: Apply Kubernetes manifests ---
Write-Host "[5/5] Applying Kubernetes manifests ..." -ForegroundColor Yellow
kubectl apply -f "$K8S_DIR\deployment.yml"
kubectl apply -f "$K8S_DIR\service.yml"
kubectl apply -f "$K8S_DIR\ingress.yml"
Write-Host "      Done!" -ForegroundColor Green

# --- Restart deployment to pick up fresh image ---
Write-Host ""
Write-Host "      Restarting deployment ..." -ForegroundColor Yellow
kubectl rollout restart deployment mani-server
Write-Host ""

# --- Wait and show status ---
Write-Host "      Waiting for pods to be ready ..." -ForegroundColor Yellow
kubectl rollout status deployment mani-server --timeout=60s

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
kubectl get pods -l app=main-server
Write-Host ""
