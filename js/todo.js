const toDoForm = document.getElementById("todo-form");
// const toDoInput = document.querySelector("#todo-form input");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TOTOS_KEY = "todos";
let toDoArray = [];

function handleDeleteToDoClick(event) {
    // target => HTML Element
    // parentNode == parentElement
    // console.log(event.target.parentElement.innerText);
    const li = event.target.parentElement;

    toDoArray = toDoArray.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDo();

    li.remove();
}

// ToDo 배열을 localStorage에 저장하는 함수
function saveToDo() {
    localStorage.setItem(TOTOS_KEY, JSON.stringify(toDoArray));
}

// 새로운 ToDo 입력 시 화면에 출력하는 함수
function paintToDo(newToDoObj) {
    const li = document.createElement("li");
    li.id = newToDoObj.id;
    const span = document.createElement("span");
    const button = document.createElement("button");
    
    span.innerText = newToDoObj.text;
    button.innerText = "❌";
    button.addEventListener("click", handleDeleteToDoClick);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;

    if (isBlank(newToDo)) {
        toDoInput.value = "";
        alert("Please write To Do.");
        return;
    }

    toDoInput.value = "";

    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    }

    toDoArray.push(newToDoObj);
    saveToDo();
    paintToDo(newToDoObj);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// 저장된 ToDo 가져오기
const savedToDos = localStorage.getItem(TOTOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    parsedToDos.forEach(paintToDo);     // 저장된 ToDo 화면에 출력
    parsedToDos.forEach((item) => toDoArray.push(item));    // 저장된 ToDo 배열을 추가
}