document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedInUser')) {
        showProfile();
    }
});

function showLogin() {
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('signup-container').classList.add('hidden');
}

function showSignUp() {
    document.getElementById('signup-container').classList.remove('hidden');
    document.getElementById('login-container').classList.add('hidden');
}

function showProfile() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('profile-container').classList.remove('hidden');
    document.getElementById('username-display').innerText = localStorage.getItem('loggedInUser');
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        document.getElementById('profile-image').src = profileImage;
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        showProfile();
    } else {
        alert('Invalid credentials');
    }
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    if (username && password) {
        localStorage.setItem(username, password);
        localStorage.setItem('loggedInUser', username);
        showProfile();
    } else {
        alert('Please enter a username and password');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('profile-container').classList.add('hidden');
}

document.getElementById('upload-image').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;
            document.getElementById('profile-image').src = dataURL;
            localStorage.setItem('profileImage', dataURL);
        };
        reader.readAsDataURL(file);
    }
});
