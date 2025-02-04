document.addEventListener('DOMContentLoaded', function () {
    const students = {
        101: new Set(),
        102: new Set()
    };

    const courses = ["Mathematics", "Physics", "Computer Science"];
    let currentStudent = null;

    function viewCourses(rollNo) {
        alert(`Courses registered for student ${rollNo}: ${Array.from(students[rollNo]).join(", ") || "None"}`);
    }

    function editCourses(rollNo) {
        currentStudent = rollNo;
        document.getElementById("studentInfo").innerText = `Editing courses for Roll No: ${rollNo}`;
        const courseList = document.getElementById("courseList");
        courseList.innerHTML = "";
        
        courses.forEach(course => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = course;
            checkbox.checked = students[rollNo].has(course);
            checkbox.onchange = function () {
                if (this.checked) {
                    students[rollNo].add(this.value);
                } else {
                    students[rollNo].delete(this.value);
                }
            };
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + course));
            courseList.appendChild(label);
            courseList.appendChild(document.createElement("br"));
        });
        
        document.getElementById("modal").classList.add("active");
    }

    document.getElementById("saveBtn").addEventListener("click", () => {
        if (currentStudent !== null) {
            alert(`Courses for Roll No ${currentStudent} saved successfully!`);
            closeModal();
        }
    });

    function closeModal() {
        document.getElementById("modal").classList.remove("active");
    }

    window.viewCourses = viewCourses;
    window.editCourses = editCourses;
    window.closeModal = closeModal;
});
