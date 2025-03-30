// public/js/admin/admin.js

document.addEventListener('DOMContentLoaded', function () {
  // Connect to Socket.IO
  const socket = io();

  // ------------------------------------------------------------------------
  // 1) Helper function to create and display a Bootstrap 5 toast
  // ------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    // type can be: 'info', 'success', 'error', 'warning'
    let bgClass = 'bg-primary'; // default to 'info' style
    if (type === 'success') bgClass = 'bg-success';
    if (type === 'error')   bgClass = 'bg-danger';
    if (type === 'warning') bgClass = 'bg-warning text-dark';

    // Create a unique ID so multiple toasts won't conflict
    const toastId = 'toast-' + Date.now();

    // Build the toast DOM element
    const toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.classList.add('toast', 'align-items-center', 'text-white', bgClass, 'border-0');
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close">
        </button>
      </div>
    `;

    // Append to our toast container
    const container = document.querySelector('.toast-container');
    if (!container) {
      console.error('No .toast-container found in the DOM.');
      return;
    }
    container.appendChild(toastEl);

    // Initialize and show using Bootstrap’s Toast API
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();

    // Remove from DOM after hidden
    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }

  // ------------------------------------------------------------------------
  // 2) Remove Student from Course (AJAX)
  // ------------------------------------------------------------------------
  document.body.addEventListener('click', async function (e) {
    if (e.target.matches('.btn-remove-course')) {
      e.preventDefault();
      const studentId = e.target.dataset.studentId;
      const courseId = e.target.dataset.courseId;

      if (!confirm('Are you sure you want to remove this student from the course?')) {
        return;
      }

      try {
        const response = await fetch(`/admin/students/${studentId}/remove/${courseId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();

        if (result.success) {
          // Show a success toast
          showToast(result.message, 'success');
          // Optionally refresh the page or remove row from DOM
          setTimeout(() => window.location.reload(), 1500);
        } else {
          showToast(`Error: ${result.message}`, 'error');
        }
      } catch (error) {
        console.error('Error removing student from course:', error);
        showToast('An error occurred while removing the student.', 'error');
      }
    }
  });

  // ------------------------------------------------------------------------
  // 3) Force Enroll Student in a Course (AJAX)
  // ------------------------------------------------------------------------
  const forceEnrollBtn = document.getElementById('forceEnrollBtn');
  if (forceEnrollBtn) {
    forceEnrollBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      const studentId = forceEnrollBtn.dataset.studentId;
      const courseSelect = document.getElementById('courseSelect');
      const courseId = courseSelect.value;

      if (!courseId) {
        showToast('Please select a course to enroll.', 'warning');
        return;
      }

      if (!confirm('Are you sure you want to enroll the student in this course?')) {
        return;
      }

      try {
        const response = await fetch(`/admin/students/${studentId}/enroll/${courseId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();

        if (result.success) {
          showToast(result.message, 'success');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          showToast(`Error: ${result.message}`, 'error');
        }
      } catch (error) {
        console.error('Error enrolling student:', error);
        showToast('An error occurred while enrolling the student.', 'error');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4) Socket.IO Real-Time Updates
  // ------------------------------------------------------------------------
  socket.on('courseUpdated', function (data) {
    // Optionally show a toast or update the DOM
    console.log('Course updated:', data);
  });

  socket.on('newCourse', function (data) {
    showToast(`A new course was added (ID: ${data.courseId}).`, 'info');
  });

  socket.on('courseDeleted', function (data) {
    showToast(`Course ${data.courseId} has been deleted.`, 'warning');
  });
});
