//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addToDo(event) {
    //prevents form from submitting
    event.preventDefault();

    //create TODO div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create <li>
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add TODO to local storage
    saveLocalTodos(todoInput.value)

    //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear input box
    todoInput.value = "";
}

//delete and check button functionality
function deleteCheck(e) {
    const item = e.target;

    //deletes TO-DO item
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;

        //animation
        todo.classList.add('fall');

        //delete todo item from local storage
        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //check button
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // //check for previous save
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //check for previous save
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //create TODO div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create <li>
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        //append to list
        todoList.appendChild(todoDiv);
 
    });
}

function removeLocalTodos(todo) {
     //check for previous save
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
    todos.splice(todoIndex, 1);
    // const todoIndex = todo.children[0].innerText;
    // todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}