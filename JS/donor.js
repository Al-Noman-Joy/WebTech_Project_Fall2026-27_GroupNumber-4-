let role = "donor";
let extra_value = "";

function clean(text)
{
    return String(text).replace(/[|\n\r]/g, " ");
}

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
            name: f[1],
            area: f[2],
            address: f[3],
            extra: f[4],
            username: f[5],
            password: f[6],
            status: f[7]
        });
    }
    return users;
}

// ---------- Registration ----------
function collect_data()
{
    let validname = collect_name();
    let validarea = validArea();
    let validextra = validExtra();
    let validuser = validUser();

    if(validname && validarea && validextra && validuser)
    {
        save_user();
    }
    return false;
}

function collect_name()
{
    let PName = document.getElementById("FullName").value.trim();
    let PError = document.getElementById("NameError");
    if(PName === "")
    {
        PError.innerHTML = "Enter The Name";
        return false;
    }
    if(PName.length < 6)
    {
        PError.innerHTML = "Name Must Be atleast 6 Char";
        return false;
    }
    PError.innerHTML = "";
    return true;
}

function validArea()
{
    let Area = document.getElementById("Area").value;
    let error = document.getElementById("AreaError");
    if(Area === "")
    {
        error.innerHTML = "Please select your area";
        return false;
    }
    error.innerHTML = "";
    return true;
}

function validExtra()
{
    //Checkbox
    let extras = document.querySelectorAll('input[name="extra"]');
    let error = document.getElementById("ExtraError");
    let selected = [];
    for(let i = 0; i < extras.length; i++)
    {
        if(extras[i].checked)
        {
            selected.push(extras[i].value);
        }
    }
    if(selected.length === 0)
    {
        error.innerHTML = "Please select at least one option";
        return false;
    }
    extra_value = selected.join(", ");
    error.innerHTML = "";
    return true;
}

function user_exists(user)
{
    let users = get_users();
    if(user === "admin" || user === "donor_demo")
    {
        return true;
    }
    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username === user)
        {
            return true;
        }
    }
    return false;
}

function validUser()
{
    let user = document.getElementById("UserName").value.trim();
    let pass = document.getElementById("Password").value;
    let uerror = document.getElementById("UserError");
    let perror = document.getElementById("PassError");
    let valid = true;
    if(user.length < 4)
    {
        uerror.innerHTML = "User Name Must Be atleast 4 Char";
        valid = false;
    }
    else if(user_exists(clean(user)))
    {
        uerror.innerHTML = "User Name Already Taken";
        valid = false;
    }
    else
    {
        uerror.innerHTML = "";
    }
    if(pass.length < 6)
    {
        perror.innerHTML = "Password Must Be atleast 6 Char";
        valid = false;
    }
    else
    {
        perror.innerHTML = "";
    }
    return valid;
}

function save_user()
{
    let record = [
        role,
        clean(document.getElementById("FullName").value.trim()),
        document.getElementById("Area").value,
        clean(document.getElementById("Address").value.trim()),
        extra_value,
        clean(document.getElementById("UserName").value.trim()),
        clean(document.getElementById("Password").value),
        "Approved"
    ].join("|");
    let data = localStorage.getItem("foodloop_users");
    if(data === null)
    {
        data = "";
    }
    localStorage.setItem("foodloop_users", data + record + "\n");

    let message = document.getElementById("Message");
    message.style.color = "green";
    message.innerHTML = "Registration Successful. You Can Now Login.";

    let form = document.getElementById("RegForm");
    if(form !== null)
    {
        form.reset();
    }
}

// ---------- Login ----------
function login_data()
{
    let user = document.getElementById("UserName").value.trim();
    let pass = document.getElementById("Password").value;
    let error = document.getElementById("LoginError");
    if(user === "" || pass === "")
    {
        error.style.color = "#c0392b";
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
                error.style.color = "green";
                error.innerHTML = "Login Successful. Welcome, " + users[i].name;
            }
            else if(users[i].status === "Rejected")
            {
                error.style.color = "#c0392b";
                error.innerHTML = "Your Registration Was Rejected By Admin";
            }
            else
            {
                error.style.color = "#c0392b";
                error.innerHTML = "Your Account Is Waiting For Admin Approval";
            }
            return false;
        }
    }
    error.style.color = "#c0392b";
    error.innerHTML = "Wrong User Name Or Password";
    return false;
}