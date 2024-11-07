from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as conn
import json

app = Flask(__name__)
CORS(app)

db = conn.connect(
    host="10.101.128.56",
    port="6033",
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

    cur.execute("SELECT passcode, user_type FROM Users WHERE user_name = (%s);", (username,))
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

def searchCourseDatabase(cur, data): #searches the course database based on the provided search parameters (data)
    
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
    
    coursesJSON = formatCourseData(rawCourses) #take raw course data and format it for return as JSON
    
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

#takes raw course data from SELECT query, returns it formatted as a JSON containing all course properties from the database
def formatCourseData(rawCoursesList):
    
    formattedCourses = []
    
    for rawCourse in rawCoursesList:
        courseData = { #every feild from returned course data
            "courseCode": rawCourse[0], #course ID number
            "courseName": rawCourse[1],
            "blockNum": rawCourse[2],
            "courseYear": rawCourse[3],
            "courseDescription": rawCourse[4],
            "departmentID": rawCourse[5],
            "facultyID": rawCourse[6]
        }
        
        formattedCourses.append(courseData)

    courseJSON = json.dumps(formattedCourses)
    
    return courseJSON

app.run(host="0.0.0.0", port=5000)