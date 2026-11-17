
console.log("Connected");

// Admin Registration Function

function register_admin()
{
    let name = document.getElementById("AdminName").value.trim();
    let email = document.getElementById("AdminEmail").value.trim();
    let username = document.getElementById("NewUserName").value.trim();
    let password = document.getElementById("NewPassword").value;
    let confirm = document.getElementById("ConfirmPassword").value;

    let valid = true;


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
        document.getElementById("RegisterMessage").style.color = "red";

        document.getElementById("RegisterMessage").innerHTML =
        "An Admin account is already registered.";

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

    // Admin Information 

    let admin_data = name + "|" + email + "|" + username + "|" + password;

    localStorage.setItem("foodloop_admin", admin_data);

    // Success Message

    document.getElementById("RegisterMessage").style.color = "green";

    document.getElementById("RegisterMessage").innerHTML =
    "Admin Registration Successful! You can now login.";

    // Clear Form

    document.getElementById("AdminName").value = "";
    document.getElementById("AdminEmail").value = "";
    document.getElementById("NewUserName").value = "";
    document.getElementById("NewPassword").value = "";
    document.getElementById("ConfirmPassword").value = "";

    return false;
}
