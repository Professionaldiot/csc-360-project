you should totes magotes read me!

commands to use:

git checkout -b <name>

create a new branch on your local machine, the name you use should be similar to the filename you're using
I'll give an example of how this file was done later.

git add .

this tells git that you want to add stuff in an update to a file in the next commit, I would recommend using

git add <filename>

this lets you add a specific file for an update in the next commit, I'll give an example later

git commit -m "<message>"

commits the changes you had from git add to the repository

git push origin <name>

pushes the changes from your machine to the repository, this isn't instant, as it creates a pull request on
GitHub, <name> should the same as the <name> from git checkout -b <name>


example:

git checkout -b README-txt

git add README.txt

git commit -m "update README :)"

git push origin README-txt



------
if you have issues:

use 
git checkout <name> (has to be on GitHub and pushed as a new branch already)

git branch main <name> -f (forces it to go into main branch, don't do this unless you have to)

git checkout main

git push origin main -f
