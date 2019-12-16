const form = document.querySelector('.js-form');
const input = document.querySelector('.js-input');
const penList = document.querySelector('.js-pen-list');
const finList = document.querySelector('.js-fin-list');

const TODOS_LS = 'toDos';
let toDos = [];

function cancelToDo(event) {
	const btn = event.target;
	const li = btn.parentNode;
	penList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

function finishToDo(event) {
	cancelToDo(event);
	const li = document.createElement('li');
	const span = document.createElement('span');
	const endBtn = document.createElement('button');
	const toDoText = toDos.text;
	endBtn.innerText = '♥';
	li.appendChild(span);
	span.innerText = toDoText;
	li.appendChild(endBtn);
	finList.appendChild(li);
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
	const li = document.createElement('li');
	const span = document.createElement('span');
	const cancelBtn = document.createElement('button');
	const finishBtn = document.createElement('button');
	const newId = toDos.length + 1;
	cancelBtn.innerText = '▩';
	finishBtn.innerText = '★';
	cancelBtn.addEventListener('click', cancelToDo);
	finishBtn.addEventListener('click', finishToDo);
	li.appendChild(cancelBtn);
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(finishBtn);
	li.id = newId;
	penList.appendChild(li);
	const toDoObj = {
		text: text,
		id: newId
	};
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit() {
	event.preventDefault();
	const currentValue = input.value;
	paintToDo(currentValue);
	input.value = '';
}

function init() {
	form.addEventListener('submit', handleSubmit);
}

init();
