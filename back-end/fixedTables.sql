CREATE DATABASE IF NOT EXISTS SelfServiceDB;
USE SelfServiceDB;

CREATE TABLE IF NOT EXISTS Users (
    user_ID INT,
    user_name VARCHAR(255),
    passcode VARCHAR(255),
    user_type VARCHAR(127),
    PRIMARY KEY (user_ID)
);

-- added registrar IDs (couldn't add to registrar table without id)
INSERT INTO Users (user_ID, user_name, passcode, user_type) VALUES
(1, "jsmith", "P@ss1234", "student"),
(2, "mjones", "Secur3#5", "student"),
(3, "alee", "abcD!234", "student"),
(4, "bking", "Qwerty#6", "student"),
(5, "cgarcia", "Pass#789", "student"),
(6, "dmartinez", "SafeP@55", "student"),
(7, "eflores", "987Xyz!", "student"),
(8, "hthompson", "Login123", "student"),
(9, "lroberts", "MyPass#9", "student"),
(10, "mclark", "New@Pass", "student"),
(11, "abrown", "Stud3nt#1", "student"),
(12, "jwilson", "P@ssW0rd", "student"),
(13, "kdavis", "Hel10#45", "student"),
(14, "mwhite", "Secure#21", "student"),
(15, "kmoore", "Acce$$89", "student"),
(16, "jyoung", "EntrY@55", "student"),
(17, "jhall", "Lock3r#2", "student"),
(18, "tlopez", "Uniqu3#12", "student"),
(19, "wwright", "SafeKey#3", "student"),
(20, "jgreen", "MyAcc3ss!", "student"),
(21, "rhernandez", "Stud#1001", "faculty"),
(22, "tlewis", "P@ss2024", "faculty"),
(23, "dwalker", "EntrY!333", "faculty"),
(24, "jharris", "P@ssword!", "faculty"),
(25, "slee", "Acc3ss#09", "faculty"),
(26, "mjohnson", "Registrar1", "admin"),
(27, "kthompson", "Registrar2", "admin"),
(28, "dgarcia", "Registrar3", "admin");

CREATE TABLE IF NOT EXISTS Students (
    user_ID INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    course_credits FLOAT(4,2),
    enrollment_year INT,
    PRIMARY KEY (user_ID)
);

INSERT INTO Students (user_ID, first_name, last_name, email, course_credits, enrollment_year) VALUES
(1, "John", "Smith", "john.smith@example.com", 15.0, 2021),
(2, "Michael", "Jones", "michael.jones@example.com", 18.0, 2020),
(3, "Alice", "Lee", "alice.lee@example.com", 12.0, 2022),
(4, "Brandon", "King", "brandon.king@example.com", 16.0, 2021),
(5, "Carlos", "Garcia", "carlos.garcia@example.com", 14.0, 2023);


CREATE TABLE IF NOT EXISTS Faculty (
    user_ID INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    department VARCHAR(255),
    PRIMARY KEY (user_ID),
    FOREIGN KEY (user_ID) REFERENCES Users(user_ID) ON DELETE CASCADE
);

--truncate caused error
INSERT INTO Faculty (user_ID, first_name, last_name, email, department) VALUES
(21, 'Rebecca', 'Hernandez', 'rebecca.hernandez@example.com', 'Computer Science'),
(22, 'Thomas', 'Lewis', 'thomas.lewis@example.com', 'Mathematics'),
(23, 'Daniel', 'Walker', 'daniel.walker@example.com', 'Physics'),
(24, 'Julia', 'Harris', 'julia.harris@example.com', 'Biology'),
(25, 'Sarah', 'Lee', 'sarah.lee@example.com', 'Chemistry');


CREATE TABLE IF NOT EXISTS Registrar (
    user_ID INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    PRIMARY KEY (user_ID),
    FOREIGN KEY (user_ID) REFERENCES Users(user_ID) ON DELETE CASCADE
);


INSERT INTO Registrar (user_ID, first_name, last_name, email) VALUES
(26, "Michael", "Johnson", "michael.johnson@example.com"),
(27, "Karen", "Thompson", "karen.thompson@example.com"),
(28, "David", "Garcia", "david.garcia@example.com");


CREATE TABLE IF NOT EXISTS Departments (
    department_ID INT,
    department_name VARCHAR(255),
    department_head_ID INT,
    PRIMARY KEY (department_ID),
    FOREIGN KEY (department_head_ID) REFERENCES Faculty(user_ID) ON DELETE SET NULL
);


INSERT INTO Departments (department_ID, department_name, department_head_ID) VALUES
(1, 'Computer Science', 21),
(2, 'Mathematics', 22),
(3, 'Physics', 23),
(4, 'Biology', 24),
(5, 'Chemistry', 25);


CREATE TABLE IF NOT EXISTS Courses (
    course_code VARCHAR(255),
    course_name VARCHAR(255),
    block_num VARCHAR(255),
    course_year VARCHAR(255),
    course_description VARCHAR(255),
    department_id INT,
    faculty_id INT,
    max_capacity INT DEFAULT 20,
    current_capacity INT DEFAULT 0,
    PRIMARY KEY (course_code),
    FOREIGN KEY (department_id) REFERENCES Departments(department_ID) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES Faculty(user_ID) ON DELETE SET NULL
);


INSERT INTO Courses (course_code, course_name, block_num, course_year, course_description, department_id, faculty_id) VALUES
-- Computer Science Courses (Department 1)
('CS101', 'Introduction to Computer Science', 'B1', '2024', 'Fundamentals of computer science, including algorithms and data structures.', 1, 21),
('CS102', 'Data Structures', 'B2', '2024', 'Introduction to data organization techniques for efficient data processing.', 1, 21),
('CS202', 'Computer Architecture', 'B3', '2025', 'Introduction to computer hardware and low-level programming.', 1, 21),
-- Mathematics Courses (Department 2)
('MAT101', 'Calculus I', 'B1', '2024', 'Introduction to differential and integral calculus.', 2, 22),
('MAT102', 'Linear Algebra', 'B2', '2024', 'Introduction to vector spaces and matrix operations.', 2, 22),
-- Physics Courses (Department 3)
('PHY101', 'Physics I', 'B1', '2024', 'Fundamentals of mechanics and thermodynamics.', 3, 23),
('PHY102', 'Physics II', 'B2', '2024', 'Introduction to electricity and magnetism.', 3, 23),
('PHY201', 'Quantum Mechanics', 'B3', '2025', 'Introduction to quantum theory.', 3, 23),
-- Biology Courses (Department 4)
('BIO201', 'Genetics', 'B3', '2025', 'Introduction to Mendelian and molecular genetics.', 4, 24),
('BIO202', 'Microbiology', 'B4', '2025', 'Study of microorganisms and their roles in the environment.', 4, 24),
-- Chemistry Courses (Department 5)
('CHE101', 'General Chemistry I', 'B1', '2024', 'Fundamentals of chemistry including atomic theory and bonding.', 5, 25),
('CHE102', 'Organic Chemistry', 'B2', '2024', 'Introduction to organic compounds and reactions.', 5, 25);

-- CourseRegistration Table
CREATE TABLE IF NOT EXISTS CourseRegistration (
    entry_id INT AUTO_INCREMENT,
    student_ID INT,
    course_code VARCHAR(255),
    PRIMARY KEY (entry_id),
    FOREIGN KEY (student_ID) REFERENCES Students(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES Courses(course_code) ON DELETE CASCADE
);
