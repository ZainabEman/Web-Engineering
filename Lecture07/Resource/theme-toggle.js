// theme-toggle.js

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-icon');
    const body = document.body;

    // Initialize the default theme as light-mode if not already set
    if (!body.classList.contains('dark-mode') && !body.classList.contains('light-mode')) {
        body.classList.add('light-mode');  // Default to light mode
        themeToggle.textContent = '🌞';  // Sun emoji for light mode
    }

    // Event listener for clicking the theme toggle icon
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            themeToggle.textContent = '🌞';  // Change to sun emoji
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            themeToggle.textContent = '🌙';  // Change to moon emoji
        }
    });
});
