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

git pull https://github.com/Professionaldiot/csc-360-project

git checkout -b README-txt

git push origin

//or just create the branch on github

git add README.txt

git commit -m "update README :)"

git push origin README-txt



------
if you have issues:

with not being able to pull do:

git pull origin --allow-unrelated-histories
