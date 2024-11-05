from flask import Flask, request
import mysql.connector as conn

app = Flask(__name__)

#connect to existing MySQL server on the VM on the department server
db = conn.connect(
    # host="10.101.128.56",
    # port="6033",
    # user="username",
    # password="123",
    # database="SelfService"
    
    host = "localhost",
    user = "root",
    password = "123",
    database = "SelfService"
    )

cursor = db.cursor()

@app.post("/search") #recieves POST request containing block and department filter info, requests corresponding info from database,
def searchCourseDatabase(): #formats course data, and returns it for display
    
    searchParameters = request.get_json()
    block = searchParameters.get("block")
    department = searchParameters.get("department")
    
    query = formatQuery(block, department)
    
    cursor.execute(query, ())
    result = cursor.fetchall()
    
    coursesJSON = formatCourseData(result)
    
    return coursesJSON
    
def formatQuery(block = None, department = None): #returns proper MySQL query for the selected filters
    
    #11/5: to be written by Marley
    #function will likely be vulnerable to SQL injection, something to address soon-ish
    return "SELECT * FROM Courses" #will return properly formatted SQL query as a string

#takes raw course data from SELECT query, returns it formatted as a JSON containing all course properties from the database
def formatCourseData(rawCoursesList):
    
    formattedCourses = []
    
    for rawCourse in rawCoursesList:
        courseData = { #every feild from returned course data
            "ID": rawCourse[0], #course ID number
            "name": rawCourse[1]
            # "courseCode": ,
            # "name": ,
            # "description": ,
            # "block": ,
            # "department": ,
            # "teacher": ,
        }
        
        formattedCourses.append(courseData)

    print (formattedCourses)
    
    return formattedCourses

app.run()