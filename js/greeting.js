// const loginForm = document.querySelector("#login-form");
const loginForm = document.getElementById("login-form");
// const loginInput = document.querySelector("#login-form input");
const loginInput = loginForm.querySelector("input");
const greetingText = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = loginInput.value;

    if (isBlank(username)) {
        loginInput.value = "";
        alert("Please write your name.");
        return;
    }

    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    greetingText.innerText = `Hello, ${username}`;      // 따옴표가 아님 주의!!
    greetingText.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", handleLoginSubmit);
} else {
    paintGreetings(savedUsername);
}