

console.log("Connected");
 
let role = "receiver";
 
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
 
// ---------- Default Receiver Account ----------
 
function create_default_user()

{

    let users = get_users();

    let found = false;
 
    for(let i = 0; i < users.length; i++)

    {

        if(users[i].username === "sadia12")

        {

            users[i].role = "receiver";

            users[i].password = "sadia123";

            users[i].status = "Approved";

            found = true;

            break;

        }

    }
 
    if(found === false)

    {

        users.push({

            role: "receiver",

            name: "Sadia",

            email: "sadia@example.com",

            gender: "Female",

            area: "Dhaka",

            address: "",

            extra: "",

            username: "sadia12",

            password: "sadia123",

            status: "Approved"

        });

    }
 
    localStorage.setItem("foodloop_users", JSON.stringify(users));

}
 
create_default_user();
 
let gender_value = "";

let extra_value = "";
 
// ---------- Registration ----------
 
function collect_data()

{

    let validname = collect_name();

    let validemail = validateEmail();

    let ValidGenders = ValidGender();

    let validarea = validArea();

    let validextra = validExtra();

    let validuser = validUser();
 
    if(validname && validemail && ValidGenders && validarea && validextra && validuser)

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
 
function validateEmail()

{

    let Email = document.getElementById("Email").value.trim();

    let Error = document.getElementById("EmailError");

    let Expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if(Email === "")

    {

        Error.innerHTML = "Please Enter The Email";

        return false;

    }

    else if(!Expression.test(Email))

    {

        Error.innerHTML = "Please Enter The Email Again";

        return false;

    }
 
    Error.innerHTML = "";

    return true;

}
 
function ValidGender()

{

    // Radio buttons
 
    let genders = document.querySelectorAll('input[name="gender"]');

    let error = document.getElementById("GenderError");
 
    gender_value = "";
 
    for(let i = 0; i < genders.length; i++)

    {

        if(genders[i].checked)

        {

            gender_value = genders[i].value;

            break;

        }

    }
 
    if(gender_value === "")

    {

        error.innerHTML = "Please select the gender";

        return false;

    }
 
    error.innerHTML = "";

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

    // Checkbox
 
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
 
    if(user === "admin")

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

    else if(user_exists(user))

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

    let users = get_users();
 
    users.push({

        role: role,

        name: document.getElementById("FullName").value.trim(),

        email: document.getElementById("Email").value.trim(),

        gender: gender_value,

        area: document.getElementById("Area").value,

        address: document.getElementById("Address").value.trim(),

        extra: extra_value,

        username: document.getElementById("UserName").value.trim(),

        password: document.getElementById("Password").value,

        status: "Pending"

    });
 
    localStorage.setItem("foodloop_users", JSON.stringify(users));
 
    document.getElementById("RegForm").reset();
 
    let message = document.getElementById("Message");
 
    message.style.color = "green";

    message.innerHTML = "Registration Successful. Please Wait For Admin Approval Before Login.";

}
 
// ---------- Login ----------
 
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
 
    let users = get_users();
 
    for(let i = 0; i < users.length; i++)

    {

        if(users[i].role === role && users[i].username === user && users[i].password === pass)

        {

            if(users[i].status === "Approved")

            {

                localStorage.setItem("foodloop_session", JSON.stringify({

                    role: role,

                    username: user

                }));
 
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
 
// ---------- Dashboard ----------
 
function show_dashboard()

{

    let session = check_session();
 
    if(session === null)

    {

        return;

    }
 
    let users = get_users();
 
    for(let i = 0; i < users.length; i++)

    {

        if(users[i].role === role && users[i].username === session.username)

        {

            document.getElementById("WelcomeText").innerHTML = "Welcome, " + safe(users[i].name);
 
            document.getElementById("ProfileEmail").innerHTML = safe(users[i].email);
 
            document.getElementById("ProfileArea").innerHTML = safe(users[i].area);
 
            document.getElementById("ProfileExtra").innerHTML = safe(users[i].extra);
 
            document.getElementById("ProfileStatus").innerHTML = safe(users[i].status);
 
            return;

        }

    }
 
    logout();

}

 