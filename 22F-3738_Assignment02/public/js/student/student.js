document.addEventListener('DOMContentLoaded', function () {
  // Connect to Socket.IO for real-time updates
  const socket = io();

  socket.on('courseUpdated', (data) => {
    const row = document.getElementById(`course_${data.courseId}`);
    if (row) {
      const seatsElem = row.querySelector('.available-seats');
      if (seatsElem) {
        seatsElem.textContent = data.availableSeats;
      }
      showNotification(`Course ${data.courseId} now has ${data.availableSeats} available seats.`, 'info');
    }
  });

  // Delegate click events for action buttons (enroll, drop, subscribe, unsubscribe)
  document.body.addEventListener('click', async function (e) {
    const target = e.target;
    const courseId = target.getAttribute('data-course-id');
    if (!courseId) return;

    if (target.matches('.enroll-btn')) {
      e.preventDefault();
      try {
        const res = await fetch(`/student/enroll/${courseId}`, { method: 'POST' });
        const result = await res.json();
        showNotification(result.message, result.success ? 'success' : 'danger');
        if (result.success) {
          // Update available seats and replace button with a Drop button
          const row = document.getElementById(`course_${courseId}`);
          if (row) {
            row.querySelector('.available-seats').textContent = result.availableSeats;
            target.outerHTML = `<button type="button" class="btn btn-sm btn-warning drop-btn" data-course-id="${courseId}">Drop</button>`;
          }
        }
      } catch (err) {
        console.error('Error enrolling in course:', err);
        showNotification('An unexpected error occurred.', 'danger');
      }
    } else if (target.matches('.drop-btn')) {
      e.preventDefault();
      try {
        const res = await fetch(`/student/drop/${courseId}`, { method: 'POST' });
        const result = await res.json();
        showNotification(result.message, result.success ? 'success' : 'danger');
        if (result.success) {
          const row = document.getElementById(`course_${courseId}`);
          if (row) {
            row.querySelector('.available-seats').textContent = result.availableSeats;
            // If seats are now available, show Enroll button; otherwise, show Subscribe button
            if (result.availableSeats > 0) {
              target.outerHTML = `<button type="button" class="btn btn-sm btn-success enroll-btn" data-course-id="${courseId}">Enroll</button>`;
            } else {
              target.outerHTML = `<button type="button" class="btn btn-sm btn-secondary subscribe-btn" data-course-id="${courseId}">Subscribe</button>`;
            }
          }
        }
      } catch (err) {
        console.error('Error dropping course:', err);
        showNotification('An unexpected error occurred.', 'danger');
      }
    } else if (target.matches('.subscribe-btn')) {
      e.preventDefault();
      try {
        const res = await fetch(`/student/subscribe/${courseId}`, { method: 'POST' });
        const result = await res.json();
        showNotification(result.message, result.success ? 'success' : 'danger');
        if (result.success) {
          target.outerHTML = `<button type="button" class="btn btn-sm btn-dark unsubscribe-btn" data-course-id="${courseId}">Unsubscribe</button>`;
        }
      } catch (err) {
        console.error('Error subscribing to course:', err);
        showNotification('An unexpected error occurred.', 'danger');
      }
    } else if (target.matches('.unsubscribe-btn')) {
      e.preventDefault();
      try {
        const res = await fetch(`/student/unsubscribe/${courseId}`, { method: 'POST' });
        const result = await res.json();
        showNotification(result.message, result.success ? 'success' : 'danger');
        if (result.success) {
          target.outerHTML = `<button type="button" class="btn btn-sm btn-secondary subscribe-btn" data-course-id="${courseId}">Subscribe</button>`;
        }
      } catch (err) {
        console.error('Error unsubscribing from course:', err);
        showNotification('An unexpected error occurred.', 'danger');
      }
    }
  });

  // Function to display toast notifications using Bootstrap Toasts
  function showNotification(message, type) {
    const toastId = 'toast-' + Date.now();
    const toastContainer = document.getElementById('toast-container');
    const toastHTML = `
      <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElem = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElem, { delay: 3000 });
    toast.show();
    toastElem.addEventListener('hidden.bs.toast', () => {
      toastElem.remove();
    });
  }
});
