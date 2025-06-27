window.onload = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length === 0) {
        localStorage.setItem('totalTasks', 0);
    }
    loadTask();
    setDateInfo();
};

let resetTimeout = null;
function setDateInfo() {
    const now = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    document.getElementById("dayName").textContent = days[now.getDay()];
    document.getElementById("dateName").textContent = now.getDate();
    document.getElementById("monthName").textContent = months[now.getMonth()];
}

function updateProgress() {
    let total = Number(localStorage.getItem('totalTasks')) || 0;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const remaining = tasks.length;

    const percent = total ? ((total - remaining) / total) * 100 : 0;
    document.querySelector('.fill').style.width = percent + '%';

    if (remaining === 0 && total !== 0) {
        if (resetTimeout) clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
            localStorage.setItem('totalTasks', 0);
            document.querySelector('.fill').style.width = '0%';
        }, 2000); 
    }
}

function AddTask() {
    const input = document.getElementById('inputTask');
    const task = input.value.trim();
    if (task === '') return;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem('totalTasks', Number(localStorage.getItem('totalTasks')) + 1);
    input.value = "";
    loadTask();
}
function loadTask() {
    const container = document.getElementById('taskContainer');
    container.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "text";
        taskDiv.innerHTML = `<span class = "task-text">${task}</span>`;
        taskDiv.style.display = "flex";
        taskDiv.style.flexDirection = "column";
        taskDiv.style.justifyContent = "flex-end";
        taskDiv.style.borderBottom = "1px solid black";
        taskDiv.addEventListener("click", function () {
            const span = taskDiv.querySelector(".task-text");
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
            span.style.opacity = "0.6";
            
            setTimeout(() => {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                localStorage.setItem('totalTasks',Number(localStorage.getItem('totalTasks'))-1);
                loadTask();
            }, 1000);
        });
        container.appendChild(taskDiv);

    });
    updateProgress();
}
