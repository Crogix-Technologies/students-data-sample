 --git ## Git source initialization
In the root of your project source write the following command to initialize git

Command: git init 

## .gitignore file
This is the git configuration file, in which we can configure, that which files and folders to ignore means not to add in git repository
To add this file write the following command on the root folder of your project

Command: touch .gitignore

# Git Status

Command: git status

# Add changes to stage

Command: git add .
for single file
Command: git add xyz.js

# Commit changes

Command: git commit -m "<any_message>"

# Create branch

Command: git branch <branch_name>

# List All Local branches

Command: git branch

# List All Remote branches

Command: git branch -r

# List All Local branches with latest commit hash and message

Command: git branch -v

# List All Remote branches with latest commit hash and message

Command: git branch -r -v

# Delete branch

Command: git branch -d <branch_name>

# Switch branch

Command: git checkout <branch_name>

# Push branch to server

Command: git push --set-upstream origin <branch_name>
