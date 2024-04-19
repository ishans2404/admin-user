let courses = [
    { id: 1, name: "Calculus", schedule: "Mon/Wed/Fri 9-11 AM", registeredUsers: ["Priya", "Swati", "Ayaan"] },
    { id: 2, name: "Data Structures & Algorithms", schedule: "Tue/Thu 1-3 PM", registeredUsers: ["Sai", "Rudra", "Neha"] },
    // { id: 3, name: "Microprocessors", schedule: "Wed/Thu/Fri 4-5 PM", registeredUsers: ["Ankit", "Priya", "Neha"] },
];

let users = [
    { username: "faculty", password: "faculty123", isAdmin: true, registeredCourses: [] },
    { username: "ishan", password: "ishan123", isAdmin: false, registeredCourses: [] },
];

let currentUser = users[0];

function renderAdminDashboard() {
    let courseList = '<h2>Course Management</h2>';
    courseList += '<button onclick="renderCourseForm()">Add New Course</button> <br><br>';
    courseList += '<table>';
    courseList += '<tr><th>ID</th><th>Name</th><th>Schedule</th><th>Registered Users</th><th>Action</th></tr>';
    courses.forEach(course => {
        courseList += `<tr>
                            <td data-label="ID">${course.id}</td>
                            <td data-label="Name">${course.name}</td>
                            <td data-label="Schedule">${course.schedule}</td>
                            <td data-label="Registered Users">${course.registeredUsers.join(', ')}</td>
                            <td data-label="Action"><button onclick="modifyCourse(${course.id})">Modify</button>   <button onclick="deleteCourse(${course.id})">Delete</button></td>
                        </tr>`;
    });
    courseList += '</table>';
    document.getElementById('content').innerHTML = courseList;
}

function renderCourseForm() {
    document.getElementById('content').innerHTML = `
        <h2>   Add New Course</h2>
        <form id="courseForm">
            <input type="text" id="courseName" placeholder="Course Name" required>
            <input type="text" id="courseSchedule" placeholder="Schedule" required>
            <button type="submit">Add Course</button>
        </form>
    `;
    document.getElementById('courseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('courseName').value;
        const schedule = document.getElementById('courseSchedule').value;
        addCourse(name, schedule);
    });
}

function addCourse(name, schedule) {
    const id = courses.length + 1;
    courses.push({ id, name, schedule, registeredUsers: [] });
    renderAdminDashboard();
}

function deleteCourse(courseId) {
    const index = courses.findIndex(course => course.id === courseId);
    courses.splice(index, 1);
    renderAdminDashboard();

}

function modifyCourse(courseId) {
    const courseIndex = courses.findIndex(course => course.id === courseId);
    const currentCourse = courses[courseIndex];
    document.getElementById('content').innerHTML = `
        <h2>Modify Course</h2>
        <form id="modifyCourseForm">
            <input type="text" id="modifiedCourseName" placeholder="Course Name" value="${currentCourse.name}" required>
            <input type="text" id="modifiedCourseSchedule" placeholder="Schedule" value="${currentCourse.schedule}" required>
            <button type="submit">Save Changes</button>
        </form>
    `;
    document.getElementById('modifyCourseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newName = document.getElementById('modifiedCourseName').value;
        const newSchedule = document.getElementById('modifiedCourseSchedule').value;
        if(newName && newSchedule) {
            courses[courseIndex].name = newName;
            courses[courseIndex].schedule = newSchedule;
            alert("Course modified successfully!");
            renderAdminDashboard();
        }
        else alert("Please fill out all fields.");
    });
}

function renderUserStatus() {
    const status = currentUser ? `Admin: Logged in as ${currentUser.username}` : 'Not logged in';
    const logoutButton = currentUser ? `<button onclick="logout()">Logout</button>` : '';
    document.getElementById('userStatus').innerHTML = `${status} ${logoutButton}`;
}

function logout() {
    currentUser = null;
    window.location.href = "index.html";
}

function goBack() {
    renderAdminDashboard();
}

renderAdminDashboard();
renderUserStatus();