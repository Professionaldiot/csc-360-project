from flask import Flask, request, jsonify
import mysql.connector as conn

app = Flask(__name__)

db = conn.connect(
    host="localhost",
    port="5000",
    user="username",
    password="123",
    database="SelfService"
    )

cursor = db.cursor()

@app.route("/validate", methods=['POST'])
def validateLogin():
    data = request.get_json()
    return validate(cursor, data)
    
@app.route("/search", methods=['POST'])
def searchCourses():
    data = request.get_json()
    return searchCourseDatabase(cursor, data)

@app.route("/getDepartment", methods =['POST','GET']) #Gets the request for department filter data
#When the department filter is selected, it goes into the database
#and gets the department ID and department name, so the data
#is passed in json form and the front-end can display the department
#with knowing the department ID
def getDepartment():
    cursor.execute("SELECT department, department_id FROM departments")
    result = cursor.fetchall()
    departments_Data = [{"departmentID": row[0], "departmentName": row[1]} for row in result]
    return jsonify(departments_Data)

def validate(cur, data):

    username = data.get("username")
    password = data.get("password")

    cur.execute("SELECT (passcode, user_type) FROM Users WHERE user_name = (%s);", (username,))
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

def searchCourseDatabase(cur, data): #formats course data, and returns it for display
    
    block = data.get("block")
    department = data.get("department")
    search = data.get("search")
    
    searchInfo = {
        "search" : search, 
        "block" : block, 
        "department" : department
        }
    
    query = writeQuery(searchInfo)
    
    cur.execute(query)
    rawCourses = cur.fetchall()
    
    print(query)
    print (rawCourses)
    
    coursesJSON = jsonify(rawCourses) #searchAPI.formatCourseData(rawCourses)
    
    return coursesJSON

#takes a dictionary of search parameters, returns an SQL query to execute the corresponding search
def writeQuery(searchParameters):
    
    query = "SELECT * FROM Courses" #starting point to be added to
    clauses = []
    
    if searchParameters["search"] != "": #add LIKE [search]
        clauses.append(" (course_name LIKE '%" + str(searchParameters["search"]) + "%' OR course_code LIKE '%" + str(searchParameters["search"]) + "%')") 
        
    if searchParameters["block"] != "": #add where block is [block]
        clauses.append(" block_num = '" + str(searchParameters["block"]) + "'")
    
    if searchParameters["department"] != "": #add where department is [department]
        clauses.append(" department_id = '" + str(searchParameters["department"]) + "'")
    
    if len(clauses) > 0:
        query = query + " WHERE"
        count = 0
        
        for clause in clauses:
            if count > 0: #first clause to be added wont use AND
                query = query + " AND"
                
            query = query + clause
            count += 1 #increment count to show that AND is needed
        
    query = query + ";"
    
    return query

app.run(host="10.55.0.201", port=5000)