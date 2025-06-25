document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedPassword = localStorage.getItem(username);
            if (storedPassword && storedPassword === password) {
                loginMessage.textContent = 'Login successful!';
                loginMessage.style.color = 'green';
                // Redirect to the home page or another page
                window.location.href = 'index.html';
            } else {
                loginMessage.textContent = 'Invalid username or password.';
                loginMessage.style.color = 'red';
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (localStorage.getItem(username)) {
                signupMessage.textContent = 'Username already exists.';
                signupMessage.style.color = 'red';
            } else {
                localStorage.setItem(username, password);
                signupMessage.textContent = 'Signup successful!';
                signupMessage.style.color = 'green';
                // Redirect to the login page
                window.location.href = 'login.html';
            }
        });
    }
});