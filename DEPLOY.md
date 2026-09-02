# Deployment Guide: Google Cloud Run

This guide outlines the steps to deploy your portfolio website to Google Cloud Run.

## Prerequisites

1.  **Google Cloud SDK**: You need the `gcloud` CLI installed.
    *   [Download and Install](https://cloud.google.com/sdk/docs/install)
2.  **Docker Desktop**: You need Docker installed and running to build the image locally (optional if using Cloud Build, but recommended for testing).
    *   [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
3.  **Google Cloud Project**: You need an active Google Cloud project with billing enabled.

## Setup Steps

### 1. Initialize Google Cloud

Open your terminal (PowerShell) and run:

```powershell
gcloud init
```
Follow the prompts to log in and select/create your project.

### 2. Enable Required APIs

Run the following commands to enable Cloud Run and Artifact Registry:

```powershell
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 3. Configure Docker Authentication

```powershell
gcloud auth configure-docker
```

## Deployment Options

### Option A: Direct Source Deployment (Recommended & Easiest)

Google Cloud Run can build your container for you without needing local Docker.

Run this command from the `portfolio-website` directory:

```powershell
gcloud run deploy portfolio-website --source . --region us-central1 --allow-unauthenticated
```
*   `--source .`: Uploads the current directory and builds it in the cloud.
*   `--region us-central1`: You can change this to `europe-west1` (Belgium) or any other region.
*   `--allow-unauthenticated`: Makes the website public.

### Option B: Build & Push Container Manually

If you prefer more control or Option A fails:

1.  **Set Project ID variable:**
    ```powershell
    $PROJECT_ID = gcloud config get-value project
    ```

2.  **Build the image using Cloud Build:**
    ```powershell
    gcloud builds submit --tag gcr.io/$PROJECT_ID/portfolio-website
    ```

3.  **Deploy to Cloud Run:**
    ```powershell
    gcloud run deploy portfolio-website --image gcr.io/$PROJECT_ID/portfolio-website --platform managed --region us-central1 --allow-unauthenticated
    ```

## Troubleshooting

*   **Permissions**: Ensure your account has the `Cloud Run Admin` and `Service Account User` roles.
*   **Billing**: Ensure billing is enabled for your project.
*   **Failed Build**: If the build fails, check the logs link provided in the terminal.
