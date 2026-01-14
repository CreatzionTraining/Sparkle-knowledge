# -----------------------------
# Initialize a new project repo and pushing first time
# -----------------------------
git init                            # Start a new Git repository
git add .                           # Stage all project files
git commit -m "first commit"        # Create the first commit
git branch -M main                  # Rename branch to main
git remote add origin <repo-url>    # Connect local repo to GitHub
git push -u origin main             # Push code to GitHub main branch


# -----------------------------
# Clone an existing repository and pushing first time
# -----------------------------
git clone <repo-url>                # Download the full project
cd <project-folder>                 # Enter the project directory
npm install                         # Install dependencies
git init                            # Start a new Git repository
git add .                           # Stage all project files
git commit -m "first commit"        # Create the first commit
git branch -M main                  # Rename branch to main
git remote add origin <repo-url>    # Connect local repo to GitHub
git push -u origin main             # Push code to GitHub main branch
npm install                         # Install dependencies
# -----------------------------
# Start the development server
# -----------------------------
npm run dev                  # Run the project locally

# -----------------------------------------
# Pull latest updates BEFORE starting work
# -----------------------------------------
git pull origin main         # Get updates from GitHub main branch

# -----------------------------------------
# Push latest updates AFTER work done
# -----------------------------------------
git add .                      # Stage all project files
git commit -m "first commit"   # Create the first commit
git push -u origin main        # Push code to GitHub main branch


# -----------------------------------------
# Push to another branch  AFTER work done
# -----------------------------------------
# Add all modified files to staging
git add .               
# Commit the staged changes with a message
git commit -m "merge"   

# Switch to the Bhuvan branch
git checkout Bhuvan

# Merge the latest changes from main branch into Bhuvan
git merge main

# Pull latest updates from the remote Bhuvan branch (sync with server)
git pull origin Bhuvan

# Push your final merged changes to the remote Bhuvan branch
git push origin Bhuvan


# -----------------------------------------
# Git Status checking
# -----------------------------------------

# Check the status of your Git repository
git status

# Check the list of all branches
git branch -a


