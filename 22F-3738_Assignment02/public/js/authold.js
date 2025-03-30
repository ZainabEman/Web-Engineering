document.addEventListener('DOMContentLoaded', function() {
    // Get the forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Form validation for login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            let isValid = true;

            // Reset previous validation states
            resetValidationState('email');
            resetValidationState('password');

            // Email validation
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Password validation
            if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters long');
                isValid = false;
            }

            if (isValid) {
                loginForm.submit();
            }
        });
    }

    // Form validation for registration
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const studentId = document.getElementById('studentId').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            let isValid = true;

            // Reset all validation states
            resetValidationState('firstName');
            resetValidationState('lastName');
            resetValidationState('email');
            resetValidationState('studentId');
            resetValidationState('phone');
            resetValidationState('password');
            resetValidationState('confirmPassword');
            resetValidationState('terms');

            // Name validation
            if (firstName.trim() === '') {
                showError('firstName', 'First name is required');
                isValid = false;
            }

            if (lastName.trim() === '') {
                showError('lastName', 'Last name is required');
                isValid = false;
            }

            // Email validation
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid university email address');
                isValid = false;
            }

            // Student ID validation
            if (!validateStudentId(studentId)) {
                showError('studentId', 'Please enter a valid student ID');
                isValid = false;
            }

            // Phone validation
            if (!validatePhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }

            // Password validation
            if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters long');
                isValid = false;
            }

            if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }

            // Terms validation
            if (!terms) {
                showError('terms', 'You must agree to the terms and conditions');
                isValid = false;
            }

            if (isValid) {
                registerForm.submit();
            }
        });
    }

    // Password visibility toggle
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.className = 'btn btn-link position-absolute end-0 top-50 translate-middle-y';
        toggleButton.innerHTML = '<i class="bi bi-eye"></i>';
        toggleButton.style.zIndex = '5';
        
        field.parentElement.style.position = 'relative';
        field.parentElement.appendChild(toggleButton);

        toggleButton.addEventListener('click', function() {
            const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
            field.setAttribute('type', type);
            toggleButton.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
        });
    });
});

// Utility functions
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function validateStudentId(studentId) {
    // Modify this regex based on your university's student ID format
    const re = /^\d{8}$/;
    return re.test(studentId);
}

function validatePhone(phone) {
    // Modify this regex based on your country's phone number format
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    
    // Create or update feedback div
    let feedback = field.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        field.parentNode.insertBefore(feedback, field.nextSibling);
    }
    feedback.textContent = message;
}

function resetValidationState(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('is-invalid');
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.remove();
        }
    }
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
});

function validateField(field) {
    resetValidationState(field.id);
    
    switch(field.id) {
        case 'email':
            if (!validateEmail(field.value)) {
                showError(field.id, 'Please enter a valid email address');
            }
            break;
            
        case 'password':
            if (field.value.length < 8) {
                showError(field.id, 'Password must be at least 8 characters long');
            }
            break;
            
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (field.value !== password) {
                showError(field.id, 'Passwords do not match');
            }
            break;
            
        case 'studentId':
            if (!validateStudentId(field.value)) {
                showError(field.id, 'Please enter a valid student ID');
            }
            break;
            
        case 'phone':
            if (!validatePhone(field.value)) {
                showError(field.id, 'Please enter a valid phone number');
            }
            break;
            
        default:
            if (field.value.trim() === '') {
                showError(field.id, `${field.previousElementSibling.textContent} is required`);
            }
    }
} 