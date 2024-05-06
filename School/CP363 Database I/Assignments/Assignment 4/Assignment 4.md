```sql
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Major VARCHAR(50),
    EnrollmentYear INT NOT NULL
);

CREATE TABLE Courses (
    CourseID INT,
    CourseName VARCHAR(50) NOT NULL,
    Department VARCHAR(50) NOT NULL,
    Credits INT NOT NULL,
    PRIMARY KEY (CourseID, Department)
);

CREATE TABLE Professors (
    ProfessorID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Department VARCHAR(50) NOT NULL
);

CREATE TABLE Enrollments (
    StudentID INT,
    CourseID INT,
    Department VARCHAR(50),
    Grade CHAR(1),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID, Department) REFERENCES Courses(CourseID, Department),
    PRIMARY KEY (StudentID, CourseID)
);

CREATE TABLE Teaches (
    ProfessorID INT,
    CourseID INT,
    Department VARCHAR(50),
    FOREIGN KEY (ProfessorID) REFERENCES Professors(ProfessorID),
    FOREIGN KEY (CourseID, Department) REFERENCES Courses(CourseID, Department),
    PRIMARY KEY (ProfessorID, CourseID)
);

CREATE TABLE Departments (
    Department VARCHAR(50) PRIMARY KEY,
    Budget FLOAT DEFAULT NULL
);

CREATE VIEW TwoTableRelationship AS
SELECT Students.FirstName, Students.LastName, Courses.CourseName
FROM Students
JOIN Enrollments ON Students.StudentID = Enrollments.StudentID
JOIN Courses ON Enrollments.CourseID = Courses.CourseID;

CREATE VIEW ThreeTableRelationship AS
SELECT Students.FirstName, Students.LastName, Courses.CourseName, Professors.FirstName AS ProfessorFirstName, Professors.LastName AS ProfessorLastName
FROM Students
JOIN Enrollments ON Students.StudentID = Enrollments.StudentID
JOIN Courses ON Enrollments.CourseID = Courses.CourseID
JOIN Teaches ON Courses.CourseID = Teaches.CourseID
JOIN Professors ON Teaches.ProfessorID = Professors.ProfessorID;
```