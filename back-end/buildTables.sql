CREATE DATABASE SelfService;
USE SelfService;
CREATE TABLE Users (
	user_ID int,
    user_name varchar(255),
    passcode varchar(255),
    user_type varchar(127),
    PRIMARY KEY (user_ID)
);

INSERT INTO Users (user_ID, user_name, passcode, user_type)
VALUES
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
(20, "jgreen", "MyAcc3ss!", "student");


CREATE TABLE Students (
user_ID int,
first_name varchar(255),
last_name varchar(255),
email varchar(255),
course_credits FLOAT(4,2),
enrollment_year int,
PRIMARY KEY (user_ID)
);

CREATE TABLE Faculty (
user_ID int,
first_name VARCHAR(255),
last_name VARCHAR(255),
email VARCHAR(255),
department VARCHAR(255),
PRIMARY KEY (user_ID)
);


CREATE TABLE Registrar (
user_ID int,
first_name VARCHAR(255),
last_name VARCHAR(255),
email VARCHAR(255),
PRIMARY KEY (user_ID)
);


INSERT INTO Users (user_ID, user_name, passcode, user_type)
VALUES
(21, "rhernandez", "Stud#1001", "faculty"),
(22, "tlewis", "P@ss2024", "faculty"),
(23, "dwalker", "EntrY!333", "faculty"),
(24, "jharris", "P@ssword!", "faculty"),
(25, "slee", "Acc3ss#09", "faculty");


INSERT INTO Faculty (user_ID)
SELECT user_ID 
FROM Users 
WHERE user_type = 'faculty';


TRUNCATE TABLE Faculty;
INSERT INTO Faculty (user_ID, first_name, last_name, email, department)
VALUES
(21, 'Rebecca', 'Hernandez', 'rebecca.hernandez@example.com', 'Computer Science'),
(22, 'Thomas', 'Lewis', 'thomas.lewis@example.com', 'Mathematics'),
(23, 'Daniel', 'Walker', 'daniel.walker@example.com', 'Physics'),
(24, 'Julia', 'Harris', 'julia.harris@example.com', 'Biology'),
(25, 'Sarah', 'Lee', 'sarah.lee@example.com', 'Chemistry');

SELECT * FROM Users;

INSERT INTO Students (user_ID, first_name, last_name, email, course_credits, enrollment_year)
VALUES 
(1, "John", "Smith", "john.smith@example.com", 15.0, 2021),
(2, "Michael", "Jones", "michael.jones@example.com", 18.0, 2020),
(3, "Alice", "Lee", "alice.lee@example.com", 12.0, 2022),
(4, "Brandon", "King", "brandon.king@example.com", 16.0, 2021),
(5, "Carlos", "Garcia", "carlos.garcia@example.com", 14.0, 2023),
(6, "Diana", "Martinez", "diana.martinez@example.com", 17.0, 2020),
(7, "Emma", "Flores", "emma.flores@example.com", 13.0, 2022),
(11, "Ava", "Brown", "ava.brown@example.com", 19.0, 2021),
(12, "James", "Wilson", "james.wilson@example.com", 15.0, 2019),
(13, "Karen", "Davis", "karen.davis@example.com", 20.0, 2023),
(14, "Megan", "White", "megan.white@example.com", 16.0, 2021),
(15, "Kevin", "Moore", "kevin.moore@example.com", 14.0, 2022),
(16, "Jacob", "Young", "jacob.young@example.com", 12.0, 2021),
(17, "Julia", "Hall", "julia.hall@example.com", 18.0, 2020),
(18, "Thomas", "Lopez", "thomas.lopez@example.com", 17.0, 2023),
(19, "William", "Wright", "william.wright@example.com", 15.0, 2019),
(20, "Jessica", "Green", "jessica.green@example.com", 19.0, 2022);

DELETE FROM Users
WHERE user_ID IN (8,9,10);

INSERT INTO Users (user_ID, user_name, passcode, user_type)
VALUES
(26, "mjohnson", "P@ssword123", "registrar"),
(27, "kthompson", "Secure#456", "registrar"),
(28, "dgarcia", "StrongPass789", "registrar");

INSERT INTO Registrar (user_ID, first_name, last_name, email)
VALUES
(26, "Michael", "Johnson", "michael.johnson@example.com"),
(27, "Karen", "Thompson", "karen.thompson@example.com"),
(28, "David", "Garcia", "david.garcia@example.com");

TRUNCATE TABLE Registrar;


ALTER TABLE Faculty
ADD CONSTRAINT fk_faculty
FOREIGN KEY (User_ID)
REFERENCES Users(User_ID)
ON DELETE CASCADE;

SELECT * FROM faculty;

INSERT INTO Faculty (user_ID, first_name, last_name, email, department) VALUES
(29, 'Alice', 'Smith', 'alice.smith@example.com', 'Computer Science'),
(30, 'Bob', 'Johnson', 'bob.johnson@example.com', 'Mathematics'),
(31, 'Carol', 'Williams', 'carol.williams@example.com', 'Physics'),
(32, 'David', 'Brown', 'david.brown@example.com', 'Biology'),
(33, 'Eve', 'Davis', 'eve.davis@example.com', 'Chemistry');

INSERT INTO Users (user_ID, user_name, passcode, user_type) VALUES
(29, 'asmith', 'passAlice29', 'faculty'),
(30, 'bjohnson', 'passBob30', 'faculty'),
(31, 'cwilliams', 'passCarol31', 'faculty'),
(32, 'dbrown', 'passDavid32', 'faculty'),
(33, 'edavis', 'passEve33', 'faculty');

select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS;

CREATE TABLE Courses (
course_code varchar(255),
course_name varchar(255),
block_num varchar(255),
course_year varchar(255),
course_description varchar(255),
department_id int,
faculty_id int, 
PRIMARY KEY (course_code),
FOREIGN KEY (faculty_id) REFERENCES Faculty(user_ID)
);

SELECT * FROM Faculty;

INSERT INTO Courses (course_code, course_name, block_num, course_year, course_description, department_id, faculty_id) VALUES
-- Computer Science Courses (Department 1)
('CS101', 'Introduction to Computer Science', 'B1', '2024', 'Fundamentals of computer science, including algorithms and data structures.', 1, 21),
('CS102', 'Data Structures', 'B2', '2024', 'Introduction to data organization techniques for efficient data processing.', 1, 21),
('CS103', 'Discrete Mathematics', 'B1', '2024', 'Mathematical foundations for computer science, including logic and set theory.', 1, 29),
('CS201', 'Algorithms', 'B2', '2025', 'In-depth study of algorithm design and complexity analysis.', 1, 29),
('CS202', 'Computer Architecture', 'B3', '2025', 'Introduction to computer hardware and low-level programming.', 1, 21),

-- Mathematics Courses (Department 2)
('MAT101', 'Calculus I', 'B1', '2024', 'Introduction to differential and integral calculus.', 2, 22),
('MAT102', 'Linear Algebra', 'B2', '2024', 'Introduction to vector spaces and matrix operations.', 2, 22),
('MAT201', 'Calculus II', 'B3', '2025', 'Continuation of Calculus I topics.', 2, 30),
('MAT202', 'Differential Equations', 'B4', '2025', 'Study of ordinary differential equations.', 2, 30),
('MAT301', 'Abstract Algebra', 'B1', '2026', 'Study of groups, rings, and fields.', 2, 30),

-- Physics Courses (Department 3)
('PHY101', 'Physics I', 'B1', '2024', 'Fundamentals of mechanics and thermodynamics.', 3, 23),
('PHY102', 'Physics II', 'B2', '2024', 'Introduction to electricity and magnetism.', 3, 23),
('PHY201', 'Quantum Mechanics', 'B3', '2025', 'Introduction to quantum theory.', 3, 23),
('PHY202', 'Thermodynamics', 'B4', '2025', 'Study of heat, work, and the laws of thermodynamics.', 3, 31),
('PHY301', 'Electromagnetic Theory', 'B2', '2026', 'In-depth study of electromagnetic fields.', 3, 31),

-- Biology Courses (Department 4)
('BIO101', 'Introduction to Biology', 'B1', '2024', 'Overview of cell biology, genetics, and evolution.', 4, 32),
('BIO102', 'Ecology', 'B2', '2024', 'Study of ecosystems and environmental biology.', 4, 32),
('BIO201', 'Genetics', 'B3', '2025', 'Introduction to Mendelian and molecular genetics.', 4, 24),
('BIO202', 'Microbiology', 'B4', '2025', 'Study of microorganisms and their roles in the environment.', 4, 24),

-- Chemistry Courses (Department 5)
('CHE101', 'General Chemistry I', 'B1', '2024', 'Fundamentals of chemistry including atomic theory and bonding.', 5, 25),
('CHE102', 'Organic Chemistry', 'B2', '2024', 'Introduction to organic compounds and reactions.', 5, 33);


SELECT * FROM Courses;

CREATE TABLE Departments (
department_ID int,
department_name varchar(255),
department_head_ID int,
PRIMARY KEY (department_ID),
FOREIGN KEY (department_head_ID) REFERENCES Faculty(user_ID)
);

INSERT INTO Departments (department_ID, department_name, department_head_ID) 
VALUES
(1, 'Computer Science', 21),
(2, 'Mathematics', 22),
(3, 'Physics', 23),
(4, 'Biology', 24),
(5, 'Chemistry', 25);

ALTER TABLE Courses
ADD CONSTRAINT fk_courses
FOREIGN KEY (department_id)
REFERENCES Departments(department_ID);

SELECT * FROM Courses WHERE course_name LIKE '%Lin%' OR course_code LIKE '%Lin%';


ALTER TABLE Courses
ADD COLUMN max_capacity INT, 
ADD COLUMN current_capacity INT;

SET SQL_SAFE_UPDATES = 0;
UPDATE Courses
SET max_capacity = 20;

UPDATE Courses
SET current_capacity = 0;
SELECT * FROM Courses;

SET SQL_SAFE_UPDATES = 1;

CREATE TABLE CourseRegistration (
entry_id int AUTO_INCREMENT,
student_ID int,
course_code VARCHAR(255),
PRIMARY KEY (entry_id),
FOREIGN KEY (student_ID) REFERENCES Students(user_ID),
FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);