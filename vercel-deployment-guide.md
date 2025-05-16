# Deploying the Weather Dashboard to Vercel (macOS Guide)

This guide will walk you through the process of deploying your Weather Dashboard project to Vercel from a macOS system.

## Prerequisites

1. A GitHub account
2. A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)
3. Your Weather Dashboard project code ready in the "377 final project" folder
4. Git installed on your Mac (comes pre-installed on most macOS systems)
5. Node.js and npm installed (required for Vercel CLI if using that option)

## Step 1: Push Your Project to GitHub

1. Create a new repository on GitHub:
   - Go to [github.com](https://github.com) and log in
   - Click the "+" icon in the top-right corner and select "New repository"
   - Name your repository (e.g., "weather-dashboard")
   - Choose public or private visibility
   - Click "Create repository"

2. Initialize Git in your project folder (if not already done):
   ```bash
   cd /Users/naveedsiddiqui/Desktop/377/377\ final\ project
   git init
   ```
   
   Note: On macOS, you need to escape spaces in file paths with a backslash as shown above.

3. Add all files to Git:
   ```bash
   git add .
   ```

4. Commit the files:
   ```bash
   git commit -m "Initial commit with Weather Dashboard project"
   ```

5. Add your GitHub repository as a remote:
   ```bash
   git remote add origin https://github.com/your-username/weather-dashboard.git
   ```
   (Replace "your-username" with your actual GitHub username and "weather-dashboard" with your repository name)

6. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
   (If you're using an older version of Git, you might need to use `master` instead of `main`)

## Step 2: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended for First-Time Users)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account

2. Click "Add New..." and select "Project"

3. Import your GitHub repository:
   - Find your "weather-dashboard" repository in the list
   - Click "Import"

4. Configure your project:
   - Vercel should automatically detect that it's a Node.js project
   - Framework Preset: Select "Other"
   - Root Directory: Leave as `.` (dot)
   - Build Command: `npm install`
   - Output Directory: `public`
   - Install Command: `npm install`

5. Add Environment Variables:
   - Click "Environment Variables" to expand that section
   - Add the following variables:
     - Name: `SUPABASE_URL`, Value: `https://hndstlsaubvobdjydqoz.supabase.co`
     - Name: `SUPABASE_KEY`, Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZHN0bHNhdWJ2b2JkanlkcW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxOTI1NTEsImV4cCI6MjA2Mjc2ODU1MX0.CSWU9f3KNAn8hC4obP6x8mHCzcrdmkTH04CaFlIe4Kc`

6. Click "Deploy"

7. Wait for the deployment to complete. Vercel will provide you with a URL where your application is hosted (e.g., `https://weather-dashboard-your-username.vercel.app`).

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally (on macOS):
   ```bash
   sudo npm install -g vercel
   ```
   
   You'll be prompted to enter your macOS user password. This is required to install global packages.

2. Navigate to your project directory:
   ```bash
   cd /Users/naveedsiddiqui/Desktop/377/377\ final\ project
   ```

3. Run the deployment command:
   ```bash
   vercel
   ```

4. If you're not logged in, the CLI will prompt you to log in.

5. Answer the deployment questions:
   - Set up and deploy: `y`
   - Which scope: Select your account
   - Link to existing project: `n`
   - Project name: Accept default or enter a name
   - Directory: `.` (dot)
   - Override settings: `n`

6. After deployment, set up your environment variables:
   ```bash
   vercel env add SUPABASE_URL
   ```
   Enter: `https://hndstlsaubvobdjydqoz.supabase.co`

   ```bash
   vercel env add SUPABASE_KEY
   ```
   Enter: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZHN0bHNhdWJ2b2JkanlkcW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxOTI1NTEsImV4cCI6MjA2Mjc2ODU1MX0.CSWU9f3KNAn8hC4obP6x8mHCzcrdmkTH04CaFlIe4Kc`

7. Redeploy with the environment variables:
   ```bash
   vercel --prod
   ```

## Step 3: Verify Your Deployment

1. Visit your Vercel deployment URL (provided at the end of the deployment process)

2. Test the application:
   - Check if the home page loads correctly
   - Try searching for a city
   - Test the theme toggle
   - Test the temperature unit toggle
   - Verify that search history is saved and displayed

3. If you encounter any issues, check the Vercel deployment logs:
   - Go to your Vercel dashboard
   - Select your project
   - Click on the latest deployment
   - Click "View Logs"

## Step 4: Submit Your Project

1. Copy your Vercel deployment URL

2. Update your README.md to include the deployment URL

3. Submit the GitHub repository URL and Vercel deployment URL as required for your INST 377 project

## Troubleshooting

### macOS-Specific Issues

#### Permission Denied Errors
If you encounter "permission denied" errors when running npm commands:
```bash
sudo npm install -g vercel
```

#### Command Not Found: git
If Git is not installed on your Mac:
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git using Homebrew
brew install git
```

#### Command Not Found: node or npm
If Node.js is not installed:
```bash
# Install Node.js using Homebrew
brew install node
```

### Issue: API Endpoints Not Working

If your API endpoints are not working, check:
1. Verify that your environment variables are set correctly in Vercel
2. Check that your server.js file is properly handling API routes
3. Look at the Vercel function logs for any errors

### Issue: Styling or JavaScript Not Loading

If your CSS or JavaScript is not loading:
1. Check the browser console for errors (in Safari: Develop > Show JavaScript Console)
2. Verify that the paths in your HTML files are correct
3. Make sure your vercel.json file is properly configured

### Issue: Database Connection Errors

If you're having issues connecting to Supabase:
1. Verify that your Supabase URL and key are correct
2. Check if your Supabase project is active
3. Verify that the tables exist in your Supabase database

For additional help, refer to the [Vercel documentation](https://vercel.com/docs) or the [Supabase documentation](https://supabase.io/docs).
