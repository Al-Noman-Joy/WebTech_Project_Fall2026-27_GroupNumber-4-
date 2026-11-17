
console.log("Connected");

let role = "receiver";
let gender_value = "";
let extra_value = "";

// Registration
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
    let message = document.getElementById("Message");

    message.style.color = "green";
    message.innerHTML = "Registration Successful";

    document.querySelector("form").reset();
}
