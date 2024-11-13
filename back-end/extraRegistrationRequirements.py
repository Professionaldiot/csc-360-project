
import mysql.connector as conn
from unifiedAPI import getCursor, closeConnection

def checkAdjuncts (entryID) : #checks to see if course is adjunct to reduce scheduling conflict errors

    db, cursor = getCursor() # opens the cursor

    cursor.execute("SELECT block_num FROM CourseInstances WHERE entry_id = (%s) ;" % (entryID))
    blockNum = cursor.fetchone()  # this gives us the block number

    blockNum = blockNum [0] #this makes sure the block number is a string for comparison

    closeConnection(db, cursor) # this closes the cursor before returning a value

    if blockNum == "B9": # checks to see if it is adjunct block
        return True
    return False


def preReqCheck (studentID, entryID):
    # This checks if a students has the necessary credits for the course

    db, cursor = getcursor () #opens cursor

    cursor.execute("SELECT course_code FROM CourseInstance WHERE entry_id = (%s) ;" % (entryID))
    courseCode = cursor.fetchall () # Gets course code to be able to find in the preReq

    cursor.execute("SELECT prereq_code FROM Prerequisites WHERE entry_id = (%s) ;" % (courseCode))
    preReqs = cursor.fetchall () # gets the preReqs for courses

    cursor.execute("SELECT course_code FROM Prerequisites WHERE student_id = (%s) ;" % (studentID))
    takenCourses = cursor.fetchall () # gets the course history of given student

    closeConnection(db, cursor) # closes cursor before the return statement


    for courses in preReqs: # this and takes the courses in the preReqs individually
        if courses in takenCourses: # sees if pre-req has been taken
            continue #if so, goes to next pre req
        else:
            return False # if not, then it stops
    return True


##### how it would work with register student #####
#def registerStudent(studentID, entryID): 

    #db, cursor = getCursor()
    
    #cursor.execute("SELECT course_code FROM CourseInstances WHERE entry_id = %s;", (entryID,)) #for displaying course code
    #courseCode = cursor.fetchone()[0]

    #if preReqCheck (studentID, entryID) and (hasCapacity(entryID)): 

        #if checkAdjuncts (entryID) or hasBlock(studentID, entryID): # if student is not already registerd for dif class for block
        
           
            #cursor.execute("UPDATE CourseInstances SET current_capacity = current_capacity + 1 WHERE entry_id = %s;", (entryID,))
        
            #add link between student and course to registration table
            #cursor.execute("INSERT INTO CourseRegistration (student_id, course_code, instance_id) VALUES (%s, %s, %s);", (studentID, courseCode, entryID))
        
            #successMessage = ("Student #%s successfully registered for course %s" % (studentID, courseCode))
            
            #closeConnection(db, cursor)
            #return {"message": successMessage}
        
        #blockConflictMessage = ("Student #%s has a course scheduled during the same block as %s" % (studentID, courseCode))
        #closeConnection(db, cursor)
        #return {"message": blockConflictMessage}
        
    #if (hasCapacity(entryID)):

        #failedMessage = ("Sorry, course %s is currently full." % (courseCode))
    #else:
        #failedMessage = ("Sorry, do not have the pre-reqs for %s ." % (courseCode))
    
    #closeConnection(db, cursor)
    #return {"message": failedMessage}