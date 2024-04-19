let courses = [
    { id: 1, name: "Calculus", schedule: "Mon/Wed/Fri 9-11 AM", registeredUsers: ["Priya", "Swati", "Ayaan"] },
    { id: 2, name: "Data Structures & Algorithms", schedule: "Tue/Thu 1-3 PM", registeredUsers: ["Sai", "Rudra", "Neha"] },
    // { id: 3, name: "Microprocessors", schedule: "Wed/Thu/Fri 4-5 PM", registeredUsers: ["Ankit", "Priya", "Neha"] },
];

let users = [
    { username: "faculty", password: "faculty123", isAdmin: true, registeredCourses: [] },
    { username: "ishan", password: "ishan123", isAdmin: false, registeredCourses: [] },
];


let currentUser = users[1];

function renderUserDashboard() {
    let courseList = '<h2>Available Courses</h2>';
    courseList += '<table>';
    courseList += '<tr><th>ID</th><th>Name</th><th>Schedule</th><th>Action</th></tr>';
    courses.forEach(course => {
        const isRegistered = currentUser.registeredCourses.includes(course.name);
        const buttonColor = isRegistered ? 'rgba(159, 159, 159, 0.4)' : '';

        courseList += `<tr>
                            <td data-label="ID">${course.id}</td>
                            <td data-label="Name">${course.name}</td>
                            <td data-label="Schedule">${course.schedule}</td>
                            <td>
                                <button onclick="registerCourse(${course.id})" style="background-color: ${buttonColor};">Register</button>
                                <button onclick="deleteRegisteredCourse('${course.name}')">Delete Registration</button>
                            </td>
                        </tr>`;
    });
    courseList += '</table>';
    courseList += '<div id="view_pay"><button onclick="viewRegisteredCourses()">View Registered Courses</button><button onclick="payFees()">Pay Fees</button></div>';
    document.getElementById('content').innerHTML = courseList;
}


function registerCourse(courseId) {
    const course = courses.find(course => course.id === courseId);
    if (course) {
        if (!currentUser.registeredCourses.includes(course.name)) {
            course.registeredUsers.push(currentUser.username);
            currentUser.registeredCourses.push(course.name);
            renderUserDashboard();
        } else {
            alert("You're already registered for this course.");
        }
    }
}


function deleteRegisteredCourse(courseName) {
    const courseIndex = currentUser.registeredCourses.indexOf(courseName);
    currentUser.registeredCourses.splice(courseIndex, 1);
    const course = courses.find(course => course.name === courseName);
    if(course) {
        const userIndex = course.registeredUsers.indexOf(currentUser.username);
        if (userIndex !== -1) {
            course.registeredUsers.splice(userIndex, 1);
            renderUserDashboard();
        }
    }
}


function viewRegisteredCourses() {
    if(currentUser.registeredCourses.length === 0) {
        alert("You haven't registered any courses yet.");
    } 
    else {
        let registeredCoursesList = '<h2>Registered Courses</h2>';
        registeredCoursesList += '<table>';
        registeredCoursesList += '<tr><th>ID</th><th>Name</th><th>Schedule</th></tr>';
        currentUser.registeredCourses.forEach(courseName => {
            const course = courses.find(c => c.name === courseName);
            registeredCoursesList += `<tr>
                                            <td>${course.id}</td>
                                            <td>${course.name}</td>
                                            <td>${course.schedule}</td>
                                        </tr>`;
        });
        registeredCoursesList += '</table>';
        document.getElementById('content').innerHTML = registeredCoursesList;
    }
}

function payFees() {
    alert("Processing payment... Please wait.");
    try {
        setTimeout(2000);
        alert("Payment processed successfully!");
    } 
    catch(error) {
        alert("Payment failed. Please try again later.");
    }
}

function renderUserStatus() {
    const status = currentUser ? `User: Logged in as ${currentUser.username}` : 'Not logged in';
    const logoutButton = currentUser ? `<button onclick="logout()">Logout</button>` : '';
    document.getElementById('userStatus').innerHTML = `${status} ${logoutButton}`;
}

function logout() {
    currentUser = null;
    window.location.href = "index.html";
}

function back() {
    renderUserDashboard();
}

renderUserDashboard();
renderUserStatus();