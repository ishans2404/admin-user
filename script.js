let users = [
    { username: "faculty", password: "faculty123", isAdmin: true, registeredCourses: [] },
    { username: "ishan", password: "ishan123", isAdmin: false, registeredCourses: [] },
];

let currentUser = null;

function renderLoginForm() {
    const adminBtn = document.getElementById('adminBtn');
    const userBtn = document.getElementById('userBtn');

    adminBtn.addEventListener('click', function() {
        adminBtn.style.backgroundColor = "rgba(159, 159, 159, 0.4)"; 
        userBtn.style.backgroundColor = ""; 
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            loginUser(username, password, true); 
        });
    });

    userBtn.addEventListener('click', function() {
        userBtn.style.backgroundColor = "rgba(159, 159, 159, 0.4)"; 
        adminBtn.style.backgroundColor = ""; 
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            loginUser(username, password, false); 
        });
    });
}


function loginUser(username, password, isAdmin) {
    const client = users.find(u => u.username === username && u.password === password && u.isAdmin === isAdmin);
    if(client) {
        currentUser = client;
        if(client.isAdmin) window.location.href = "admin_dashboard.html";
        else window.location.href = "user_dashboard.html";
    } 
    else {
        alert('Invalid username or password');
        renderLoginForm();
    }
}

renderLoginForm();
