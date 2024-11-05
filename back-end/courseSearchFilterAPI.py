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

@app.post("/search") #recieves POST request containing block and department filter info, requests corresponding info from database,
def searchCourseDatabase(): #formats course data, and returns it for display
    
    searchParameters = request.get_json()
    block = searchParameters.get("block")
    department = searchParameters.get("department")
    
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
        courseData = { #every feild from returned course data
            "course_code": rawCourse[0], #course ID number
            "course_name": rawCourse[1],
            "block_num": rawCourse[2],
            "course_year": rawCourse[3],
            "course_description": rawCourse[4],
            "department_id": rawCourse[5],
            "faculty_id": rawCourse[6]
        }
        
        formattedCourses.append(courseData)

    print (formattedCourses)
    
    return formattedCourses

app.run()