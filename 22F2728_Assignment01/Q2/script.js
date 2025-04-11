document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const lowPriority = document.getElementById("lowPriority");
    const mediumPriority = document.getElementById("mediumPriority");
    const highPriority = document.getElementById("highPriority");
    const completedList = document.getElementById("completedList");
    const taskCount = document.getElementById("taskCount");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const addTaskBtn = document.getElementById("addTaskBtn");

    let tasks = [];

    function renderTasks() {
        // Reset columns
        lowPriority.innerHTML = "<h3>Low Priority</h3>";
        mediumPriority.innerHTML = "<h3>Medium Priority</h3>";
        highPriority.innerHTML = "<h3>High Priority</h3>";
        completedList.innerHTML = "<h3>Completed</h3>";

        let incompleteTasks = tasks.filter(task => !task.completed);
        let completedTasks = tasks.filter(task => task.completed);

        // Render incomplete
        incompleteTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            if (task.priority === "High") highPriority.appendChild(taskElement);
            else if (task.priority === "Medium") mediumPriority.appendChild(taskElement);
            else lowPriority.appendChild(taskElement);
        });

        // Render completed
        completedTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            completedList.appendChild(taskElement);
        });

        taskCount.textContent = `Incomplete Tasks: ${incompleteTasks.length}`;
    }

    function createTaskElement(task) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.dataset.name = task.name.toLowerCase();
        if (task.completed) taskElement.classList.add("completed");

        taskElement.innerHTML = `
            <span>${task.name}</span>
            <div>
                ${!task.completed ? '<button class="completeBtn">✔</button>' : ""}
                <button class="deleteBtn">✖</button>
            </div>
        `;
        return taskElement;
    }

    addTaskBtn.addEventListener("click", () => {
        const name = taskInput.value.trim();
        const priority = priorityInput.value;
        if (!name) return alert("Task name cannot be empty");

        tasks.push({ name, priority, completed: false });
        taskInput.value = "";
        renderTasks();
    });

    document.querySelector(".task-columns").addEventListener("click", event => {
        const parentTask = event.target.closest(".task");
        if (!parentTask) return;

        const taskName = parentTask.dataset.name;

        if (event.target.classList.contains("completeBtn")) {
            tasks = tasks.map(task =>
                task.name.toLowerCase() === taskName ? { ...task, completed: true } : task
            );
        } else if (event.target.classList.contains("deleteBtn")) {
            tasks = tasks.filter(task => task.name.toLowerCase() !== taskName);
        }

        renderTasks();
    });

    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });

    renderTasks();
});
