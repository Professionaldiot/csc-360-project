For the password validation API:
Make sure flask and the MySQL Python libraries are both installed
Then just make sure the file is running when you need to make a password validation request
Takes post request of JSON file containing username and password information and posts a JSON of a boolean "success", true if the login was valid, false if not.

For the Users table SQL file: 
The SQL queries in the file will create and populate the Users table in the SelfService database on your server

Course Search API:
Requires flask and MySQL Python libraries
Takes post request containing a JSON of filter information, processes and posts course data formatted as JSON for display