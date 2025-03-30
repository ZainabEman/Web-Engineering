// public/js/auth.js
document.addEventListener('DOMContentLoaded', function () {
  // Validate Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      // Example validation: check if email is valid and password is at least 8 characters
      const emailField = document.getElementById('email');
      const passwordField = document.getElementById('password');
      let valid = true;

      resetValidation(emailField);
      resetValidation(passwordField);

      if (!validateEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        valid = false;
      }

      if (passwordField.value.length < 8) {
        showError(passwordField, 'Password must be at least 8 characters long');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // Validate Registration Form if it exists
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('email');
      const studentId = document.getElementById('studentId');
      const phone = document.getElementById('phone');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      const terms = document.getElementById('terms');
      let valid = true;

      [firstName, lastName, email, studentId, phone, password, confirmPassword].forEach(resetValidation);

      if (firstName.value.trim() === '') {
        showError(firstName, 'First name is required');
        valid = false;
      }

      if (lastName.value.trim() === '') {
        showError(lastName, 'Last name is required');
        valid = false;
      }

      if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        valid = false;
      }

      if (!validateStudentId(studentId.value)) {
        showError(studentId, 'Please enter a valid student ID');
        valid = false;
      }

      if (!validatePhone(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        valid = false;
      }

      if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters long');
        valid = false;
      }

      if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        valid = false;
      }

      if (terms && !terms.checked) {
        showError(terms, 'You must agree to the terms and conditions');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // Password visibility toggle for all password fields
  const passwordFields = document.querySelectorAll('input[type="password"]');
  passwordFields.forEach((field) => {
    // Create toggle button element
    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'btn btn-link position-absolute';
    toggleButton.style.right = '10px';
    toggleButton.style.top = '50%';
    toggleButton.style.transform = 'translateY(-50%)';
    toggleButton.innerHTML = '<i class="bi bi-eye"></i>';

    // Ensure parent is positioned relatively
    if (field.parentElement) {
      field.parentElement.style.position = 'relative';
      field.parentElement.appendChild(toggleButton);
    }

    toggleButton.addEventListener('click', function () {
      const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
      field.setAttribute('type', type);
      toggleButton.innerHTML =
        type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    });
  });

  // Utility functions for validation
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  function validateStudentId(studentId) {
    // Customize regex as per your institution's format; example here expects 8 digits.
    const re = /^\d{8}$/;
    return re.test(studentId);
  }

  function validatePhone(phone) {
    // Basic phone validation; adjust according to locale if needed.
    const re = /^\+?[\d\s\-]{10,}$/;
    return re.test(phone);
  }

  function showError(field, message) {
    field.classList.add('is-invalid');
    let feedback = field.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      field.parentNode.insertBefore(feedback, field.nextSibling);
    }
    feedback.textContent = message;
  }

  function resetValidation(field) {
    if (!field) return;
    field.classList.remove('is-invalid');
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.remove();
    }
  }
});
