let role = "donor";

function add_demo_user()
{
    let data = localStorage.getItem("foodloop_users");
    if(data === null)
    {
        data = "";
    }
    if(data.indexOf("|donor_demo|") === -1)
    {
        localStorage.setItem("foodloop_users", data + "donor|Shariar Rifat|Area 1|House 5|Prepared food|donor_demo|DonorDemo123|Approved\n");
    }
}

function get_users()
{
    let data = localStorage.getItem("foodloop_users");
    let users = [];
    if(data === null)
    {
        return users;
    }
    let lines = data.split("\n");
    for(let i = 0; i < lines.length; i++)
    {
        if(lines[i] === "")
        {
            continue;
        }
        let f = lines[i].split("|");
        users.push({
            role: f[0],
            username: f[5],
            password: f[6],
            status: f[7]
        });
    }
    return users;
}

function login_data()
{
    let user = document.getElementById("UserName").value.trim();
    let pass = document.getElementById("Password").value;
    let error = document.getElementById("LoginError");
    if(user === "" || pass === "")
    {
        error.innerHTML = "Enter User Name And Password";
        return false;
    }
    add_demo_user();
    let users = get_users();
    for(let i = 0; i < users.length; i++)
    {
        if(users[i].role === role && users[i].username === user && users[i].password === pass)
        {
            if(users[i].status === "Approved")
            {
                localStorage.setItem("foodloop_role", role);
                localStorage.setItem("foodloop_username", user);
                window.location.href = role + "_dashboard.html";
            }
            else if(users[i].status === "Rejected")
            {
                error.innerHTML = "Your Registration Was Rejected By Admin";
            }
            else
            {
                error.innerHTML = "Your Account Is Waiting For Admin Approval";
            }
            return false;
        }
    }
    error.innerHTML = "Wrong User Name Or Password";
    return false;
}