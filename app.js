const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


function createNewTaskElement(taskString) {

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    deleteButton.classList.add("button");

    listItem.classList.add("task");

    label.innerText = taskString;
    label.className = "task-name";
    label.classList.add("task-label");

    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");
    editInput.type = "text";
    editInput.className = "task-name";
    editInput.classList.add("task-name-input");
    editInput.classList.add("task-input");

    editButton.innerText = "Edit";
    editButton.classList.add("edit");
    editButton.classList.add("button");

    deleteButton.classList.add("delete");
    deleteButtonImg.src = "./assets/remove.svg";
    deleteButtonImg.classList.add("delete-img");
    deleteButtonImg.alt = "icon for remove button";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

function addTask() {
    console.log("Add Task...");

    if (!taskInput.value) return;

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

function editTask() {
    console.log("Edit Task...");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector(".task-input");
    const label = listItem.querySelector(".task-label");
    const editBtn = listItem.querySelector(".edit");
    const containsClass = listItem.classList.contains("edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("edit-mode");
};

function deleteTask() {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
}

function taskCompleted() {
    console.log("Complete Task...");

    const listItem = this.parentNode;
    this.nextElementSibling.classList.add("completed");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
    console.log("Incomplete Task...");

    const listItem = this.parentNode;
    this.nextElementSibling.classList.remove("completed");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
    console.log("AJAX Request");
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");

    const checkBox = taskListItem.querySelector(".checkbox");
    const editButton = taskListItem.querySelector(".edit");
    const deleteButton = taskListItem.querySelector(".delete");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
}


addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);

}

for (let i = 0; i < completedTasksHolder.children.length; i++) {

    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);

}
