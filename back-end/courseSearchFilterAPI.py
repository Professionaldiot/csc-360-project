from flask import Flask, request
import mysql.connector as conn

#app = Flask(__name__)

#connect to existing MySQL server on the VM on the department server
db = conn.connect(
    host="localhost",
    #port="5000",
    user="root", #"username",
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
    
    rawCourses = cursor.execute(query)
    
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

#takes a dictionary of search parameters, returns an SQL query to execute the corresponding search
def writeQuery(searchParameters):
    
    query = "SELECT * FROM Courses" #starting point to be added to
    clauses = []
    
    if searchParameters["search"] is not "": #add LIKE [search]
        clauses.append(" (course_name LIKE '%" + str(searchParameters["search"]) + "%' OR course_code LIKE '%" + str(searchParameters["search"]) + "%')")
       
    print(query, clauses)    
        
    if searchParameters["block"] is not "": #add where block is [block]
        clauses.append(" block_num = '" + str(searchParameters["block"]) + "'")
        
    print(query, clauses)
    
    if searchParameters["department"] is not "": #add where department is [department]
        clauses.append(" department_id = '" + str(searchParameters["department"]) + "'")
        
    print(query, clauses)
    
    if len(clauses) > 0:
        query = query + " WHERE"
        count = 0
        
        for clause in clauses:
            if count > 0: #first clause to be added wont use AND
                query = query + " AND"
                
            query = query + clause
            count += 1 #increment count to show that AND is needed
        
    query = query + ";"
    
    print (query)
    
    return query

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

#app.run()