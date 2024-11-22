# School Management System
API Documentation: https://documenter.getpostman.com/view/37386561/2sAYBSkDjy

 __Setup Process__

1. Clone the repository:
```
git clone <repository-url>
cd school-management-system
```

3. Install dependencies:
   ```
   npm install
   ```
4. Set up the .env file by copying .env.example:
```
   cp .env.example .env
```
6. Star the Server:
```
   npm start
   The server will run on http://localhost:5000.
```

__API Endpoints__

Authentication:
* POST /api/auth/login User authentication (returns JWT).

Students:
* POST /api/students/addStudent: Add a new student. 
* GET /api/students/allStudents: Get all students (supports pagination). 
* GET /api/students/:id: Get a single student by ID. 
* PUT /api/students/:id: Update a student's details. 
* DELETE /api/students/update/:id: Delete a student. 
* PUT /api/students/id:/profile-image: Upload and update the profile image of a student using Cloudinary. 

Teacher:
* POST /api/teachers/addTeacher: Add a new teacher.
* GET /api/teachers/allTeachers: Get all Teachers (supports pagination).
* GET /api/teachers/:id: Get a single Teacher by ID.
* PUT /api/teachers/:id: Update a teacher's details.
* DELETE /api/teachers/update/:id: Delete a Teacher.
* PUT /api/teachers/id:/profile-image: Upload and update the profile image of a teacher using Cloudinary.

Classes:
* POST /api/classes/createClass: Create a new class.
* GET /api/classes: Get all classes (supports pagination).
* PUT /api/classes/update/:id: Update a class by its ID.
* DELETE /api/classes/delete/:id: Delete a class by its ID.

__Features__
* Pagination for "Get All" endpoints.
* Cloudinary integration for profile image uploads.
* JWT-based authentication.
* Detailed error handling and validation.

