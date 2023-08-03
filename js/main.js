var users = [];
var loggedInUser = null;

function register() {
    var email = document.getElementById("emailName").value;
    var password = document.getElementById("passwordSignIn").value;
    var displayName = document.getElementById("loginName").value;

    if (!isValidEmail(email)) {
        alert("Invalid email address.");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Invalid password. Password should be at least 6 characters long.");
        return;
    }

    if (isEmailExist(email)) {
        alert("Email already exists. Please try a different email.");
        return;
    }

    users.push({ email: email, password: password, displayName: displayName });
    showLoginForm();

    localStorage.setItem("users", JSON.stringify(users));

    showLoginForm();
}

function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    if (!isValidEmail(email) || !isValidPassword(password)) {
        alert("Invalid email or password.");
        return;
    }

    var foundUser = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (foundUser) {
        loggedInUser = foundUser.displayName;
        showHomePage();
    } else {
        alert("Invalid email or password.");
    }
}


function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}

function isEmailExist(email) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true;
        }
    }
    return false;
}

function showRegistrationForm() {
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("homePage").style.display = "none";
}

function showLoginForm() {
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("homePage").style.display = "none";
}

function showHomePage() {
    document.getElementById("homePage").style.display = "block";
    document.getElementById("displayName").innerText = loggedInUser;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "none";
}

function logout() {
    loggedInUser = null;
    showLoginForm();
    clearInputs();
    localStorage.removeItem("users");
}

function clearInputs() {
    var inputs = document.querySelectorAll("#registrationForm input, #loginForm input");
    inputs.forEach(function(input) {
        input.value = "";
    });
}
window.onload = function () {
    var storedUsers = localStorage.getItem("users");
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
};