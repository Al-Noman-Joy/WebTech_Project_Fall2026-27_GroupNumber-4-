
console.log("Connected");

// ADMIN REGISTRATION FUNCTION

function register_admin()
{
    let name = document.getElementById("AdminName").value.trim();
    let email = document.getElementById("AdminEmail").value.trim();
    let username = document.getElementById("NewUserName").value.trim();
    let password = document.getElementById("NewPassword").value;
    let confirm = document.getElementById("ConfirmPassword").value;

    let valid = true;

    // Error Messages

    document.getElementById("NameError").innerHTML = "";
    document.getElementById("EmailError").innerHTML = "";
    document.getElementById("UsernameError").innerHTML = "";
    document.getElementById("PasswordError").innerHTML = "";
    document.getElementById("ConfirmError").innerHTML = "";
    document.getElementById("RegisterMessage").innerHTML = "";

    // Name Validation

    if(name === "")
    {
        document.getElementById("NameError").innerHTML =
        "Please enter your full name.";

        valid = false;
    }

    // Email Validation

    if(email === "")
    {
        document.getElementById("EmailError").innerHTML =
        "Please enter your email address.";

        valid = false;
    }
    else if(!email.includes("@") || !email.includes("."))
    {
        document.getElementById("EmailError").innerHTML =
        "Please enter a valid email address.";

        valid = false;
    }

    // Username Validation

    if(username === "")
    {
        document.getElementById("UsernameError").innerHTML =
        "Please enter a username.";

        valid = false;
    }

    // Password Validation

    if(password === "")
    {
        document.getElementById("PasswordError").innerHTML =
        "Please enter a password.";

        valid = false;
    }
    else if(password.length < 6)
    {
        document.getElementById("PasswordError").innerHTML =
        "Password must contain at least 6 characters.";

        valid = false;
    }

    // Confirm Password Validation

    if(confirm === "")
    {
        document.getElementById("ConfirmError").innerHTML =
        "Please confirm your password.";

        valid = false;
    }
    else if(password !== confirm)
    {
        document.getElementById("ConfirmError").innerHTML =
        "Passwords do not match.";

        valid = false;
    }

    // Stop Registration if Validation Fails

    if(valid === false)
    {
        return false;
    }

    // Check Duplicate Registration

    if(localStorage.getItem("foodloop_admin") !== null)
    {
        alert("An Admin account is already registered.");
        return false;
    }

    // Check Special Character

    if(name.includes("|") || email.includes("|") ||
       username.includes("|") || password.includes("|"))
    {
        document.getElementById("RegisterMessage").style.color = "red";

        document.getElementById("RegisterMessage").innerHTML =
        "The | character is not allowed.";

        return false;
    }

    // Store Admin Information Without JSON

    let admin_data = name + "|" + email + "|" + username + "|" + password;

    localStorage.setItem("foodloop_admin", admin_data);

    // Registration Success Message

    alert("Admin Registration Successful! You can now login.");

    // Clear Form

    document.getElementById("AdminName").value = "";
    document.getElementById("AdminEmail").value = "";
    document.getElementById("NewUserName").value = "";
    document.getElementById("NewPassword").value = "";
    document.getElementById("ConfirmPassword").value = "";

    return false;
}

// ADMIN LOGIN FUNCTION


function login_data()
{
    console.log("Login function is working");

    let username = document.getElementById("UserName").value.trim();
    let password = document.getElementById("Password").value;

    // Clear Previous Messages

    document.getElementById("LoginUsernameError").innerHTML = "";
    document.getElementById("LoginPasswordError").innerHTML = "";
    document.getElementById("LoginMessage").innerHTML = "";

    let valid = true;

    // Check Username

    if(username === "")
    {
        document.getElementById("LoginUsernameError").innerHTML =
        "Please enter your username.";

        valid = false;
    }

    // Check Password

    if(password === "")
    {
        document.getElementById("LoginPasswordError").innerHTML =
        "Please enter your password.";

        valid = false;
    }

    if(valid === false)
    {
        return false;
    }

    // Get Admin Information

    let data = localStorage.getItem("foodloop_admin");

    if(data === null)
    {
        alert("No Admin account found. Please register first.");
        return false;
    }

    let admin = data.split("|");

    // Check Login Information

    if(username === admin[2] && password === admin[3] && admin.length === 4)
    {
        localStorage.setItem("foodloop_session", "admin|" + username);

        alert("Login Successful! Welcome to FoodLoop Admin.");
    }
    else
    {
        alert("Invalid Username or Password. Please try again.");
    }

    return false;
}


// ADMIN LOGOUT FUNCTION

function logout()
{
    localStorage.removeItem("foodloop_session");

    alert("You have successfully logged out.");

    window.location.href = "admin_login.html";

    return false;
}
