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
    
    cursor.execute('SELECT instance_id FROM CourseRegistration WHERE student_id = %s;', (student_id,))
    entryIDs = cursor.fetchall()
    
    result = processCourseCodes(entryIDs, sort="block")
    print(result)
    
    closeConnection(db, cursor)
    return result


@app.route("/getFacultyCourses", methods=['POST']) #takes a faculty's user id, returns list of course codes
def getFacultyCourses():
    data = request.get_json()
    faculty_id = data.get('facultyID')
    
    db, cursor = getCursor()
    
    cursor.execute('SELECT entry_id FROM CourseInstances WHERE faculty_id = %s;', (faculty_id,))
    courseCodes = cursor.fetchall()
    
    result = processCourseCodes(courseCodes, sort="block")
    
    closeConnection(db, cursor)
    return result


@app.route("/register", methods = ['POST']) #takes a student id and entry id (returned in course data), calls function to check  
#if the course is full, if there is capacity registers student for that course, if full return message saying it's full
def register():
    #expects "studentID" and "entryID"
    data = request.get_json()
    entryID = data.get("entryID")
    studentID = data.get("studentID")
    
    return registerStudent(studentID, entryID)


@app.route("/unregister", methods = ['POST']) #takes a student id and entry id (returned in course data), calls function to check
#if student is registered for that course, if so they are removed and current course enrollment is decreased
def unregister():
    #expects "studentID" and "entryID"
    data = request.get_json()
    entryID = data.get("entryID")
    studentID = data.get("studentID")
    
    return unregisterStudent(studentID, entryID)


def validate(data):  # validate password in users table based on given username and password info
    username = data.get("username")
    password = data.get("password")

    db, cursor = getCursor()
    
    cursor.execute("SELECT passcode, user_type, user_id FROM Users WHERE user_name = %s;", (username,))
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


def searchCourseDatabase(data, sort="code"): #searches the course database based on the provided search parameters (data)
    
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
    
    entryIDs = cursor.fetchall()
    
    coursesJSON = processCourseCodes(entryIDs, sort) #take raw course data and format it for return as JSON
    
    print(coursesJSON)
    
    closeConnection(db, cursor)
    return coursesJSON


#takes a dictionary of search parameters, returns an SQL query to execute the corresponding search and return entry_ids
def writeQuery(searchParameters):
    
    db, cursor = getCursor()
    
    searchClauses = []
    filterClauses = []
    
    search = searchParameters["search"]
    block = searchParameters["block"]
    department = searchParameters["department"]
    
    searchQuery = "SELECT course_code FROM Courses"
    
    searchClause = f" (course_name LIKE '%{search}%' OR course_code LIKE '%{search}%')"
    
    departmentClause = f" department_id = '{department}'"
    
    filterQuery = "SELECT entry_id FROM CourseInstances"
    
    blockClause = f" block_num = '{block}'"
    
    if search != "" and search != None: 
        #search and department are handled togther because they are both in courses table
        searchClauses.append(searchClause)
        
    if department != "" and department != None: 
        searchClauses.append(departmentClause)
        
    searchQuery = addClauses(searchQuery, searchClauses)
        
    print(f"search query: {searchQuery}")
        
    cursor.execute(searchQuery)
    coursesData = cursor.fetchall()
        
    count = 0 #track how many commas to add
    courseCodes = "("
        
    for course in coursesData:
            
        if count > 0:
            courseCodes = courseCodes + ", "
                
        courseCodes = courseCodes + "'" + course[0] + "'"
        count += 1
            
    courseCodes = courseCodes + ")"
        
    courseCodeClause = f" course_code IN {courseCodes}"
    
    if (search != "" and search != None) or (department != "" and department != None):
        if courseCodes == "()": #if no courses match terms, return empty search
            courseCodeClause = " course_code IN (-1)"
        filterClauses.append(courseCodeClause)
    if block != "" and block != None: 
        filterClauses.append(blockClause)
    #department accounted for in search query
        
    filterQuery = addClauses(filterQuery, filterClauses)
    print(filterQuery)
    
    closeConnection(db, cursor)
    return filterQuery


def addClauses(query, clauseList): #takes a base sql query and a list of clauses, all strings, and returns a combined query
    if len(clauseList) > 0:
        query = query + " WHERE"
        count = 0
        
        for clause in clauseList:
            if count > 0: #first clause to be added wont use AND
                query = query + " AND"
                
            query = query + clause
            count += 1 #increment count to show that AND is needed
    
    query = query + ";"
    return query


#takes list of dictionaries containing "instanceData" and "courseData" from processCourseCodes function
def formatCourseData(courseDictList, sort=None): #takes "block", "name", or "code" for sort
    
    formattedCourses = []
    
    print(courseDictList)
    
    for courseDict in courseDictList:
        courseData = { #every feild from returned course data
            "courseCode": courseDict["courseData"][0],
            "courseName": courseDict["courseData"][1],
            "blockNum": courseDict["instanceData"][2],
            "courseYear": courseDict["instanceData"][3],
            "courseDescription": courseDict["courseData"][2],
            "departmentID": courseDict["courseData"][3],
            "facultyID": courseDict["instanceData"][6],
            "currentCapacity": courseDict["instanceData"][4],
            "maxCapacity": courseDict["instanceData"][5],
            "entryID": courseDict["instanceData"][0]
        }
        
        formattedCourses.append(courseData)

    match sort:
        case "block":
            formattedCourses = sorted(formattedCourses, key=lambda d : d["blockNum"])
        case "name":
            formattedCourses = sorted(formattedCourses, key=lambda d : d["courseName"])
        case "code":
            formattedCourses = sorted(formattedCourses, key=lambda d : d["courseCode"])

    courseJSON = json.dumps(formattedCourses)
    return courseJSON


#list of entry ids returned from select query
def processCourseCodes(entryIDs, sort=None): #takes "block" and "name" for sort
    
    courseInfo = []
    db, cursor = getCursor()
    
    print(entryIDs)
    
    for entryID in entryIDs:
        print("SELECT * FROM CourseInstances WHERE entry_id = %s;" % (entryID,))
        cursor.execute("SELECT * FROM CourseInstances WHERE entry_id = %s;", (entryID[0],))
        instanceData = cursor.fetchone()
        
        courseCode = instanceData[1] #course code
        
        cursor.execute("SELECT * FROM Courses WHERE course_code = %s;", (courseCode,))
        courseData = cursor.fetchone()
        
        courseInfo.append({"instanceData":instanceData, "courseData":courseData})
    
    #format results as JSON
    courses = formatCourseData(courseInfo, sort) #passes sort params

    closeConnection(db, cursor)
    return courses 


def registerStudent(studentID, entryID): #takes a student id number and a course code, checks if the class is full.
    #if the class is full, return a message informing the user. if the class has space, increment current capacity for that class,
    #add an entry to the courseRegistration table with that student's id and course code

    db, cursor = getCursor()
    
    cursor.execute("SELECT course_code FROM CourseInstances WHERE entry_id = %s;", (entryID,)) #for displaying course code
    courseCode = cursor.fetchone()[0]

    if (hasCapacity(entryID)): #if course has capacity

        if hasBlock(studentID, entryID): # if student is not already registerd for dif class for block
        
            #increment current capacity
            cursor.execute("UPDATE CourseInstances SET current_capacity = current_capacity + 1 WHERE entry_id = %s;", (entryID,))
        
            #add link between student and course to registration table
            cursor.execute("INSERT INTO CourseRegistration (student_id, course_code, instance_id) VALUES (%s, %s, %s);", (studentID, courseCode, entryID))
        
            cursor.execute #for display message
        
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
    
    
def hasCapacity(entryID): #takes an entry ID, returns False if course is full, True if it has space
    
    db, cursor = getCursor()
    
    cursor.execute("SELECT current_capacity, max_capacity FROM CourseInstances WHERE entry_id = (%s);", (entryID,))
    caps = cursor.fetchone()
    
    closeConnection(db, cursor)
    
    if (caps[0] >= caps[1]): #if current enrollment >= max capacity
        return False
    
    return True #if course has capacity

def hasBlock(studentID, entryID): #This will check to see if a student has already registered
    # for a course during a given block

    db, cursor = getCursor()

    cursor.execute("SELECT instance_id FROM CourseRegistration WHERE student_id = (%s);", (studentID,))
    currentCourses = cursor.fetchall() #this gets all the courses a student is in

    cursor.execute("SELECT block_num, course_year FROM CourseInstances WHERE entry_id = (%s);", (entryID,))
    blockYear = cursor.fetchone() #This gets the coure they are trying to register's block/year

    currentCourseTimes = []
    for courseID in currentCourses: #get block and year for all current courses
        cursor.execute("SELECT block_num, course_year FROM CourseInstances WHERE entry_id = %s;", courseID)
        data = cursor.fetchone()
        
        currentCourseTimes.append(data) #add tuple of block number, course year
        
    blockAvailable = True #is the block of the new course available?
    for time in currentCourseTimes:
        if blockYear[0] == time[0] and blockYear[1] == time[1]: #if there is overlap with a current course
            blockAvailable = False
            
    closeConnection(db, cursor)
    
    if blockAvailable: #if there is no course in that block, block is available, student can register
        return True
    
    return False #slot is already occupied


def unregisterStudent(studentID, entryID): #takes a course code and student id, checks if student is enrolled in that course
    #if not, returns a message informing the user. if the student is enrolled, removes them from the course, decreases the current
    #course enrollment by 1
    
    db, cursor = getCursor()
    
    cursor.execute("SELECT course_code FROM CourseInstances WHERE entry_id = %s", (entryID,))
    courseCode = cursor.fetchone()[0]
    
    #check for any registration entries between this student and this course
    cursor.execute("SELECT entry_id FROM CourseRegistration WHERE student_id = (%s) AND instance_id = (%s);", (studentID, entryID))
    registrationID = cursor.fetchone()
    
    #if query returns nothing
    if registrationID is None:
        failedMessage = ("Sorry, student #%s is not currently registered for course %s" % (studentID, courseCode))
        return {"message": failedMessage}
    
    #delete registration link
    cursor.execute("DELETE FROM CourseRegistration WHERE entry_id = (%s);", registrationID)
    
    #decrease current_capacity
    cursor.execute("UPDATE CourseInstances SET current_capacity = current_capacity - 1 WHERE entry_id = (%s);", (entryID,))
    
    closeConnection(db, cursor)
    
    successMessage = ("Student #%s successfully removed from course %s" % (studentID, courseCode))
    return {"message": successMessage}
        

app.run(host="0.0.0.0", port=5000)