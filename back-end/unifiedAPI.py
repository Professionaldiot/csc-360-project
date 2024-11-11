from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as conn
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://10.101.128.56:3000"]}}) #allows for cross-origin resource sharing


def getCursor():
    db = conn.connect(
        host="10.101.128.56",
        port="6033",
        user="username",
        password="123",
        database="SelfService")

    cursor = db.cursor()
    return db, cursor


def closeConnection(db, cursor):
    db.commit()
    cursor.close()
    db.close()


@app.route("/validate", methods=['POST']) #takes username and password and validates login
def validateLogin():
    data = request.get_json()
    return validate(data)
  
    
@app.route("/search", methods=['POST']) #searches course database based on given search parameters
def searchCourses():
    data = request.get_json()
    return searchCourseDatabase(data)


@app.route("/getDepartment", methods =['POST','GET']) #Gets the request for department filter data
#When the department filter is selected, it goes into the database
#and gets the department ID and department name, so the data
#is passed in json form and the front-end can display the department
#with knowing the department ID
def getDepartment():
    db, cursor = getCursor()
    
    cursor.execute("SELECT department_name, department_id FROM Departments;")
    result = cursor.fetchall()
    
    departments_Data = [{"departmentID": row[0], "departmentName": row[1]} for row in result]
    
    closeConnection(db, cursor)
    return jsonify(departments_Data)


@app.route("/getRegisteredCourses", methods=['POST']) #takes a student's user id, returns list of course codes
def getRegisteredCourses():
    data = request.get_json()
    student_id = data.get('studentID')

    db, cursor = getCursor()
    
    cursor.execute('SELECT course_code FROM CourseRegistration WHERE student_id = (%s);', (student_id,))
    courseCodes = cursor.fetchall()
    
    result = processCourseCodes(courseCodes)
    print(result)
    
    closeConnection(db, cursor)
    return result


@app.route("/getFacultyCourses", methods=['POST']) #takes a faculty's user id, returns list of course codes
def getFacultyCourses():
    data = request.get_json()
    faculty_id = data.get('facultyID')
    
    db, cursor = getCursor()
    
    cursor.execute('SELECT course_code FROM Courses WHERE faculty_id = (%s);', (faculty_id,))
    courseCodes = cursor.fetchall()
    
    result = processCourseCodes(courseCodes)
    
    closeConnection(db, cursor)
    return result


@app.route("/register", methods = ['POST']) #takes a student id and course code, calls function to check  
#if the course is full, if there is capacity registers student for that course, if full return message saying it's full
def register():
    #expects "studentID" and "courseCode"
    data = request.get_json()
    courseCode = data.get("courseCode")
    studentID = data.get("studentID")
    
    return registerStudent(studentID, courseCode)


@app.route("/unregister", methods = ['POST']) #takes a student id and course code, calls function to check
#if student is registered for that course, if so they are removed and current course enrollment is decreased
def unregister():
    #expects "studentID" and "courseCode"
    data = request.get_json()
    courseCode = data.get("courseCode")
    studentID = data.get("studentID")
    
    return unregisterStudent(studentID, courseCode)


def validate(data):  # validate password in users table based on given username and password info
    username = data.get("username")
    password = data.get("password")

    db, cursor = getCursor()
    
    cursor.execute("SELECT passcode, user_type, user_id FROM Users WHERE user_name = (%s);", (username,))
    result = cursor.fetchone()
    
    returnData = {}
    
    try:
        if password == result[0]:
            returnData["success"] = True
            returnData["userType"] = result[1]
            returnData["userID"] = result[2]
        else:
            returnData["success"] = False
            
    except:
        returnData["success"] = False
        
    finally:
        closeConnection(db, cursor)
        return returnData


def searchCourseDatabase(data): #searches the course database based on the provided search parameters (data)
    
    block = data.get("block")
    department = data.get("department")
    search = data.get("search")
    
    db, cursor = getCursor()
    
    searchInfo = {
        "search" : search, 
        "block" : block, 
        "department" : department
        }
    
    query = writeQuery(searchInfo)
    
    cursor.execute(query)
    
    rawCourses = cursor.fetchall()
    
    coursesJSON = formatCourseData(rawCourses) #take raw course data and format it for return as JSON
    
    print(coursesJSON)
    
    closeConnection(db, cursor)
    return coursesJSON


#takes a dictionary of search parameters, returns an SQL query to execute the corresponding search
def writeQuery(searchParameters):
    
    query = "SELECT * FROM Courses" #starting point to be added to
    clauses = []
    
    search = searchParameters["search"]
    block = searchParameters["block"]
    department = searchParameters["department"]
    
    if search != "" and search != None: #add LIKE [search]
        clauses.append(f" (course_name LIKE '%{search}%' OR course_code LIKE '%{search}%')") 
        
    if block != "" and block != None: #add where block is [block]
        clauses.append(" block_num = '%s'" % (block,))
    
    if department != "" and department != None: #add where department is [department]
        clauses.append(" department_id = '%s'" % (department,))
    
    if len(clauses) > 0:
        query = query + " WHERE"
        count = 0
        
        for clause in clauses:
            if count > 0: #first clause to be added wont use AND
                query = query + " AND"
                
            query = query + clause
            count += 1 #increment count to show that AND is needed
        
    query = query + ";"
    print(query)
    
    return query


#takes raw course data from SELECT query, returns it formatted as a JSON containing all course properties from the database
def formatCourseData(rawCoursesList):
    
    formattedCourses = []
    
    for rawCourse in rawCoursesList:
        courseData = { #every feild from returned course data
            "courseCode": rawCourse[0],
            "courseName": rawCourse[1],
            "blockNum": rawCourse[2],
            "courseYear": rawCourse[3],
            "courseDescription": rawCourse[4],
            "departmentID": rawCourse[5],
            "facultyID": rawCourse[6],
            "maxCapacity": rawCourse[7],
            "currentCapacity": rawCourse [8]
        }
        
        formattedCourses.append(courseData)

    courseJSON = json.dumps(formattedCourses)
    return courseJSON


def processCourseCodes(courseCodes):
    
    courseInfo = []
    db, cursor = getCursor()
    
    for courseCode in courseCodes:
        # Prepare the query to fetch course data for each in the given list of course IDs
        query = "SELECT * FROM Courses WHERE course_code IN (%s);" 
        #there is almost definitely a way to do this for all of the ids at once, but i havent figured it out yet

        # Execute the query
        cursor.execute(query, courseCode)

        # Fetch results
        result = cursor.fetchone()
        
        courseInfo.append(result)
    
    #format results as JSON
    courses = formatCourseData(courseInfo)

    closeConnection(db, cursor)
    return courses 


def registerStudent(studentID, courseCode): #takes a student id number and a course code, checks if the class is full.
    #if the class is full, return a message informing the user. if the class has space, increment current capacity for that class,
    #add an entry to the courseRegistration table with that student's id and course code

    db, cursor = getCursor()

    if (hasCapacity(courseCode)): #if course has capacity

        if hasBlock(studentID,courseCode): # if student is not already registerd for dif class for block
        
            #increment current capacity
            cursor.execute("UPDATE Courses SET current_capacity = current_capacity + 1 WHERE course_code = (%s);", (courseCode,))
        
            #add link between student and course to registration table
            cursor.execute("INSERT INTO CourseRegistration (student_id, course_code) VALUES (%s, %s);", (studentID, courseCode))
        
            successMessage = ("Student #%s successfully registered for course %s" % (studentID, courseCode))
            
            closeConnection(db, cursor)
            return {"message": successMessage}
        
        blockConflictMessage = ("Student #%s has a course scheduled during the same block as %s" % (studentID, courseCode))
        closeConnection(db, cursor)
        return {"message": blockConflictMessage}
        
    #if course is full
    failedMessage = ("Sorry, course %s is currently full." % (courseCode))
    
    closeConnection(db, cursor)
    return {"message": failedMessage}
    
    
def hasCapacity(courseCode): #takes a course code, returns False if course is full, True if it has space
    
    db, cursor = getCursor()
    
    cursor.execute("SELECT current_capacity, max_capacity FROM Courses WHERE course_code = (%s);", (courseCode,))
    caps = cursor.fetchone()
    
    closeConnection(db, cursor)
    
    if (caps[0] >= caps[1]): #if current enrollment >= max capacity
        return False
    
    return True #if course has capacity

def hasBlock( studentID, courseCode): #This will check to see if a student has already registered
    # for a course during a given block

    db, cursor = getCursor()

    cursor.execute("SELECT course_code FROM CourseRegistration WHERE student_ID = (%s);", (studentID,))
    courses = cursor.fetchall() #this gets all the courses a student is in

    cursor.execute("SELECT block_num, course_year FROM Courses WHERE course_code =(%s);",(courseCode))
    blockYear = cursor.fetchone() #This gets the coure they are trying to register's block/year

    closeConnection(db, cursor)

    for course in courses: #this goes through all the courses that the student is going to take
        if course[0] == blockYear[0] and course[1] == blockYear [1]: #this checks to see if the year 
            # and block allign with the course
            return False # if it does, it returns false, because there is already a course
    return True # it is able to register on this behalf if there are no other courses



def unregisterStudent(studentID, courseCode): #takes a course code and student id, checks if student is enrolled in that course
    #if not, returns a message informing the user. if the student is enrolled, removes them from the course, decreases the current
    #course enrollment by 1
    
    db, cursor = getCursor()
    
    #check for any registration entries between this student and this course
    cursor.execute("SELECT entry_id FROM CourseRegistration WHERE student_id = (%s) AND course_code = (%s);", (studentID, courseCode))
    registrationID = cursor.fetchone()
    
    #if query returns nothing
    if registrationID is None:
        failedMessage = ("Sorry, student #%s is not currently registered for course %s" % (studentID, courseCode))
        return {"message": failedMessage}
    
    #delete registration link
    cursor.execute("DELETE FROM CourseRegistration WHERE entry_id = (%s);", registrationID)
    
    #decrease current_capacity
    cursor.execute("UPDATE Courses SET current_capacity = current_capacity - 1 WHERE course_code = (%s);", (courseCode,))
    
    closeConnection(db, cursor)
    
    successMessage = ("Student #%s successfully removed from course %s" % (studentID, courseCode))
    return {"message": successMessage}
        

app.run(host="0.0.0.0", port=5000)