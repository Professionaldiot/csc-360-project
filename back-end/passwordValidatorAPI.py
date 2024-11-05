from flask import Flask, request
import mysql.connector as conn

app = Flask(__name__)

#connect to existing MySQL server on the VM on the department server
db = conn.connect(
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

    cursor.execute("SELECT (passcode, user_type) FROM Users WHERE user_name = (%s);", (username,))
    result = cursor.fetchone()
    
    try:
        if password == result[0]:
            return {
                "success": True,
                "user_type": result[1]
                }
        
    except:
        return {"success": False}
        
    return {"success": False}

app.run()