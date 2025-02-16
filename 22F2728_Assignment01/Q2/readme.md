# Interactive To-Do List / Task Manager

## Overview

This project is a dynamic, interactive To-Do List and Task Manager built with vanilla JavaScript, HTML, and CSS. It allows users to add tasks with different priority levels (Low, Medium, High) and view completed tasks in a separate column. The application also features a dark mode toggle, enabling users to switch the theme for a more comfortable viewing experience in different lighting conditions.

---

## Features

* **Task Management:**
  * **Add Tasks:** Users can input a task and select its priority level (Low, Medium, or High).
  * **Display by Priority:** Tasks are dynamically added to columns based on their selected priority.
  * **Completed Tasks:** A separate column is designated for tasks marked as completed.
* **Interactive User Interface:**
  * **Real-Time Updates:** Tasks are added and displayed instantly without page reloads.
  * **Dark Mode Toggle:** Users can switch between light and dark themes using a toggle switch for an improved user experience in varying lighting environments.
* **Task Actions:**
  * **Complete Task:** Each task includes a button to mark it as complete.
  * **Delete Task:** Each task also features a delete button to remove it from the list.
* **Responsive Design:**
  * The layout is responsive and adapts to various screen sizes, making it ideal for both desktop and mobile viewing.

---

## File Structure

* **index.html:**
  Provides the main HTML structure of the application. It includes the container for the task manager, input elements for adding tasks, priority selection, and the dark mode toggle.
* **style.css:**
  Contains all the CSS styles used to design the layout, colors, transitions, and responsiveness of the application. It includes specific styles for dark mode and the task columns.
* **script.js:**
  Implements the functionality of the task manager. It handles:
  * Adding tasks based on user input.
  * Organizing tasks into their respective priority columns.
  * Marking tasks as completed or deleting them.
  * Toggling the dark mode theme.
  * Updating the task count dynamically.

---

## Installation & Usage

1. **Download or Clone the Repository:**
   * Ensure that all files (`index.html`, `style.css`, and `script.js`) are located in the same directory.
2. **Open the Application:**
   * Open `index.html` in any modern web browser.
3. **Using the Task Manager:**
   * **Add a Task:**
     * Enter the task description in the input field.
     * Select the task's priority from the dropdown (Low, Medium, or High).
     * Click the "Add Task" button to add the task to the corresponding priority column.
   * **Manage Tasks:**
     * Use the provided buttons on each task to mark it as complete or delete it.
   * **Dark Mode:**
     * Toggle the dark mode switch to change the theme of the application.

---

## Technologies Used

* **HTML5:**
  For structuring the application and defining the layout.
* **CSS3:**
  For styling, transitions, and responsive design. Dark mode styles are also defined here.
* **Vanilla JavaScript (ES6+):**
  For dynamic DOM manipulation, event handling, and implementing core functionality such as task addition, deletion, and theme toggling.

---

## Customization

* **Task Functionality:**
  Modify `script.js` to extend or customize how tasks are managed (e.g., adding additional task attributes or filtering options).
* **Styling:**
  Update `style.css` to change colors, fonts, or layout to suit your design preferences.
* **Dark Mode:**
  Customize dark mode styles by adjusting the `.dark-mode` class in `style.css`.
