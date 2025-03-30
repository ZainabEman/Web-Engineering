// public/js/common.js
// A module for common utility functions
const App = (function () {
  /**
   * Show a temporary notification on the screen.
   * @param {string} message - The message to display.
   * @param {string} [type='info'] - The type of notification ('info', 'success', 'warning', 'error').
   * @param {number} [duration=3000] - Duration in milliseconds to show the notification.
   */
  function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `app-notification alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = 1050; // Above modal/dialog if needed
    notification.textContent = message;

    // Append to body
    document.body.appendChild(notification);

    // Remove after the specified duration
    setTimeout(() => {
      notification.remove();
    }, duration);
  }

  /**
   * Confirm an action with a browser dialog.
   * @param {string} message - The confirmation message.
   * @returns {boolean} - True if the user confirmed, false otherwise.
   */
  function confirmAction(message) {
    return window.confirm(message);
  }

  // Expose public API
  return {
    showNotification,
    confirmAction,
  };
})();
