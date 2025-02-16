document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const lowPriority = document.getElementById("lowPriority");
    const mediumPriority = document.getElementById("mediumPriority");
    const highPriority = document.getElementById("highPriority");
    const completedList = document.getElementById("completedList");
    const taskCount = document.getElementById("taskCount");
    const darkModeToggle = document.getElementById("darkModeToggle");
    let tasks = [];

    function renderTasks() {
        lowPriority.innerHTML = "<h3>Low Priority</h3>";
        mediumPriority.innerHTML = "<h3>Medium Priority</h3>";
        highPriority.innerHTML = "<h3>High Priority</h3>";
        completedList.innerHTML = "<h3>Completed</h3>";

        let incompleteTasks = tasks.filter(task => !task.completed);
        let completedTasks = tasks.filter(task => task.completed);

        incompleteTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            if (task.priority === "High") highPriority.appendChild(taskElement);
            if (task.priority === "Medium") mediumPriority.appendChild(taskElement);
            if (task.priority === "Low") lowPriority.appendChild(taskElement);
        });

        completedTasks.forEach(task => completedList.appendChild(createTaskElement(task)));
        taskCount.textContent = `Incomplete Tasks: ${incompleteTasks.length}`;
    }

    function createTaskElement(task) {
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.dataset.name = task.name.toLowerCase();
        taskElement.innerHTML = `<span>${task.name}</span>
            <button class="completeBtn">✔</button>
            <button class="deleteBtn">✖</button>`;
        if (task.completed) taskElement.classList.add("completed");
        return taskElement;
    }

    document.getElementById("addTaskBtn").addEventListener("click", () => {
        let name = taskInput.value.trim();
        let priority = priorityInput.value;
        if (!name) return alert("Task name cannot be empty");
        tasks.push({ name, priority, completed: false });
        taskInput.value = "";
        renderTasks();
    });

    document.querySelector(".task-columns").addEventListener("click", event => {
        if (event.target.classList.contains("completeBtn")) {
            let taskName = event.target.parentElement.dataset.name;
            tasks = tasks.map(task => task.name.toLowerCase() === taskName ? { ...task, completed: true } : task);
        } else if (event.target.classList.contains("deleteBtn")) {
            let taskName = event.target.parentElement.dataset.name;
            tasks = tasks.filter(task => task.name.toLowerCase() !== taskName);
        }
        renderTasks();
    });

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    renderTasks();
});

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

function addTask() {
    let taskText = document.getElementById('taskInput').value;
    let priority = document.getElementById('priority').value;
    if (taskText.trim() === '') return;

    let taskDiv = document.createElement('div');
    taskDiv.textContent = taskText;
    taskDiv.style.padding = '10px';
    taskDiv.style.margin = '5px';
    taskDiv.style.background = '#ddd';
    taskDiv.style.borderRadius = '5px';
    
    document.getElementById(priority).appendChild(taskDiv);
    document.getElementById('taskInput').value = '';
}