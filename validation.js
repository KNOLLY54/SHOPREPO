const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');

const togglePassword = document.getElementById('toggle-password');
const showIcon = document.getElementById('show-icon');
const hideIcon = document.getElementById('hide-icon');

// Optional elements for signup form
const firstname_input = document.getElementById('firstname-input');
const repeatpassword_input = document.getElementById('repeat-password-input');
const toggleRepeatPassword = document.getElementById('toggle-repeat-password');
const showRepeatIcon = document.getElementById('show-repeat-icon');
const hideRepeatIcon = document.getElementById('hide-repeat-icon');

togglePassword.addEventListener('click', () => {
    const type = password_input.getAttribute('type') === 'password' ? 'text' : 'password';
    password_input.setAttribute('type', type);
    showIcon.style.display = type === 'password' ? 'block' : 'none';
    hideIcon.style.display = type === 'password' ? 'none' : 'block';
});

if (toggleRepeatPassword) {
    toggleRepeatPassword.addEventListener('click', () => {
        const type = repeatpassword_input.getAttribute('type') === 'password' ? 'text' : 'password';
        repeatpassword_input.setAttribute('type', type);
        showRepeatIcon.style.display = type === 'password' ? 'block' : 'none';
        hideRepeatIcon.style.display = type === 'password' ? 'none' : 'block';
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let errors = [];
    if (firstname_input && repeatpassword_input) {
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeatpassword_input.value);
    } else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        error_message.innerText = errors.join('. ');
    } else {
        // Redirect to profile.html after successful login/signup
        window.location.href = 'profile.html';
    }
});

function getSignupFormErrors(firstname, email, password, repeatpassword) {
    let errors = [];

    if (firstname === '' || firstname == null) {
        errors.push('First Name is required');
        firstname_input.parentElement.classList.add('incorrect');
    }

    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!validateEmail(email)) {
        errors.push('Email is not valid');
        email_input.parentElement.classList.add('incorrect');
    }

    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    } else {
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push('Password must contain at least one special character');
            password_input.parentElement.classList.add('incorrect');
        }
    }

    if (password !== repeatpassword) {
        errors.push('Passwords do not match');
        password_input.parentElement.classList.add('incorrect');
        repeatpassword_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!validateEmail(email)) {
        errors.push('Email is not valid');
        email_input.parentElement.classList.add('incorrect');
    }

    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    } else {
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
            password_input.parentElement.classList.add('incorrect');
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push('Password must contain at least one special character');
            password_input.parentElement.classList.add('incorrect');
        }
    }

    return errors;
}

// Utility function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const allInputs = [firstname_input, email_input, password_input, repeatpassword_input].filter(Boolean);
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    });
});

