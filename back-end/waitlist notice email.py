#by junxuan, working functions not yet implemented

import mysql.connector  # Import MySQL connector for database operations
import smtplib  # Import SMTP library to send emails
from datetime import datetime, timedelta  # Import datetime for time calculations
from email.mime.multipart import MIMEMultipart  # Import MIME classes to structure email
from email.mime.text import MIMEText

# Database configuration
DB_CONFIG = {
    'host': "10.101.128.56",
    'port': "6033",
    'user': "username",
    'password': "123",
    'database': "SelfService"
}

# Email configuration(sender)
SMTP_SERVER = "smtp.cornellcollege.edu"  # SMTP server address
SMTP_PORT = 587  # SMTP server port
SMTP_USER = "***@cornellcollege.edu"  # Sender's email address
SMTP_PASSWORD = "***"  # Sender's email password

def send_email(to_email, subject, message):
    # Sends an email to the specified address with a subject and message.
    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))

    # Set up SMTP server and send email
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()  # Enable TLS for security
        server.login(SMTP_USER, SMTP_PASSWORD)  # Login to SMTP server
        server.sendmail(SMTP_USER, to_email, msg.as_string())  # Send email

def add_student_to_waitlist(student_id, student_name, student_email, course_id, course_name, department, max_capacity):
    # Adds a student to the waitlist and sends a notification email.
    mydb = mysql.connector.connect(**DB_CONFIG)
    cursor = mydb.cursor()

    # Calculate the student's position on the waitlist
    cursor.execute("SELECT COUNT(*) FROM waitlist WHERE course_id = %s", (course_id,))
    position = cursor.fetchone()[0] + 1

    # Insert student into the waitlist
    timestamp = datetime.now()
    insert_query = """
        INSERT INTO waitlist (student_id, student_name, student_email, course_id, course_name, department, max_capacity, position, timestamp)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, (
        student_id, student_name, student_email, course_id, course_name, department, max_capacity, position, timestamp))
    mydb.commit()

    # Send notification email to the student
    subject = "You've been added to the waitlist for " + course_name
    message = f"Hello {student_name},\n\nYou have been added to the waitlist for {course_name}. If you are still on the waitlist after 24 hours, you will be removed, and the next person will be notified.\n\nBest regards,\nYour School"
    send_email(student_email, subject, message)

    cursor.close()
    mydb.close()

def remove_expired_waitlist_entries():
    # Removes students from the waitlist who have been on it for more than 24 hours.
    mydb = mysql.connector.connect(**DB_CONFIG)
    cursor = mydb.cursor(dictionary=True)

    # Calculate the expiration time (24 hours ago)
    expiration_time = datetime.now() - timedelta(hours=24)

    # Select students who have been on the waitlist for more than 24 hours
    cursor.execute("SELECT * FROM waitlist WHERE timestamp < %s ORDER BY position", (expiration_time,))
    expired_entries = cursor.fetchall()

    for entry in expired_entries:
        student_email = entry['student_email']
        course_name = entry['course_name']
        student_name = entry['student_name']

        # Send email notification to the next person on the waitlist (if any)
        cursor.execute("SELECT student_email, student_name FROM waitlist WHERE course_id = %s AND position = %s", (entry['course_id'], entry['position'] + 1))
        next_in_line = cursor.fetchone()
        if next_in_line:
            subject = f"Waitlist Update for {course_name}"
            message = f"Hello {next_in_line['student_name']},\n\nYou are next on the waitlist for {course_name}. Please be prepared for any updates.\n\nBest regards,\nYour School"
            send_email(next_in_line['student_email'], subject, message)

        # Remove the expired student from the waitlist
        cursor.execute("DELETE FROM waitlist WHERE waitlist_id = %s", (entry['waitlist_id'],))
        update_waitlist_positions(entry['course_id'])  # Adjust positions

    mydb.commit()
    cursor.close()
    mydb.close()

def update_waitlist_positions(course_id):
    # Updates the positions for all students on the waitlist for a specific course.
    mydb = mysql.connector.connect(**DB_CONFIG)
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


