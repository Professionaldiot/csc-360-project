#by junxuan, to be implemented but not in this project!!

import mysql.connector
from datetime import datetime

def create_waitlist_table():
    #Creates the waitlist table if it does not exist.
    mydb = mysql.connector.connect(
        host="10.101.128.56",
        port="6033",
        user="username",
        password="123",
        database="SelfService"
    )
    cursor = mydb.cursor()

    # SQL command to create the waitlist table
    create_table_query = """
    CREATE TABLE IF NOT EXISTS waitlist (
        waitlist_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        student_name VARCHAR(100) NOT NULL,
        student_email VARCHAR(100),
        course_id INT NOT NULL,
        course_name VARCHAR(100) NOT NULL,
        department VARCHAR(100),
        max_capacity INT NOT NULL,
        position INT NOT NULL,
        timestamp DATETIME NOT NULL
    );
    """

    cursor.execute(create_table_query)
    mydb.commit()
    cursor.close()
    mydb.close()


def add_student_to_waitlist(student_id, student_name, student_email, course_id, course_name, department, max_capacity):
    #Adds a student to the waitlist for a specific course.
    mydb = mysql.connector.connect(
        host="10.101.128.56",
        port="6033",
        user="username",
        password="123",
        database="SelfService"
    )
    cursor = mydb.cursor()

    # Get the current number of students on the waitlist for this course
    cursor.execute("SELECT COUNT(*) FROM waitlist WHERE course_id = %s", (course_id,))
    position = cursor.fetchone()[0] + 1  # New student position = current count + 1

    # Insert the new student record into the waitlist
    timestamp = datetime.now()
    insert_query = """
        INSERT INTO waitlist (student_id, student_name, student_email, course_id, course_name, department, max_capacity, position, timestamp)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, (
    student_id, student_name, student_email, course_id, course_name, department, max_capacity, position, timestamp))
    mydb.commit()

    cursor.close()
    mydb.close()


def update_waitlist_positions(course_id):
    #Updates the positions of all students on the waitlist for a specific course.
    mydb = mysql.connector.connect(
        host="10.101.128.56",
        port="6033",
        user="username",
        password="123",
        database="SelfService"
    )
    cursor = mydb.cursor()

    # Get all students in the waitlist for this course, ordered by current position
    cursor.execute("SELECT waitlist_id FROM waitlist WHERE course_id = %s ORDER BY position", (course_id,))
    waitlist = cursor.fetchall()

    # Update each student's position
    for i, (waitlist_id,) in enumerate(waitlist, start=1):
        cursor.execute("UPDATE waitlist SET position = %s WHERE waitlist_id = %s", (i, waitlist_id))
    mydb.commit()

    cursor.close()
    mydb.close()

