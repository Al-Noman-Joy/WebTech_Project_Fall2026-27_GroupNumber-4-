console.log("Connected");
let role = "admin";

function get_users()
{
    let data = localStorage.getItem("foodloop_users");
    if(data === null)
    {
        return [];
    }
    return JSON.parse(data);
}

function safe(text)
{
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function logout()
{
    localStorage.removeItem("foodloop_session");
    window.location.href = "index.html";
    return false;
}

function check_session()
{
    let session = JSON.parse(localStorage.getItem("foodloop_session"));
    if(session === null || session.role !== role)
    {
        window.location.href = "index.html";
        return null;
    }
    return session;
}

// Login  
function login_data()
{
    let user = document.getElementById("UserName").value.trim();
    let pass = document.getElementById("Password").value;
    let error = document.getElementById("LoginError");
    if(user === "admin" && pass === "admin123")
    {
        localStorage.setItem("foodloop_session", JSON.stringify({role: role, username: user}));
        window.location.href = "admin_dashboard.html";
    }
    else
    {
        error.innerHTML = "Wrong User Name Or Password";
    }
    return false;
}

// Dashboard
function show_dashboard()
{
    let session = check_session();
    if(session === null)
    {
        return;
    }
    document.getElementById("WelcomeText").innerHTML = "Welcome, Admin";
    let users = get_users();
    let pending = 0;
    let approved = 0;
    let rows = "<tr><th>Name</th><th>User Type</th><th>Email</th><th>Status</th><th>Action</th></tr>";
    if(users.length === 0)
    {
        rows += '<tr><td colspan="5">No Registration Yet</td></tr>';
    }
    for(let i = 0; i < users.length; i++)
    {
        let action = "-";
        if(users[i].status === "Pending")
        {
            pending++;
            action = '<input type="button" value="Approve" onclick="approve_user(' + i + ')"> <input type="button" value="Reject" onclick="reject_user(' + i + ')">';
        }
        if(users[i].status === "Approved")
        {
            approved++;
        }
        rows += "<tr><td>" + safe(users[i].name) + "</td><td>" + users[i].role + "</td><td>" + safe(users[i].email) + "</td><td>" + users[i].status + "</td><td>" + action + "</td></tr>";
    }
    document.getElementById("UserTable").innerHTML = rows;
    document.getElementById("TotalUsers").innerHTML = users.length;
    document.getElementById("PendingUsers").innerHTML = pending;
    document.getElementById("ApprovedUsers").innerHTML = approved;
}

function change_status(index, status)
{
    let users = get_users();
    users[index].status = status;
    localStorage.setItem("foodloop_users", JSON.stringify(users));
    show_dashboard();
}

function approve_user(index)
{
    change_status(index, "Approved");
}

function reject_user(index)
{
    change_status(index, "Rejected");
}
