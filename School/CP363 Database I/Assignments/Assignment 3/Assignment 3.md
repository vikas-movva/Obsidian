## Question 1
Consider the following relational schema describing the data for a particular instructor's grade book. 
`COURSE_CATALOG (Cno, Ctitle) `
`STUDENT (Sid, Fname, Lname, Minit) `
`COURSE (Term, Sec_no, Cno, A, B, C, D) `
`ENROLLS (Sid, Term, Sec_no)` 
Specify the following queries using relational algebra.
### 1.1
Find a specific student's enrollment details (Term and Sec_no) (You can assume any student ID):

>[!Answer]
>$\pi\_$Term, Sec_no ($\sigma\_$_Sid='S123' (ENROLLS))
### 1.2
List students enrolled in any class during the fall 2009 term:

>[!Answer]
>$\pi\_$Sid ($\sigma\_$Term='Fall 2009' (ENROLLS))
### 1.3
Retrieve the Sid values of students enrolled in CP363 or CP164:

>[!Answer]
>$\pi\_$Sid (($\sigma\_$_Cno='CP363' (ENROLLS)) $\cup$ ($\sigma\_$Cno='CP164' (ENROLLS)))
### 1.4
Retrieve the names of students who have not enrolled in any class:

>[!Answer]
>$\pi\_$Fname, Lname (STUDENT) - $\pi\_$Fname, Lname ((STUDENT $\Join$ Sid=Sid ENROLLS))

## Question 2
Let's consider a generic schema with two tables:
`EMPLOYEES (EmpID, EmpName, Department, Salary, ManagerID)`
`PROJECTS (ProjectID, ProjectName, Department, Budget)`
`ASSIGNMENTS (EmpID, ProjectID, HoursWorked)`
What will be the result of the following queries written in relational algebra:
### 2.1
$\pi\_$ProjectID, ProjectName, Budget ($\sigma\_{}$Budget > ($\pi\_$AVG(Budget) (PROJECTS))

>[!Answer]
>This will return the columns: `ProjectID`, `ProjectName`, and `Budget` for all projects where the  budget is greater than the average budget of all projects.
### 2.2
$\pi\_$EmpID, EmpName (($\sigma\_{}$Department='IT' (ASSIGNMENTS $\Join$ PROJECTS)) $\cap$ ($\sigma\_{}$Department='Finance' (ASSIGNMENTS $\Join$ PROJECTS))

>[!Answer]
>This will return the columns `EmpID` and `EmpName` of **only** employees who are assigned to a project in **both** the `IT` and `Finance` departments. 
### 2.3
Department, AVG(HoursWorked) (ASSIGNMENTS $\Join$ PROJECTS) | (Group by Department)

>[!Answer]
>This will return the `Department` and the average `HoursWorked` by employees in each department.
### 2.4
$\pi\_$ManagerID, EmpName (EMPLOYEES $\Join$ $\rho\_$EmpID=ManagerID (EMPLOYEES))

>[!Answer]
>This will return the `ManagerID` and `EmpName` of all employees who are managers.

## Question 3
Based on the given data, you have to answer the following questions:

| StudentID | StudentAddress                                                           | Contactno                                |
| --------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| S001      | 8 Jefferson Way, Portland, OR 97201                                      | 503-555-3618, 503-555-2727, 503-555-6534 |
| S002      | City Center Plaza, Seattle, WA 98122                                     | 206-555-6756, 206-555-8836               |
| S003      | 14 – 8th Avenue, New York, NY 10012                                      | 212-371-3000                             |
| S004      | 16 – 14th Avenue, Seattle, WA 98128                                      | 206-555-3131, 206-555-4112               |
| S005      | 14 – 8th Avenue, New York, NY 10012, 16 – 14th Avenue, Seattle, WA 98128 | 503-444-123, 219-564-890                 |

### 3.1
Determine whether the table is in 1NF or not. You must check whether the table follows the first normal form rules to do this. If it does, it is in 1NF; otherwise, it is not. 

>[!Answer]
>This table is not in the **First Normal Form (1NF)**. This is because in order for a table to be in the 1NF every attribute of a table must be an indivisible(atomic) value however `StudentID`'s `S001, S002, S003, S004, S005` all have multiple values in the `Contactno` field and `S1005` has multiple values in the `StrudentAddress` field.
### 3.2
Convert the table to 3NF. This means analyzing the table and ensuring its data is organized to satisfy the third normal form rules. This includes ensuring that each attribute in the table depends on the primary key and that there are no transitive dependencies between non-key attributes.

>[!Answer]
>According to the Normalization rules 3NF must be in 2NF and 2NF must be in 1NF.
 Therefore the first step is to convert the table into 1NF:
>
>|StudentID | StudentAddress                       | Contactno    |
| --------- | ------------------------------------ | ------------ |
| S001      | 8 Jefferson Way, Portland, OR 97201  | 503-555-3618 |
| S001      | 8 Jefferson Way, Portland, OR 97201  | 503-555-2727 |
| S001      | 8 Jefferson Way, Portland, OR 97201  | 503-555-6534 |
| S002      | City Center Plaza, Seattle, WA 98122 | 206-555-6756 |
| S002      | City Center Plaza, Seattle, WA 98122 | 206-555-8836 |
| S003      | 14 – 8th Avenue, New York, NY 10012  | 212-371-3000 |
| S004      | 16 – 14th Avenue, Seattle, WA 98128  | 206-555-3131 |
| S004      | 16 – 14th Avenue, Seattle, WA 98128  | 206-555-4112 |
| S005      | 14 – 8th Avenue, New York, NY 10012  | 503-444-123  |
| S005      | 16 – 14th Avenue, Seattle, WA 98128  | 503-444-123  |
| S005      | 14 – 8th Avenue, New York, NY 10012  | 219-564-890  |
| S005      | 16 – 14th Avenue, Seattle, WA 98128  | 219-564-890  |
>
Then we check if this table satisfies the requirements of 2NF which it does because all non-key attributes are dependent on the primary key
>
>Then we check if this table satisfies the requirements of 3NF which it does because there are no transitive dependencies
