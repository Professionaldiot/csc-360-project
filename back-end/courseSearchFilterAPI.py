from flask import Flask, request
import mysql.connector as conn
import json

#app = Flask(__name__)

#connect to existing MySQL server on the VM on the department server
db = conn.connect(
    host="10.101.128.56",
    port="6033",
    user="username",
    host="10.101.128.56",
    port="6033",
    user="username",
    password="123",
    database="SelfService"
    )

cursor = db.cursor()

#@app.route("/search", methods=['POST']) #recieves POST request containing block and department filter info, requests corresponding info from database,
def searchCourseDatabase(): #formats course data, and returns it for display
    
    data = request.get_json()
    block = data.get("block")
    department = data.get("department")
    search = data.get("search")
   
    searchInfo = {
        "search" : search, 
        "block" : block, 
        "department" : department
        }
    
    query = writeQuery(searchInfo)
    
    rawCourses = fetchCourses(block, department)
    
    coursesJSON = formatCourseData(rawCourses)
    
    return coursesJSON
    
def fetchCourses(block = None, department = None): #returns raw course data retrieved from MySQL
    
    if block == None and department == None:
       cursor.execute("SELECT * FROM Courses")
       
    elif block == None :
        cursor.execute("SELECT * FROM Courses WHERE departments = %s;", (department,))
        
    elif department == None:
        cursor.execute("SELECT * FROM Courses WHERE block = %s;", (block,))
        
    else:
        cursor.execute("SELECT * FROM Courses WHERE department = %s AND block = %s", (department, block))
        
    result = cursor.fetchall()
    
    return result #will return list of raw course data

#takes raw course data from SELECT query, returns it formatted as a JSON containing all course properties from the database
def formatCourseData(rawCoursesList):
    
    formattedCourses = []
    
    for rawCourse in rawCoursesList:
        courseData = { 
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

#app.run()