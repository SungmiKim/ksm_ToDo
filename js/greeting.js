const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const modify = document.querySelector(".modify");

const USER_LOCAL_STORAGE = "currentUser";
const SHOWING_CLASS_NAME = "showing";

function saveName(text) {
  localStorage.setItem(USER_LOCAL_STORAGE, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CLASS_NAME);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CLASS_NAME);
  greeting.classList.add(SHOWING_CLASS_NAME);
  greeting.innerHTML = `반갑습니다. "${text}"님,`;

  modify.innerHTML = "이름변경";
  modify.classList.add(SHOWING_CLASS_NAME);
}

function rePaintGreeting() {
  form.classList.add(SHOWING_CLASS_NAME);
  greeting.classList.remove(SHOWING_CLASS_NAME);
  modify.classList.remove(SHOWING_CLASS_NAME);
}

function modifyName(event) {
  localStorage.removeItem("currentUser");
  rePaintGreeting();
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LOCAL_STORAGE);

  if (currentUser === null) {
    askForName();
    modify.addEventListener("click", modifyName);
  } else {
    paintGreeting(currentUser);
    modify.addEventListener("click", modifyName);
  }
}

function init() {
  loadName();
}

init();
