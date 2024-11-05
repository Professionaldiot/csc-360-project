from flask import Flask, request
import mysql.connector

app = Flask(__name__)

#to be filled with server connection info, was configured for localhost
db = mysql.connector.connect(
    host="10.101.128.56",
    port="6033",
    user="username",
    password="123",
    database="SelfService"
)

cursor = db.cursor()

#Recieves JSON packet containing username and password from login page, returns a boolean value based on if the login information is valid or not
#retrieves passcode from MySQL database based on username and checks the provided password against it
@app.post("/validate")
def validateLogin():

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    cursor.execute("SELECT (passcode) FROM users WHERE user_name = (%s);", (username,))
    result = cursor.fetchone()
    
    try:
        if password == result[0]:
            return {"success": True}
        
    except:
        return {"success": False}
        
    return {"success": False}

app.run()