let $todoInput; // miejsce, gdzie użuytkownik wpisuje treść zadania
let $alertInfo; /// info braku zadania / konieczność wpisania tekstu
let $addBtn; // przycisk ADD - dodaj nowe elementy do listy 
let $ulList; // nasze lista zadań, tagi <ul>

let $allTask;
let $newTask;// Tworzymy nową listę

let $popup;
let $popupInfo;
let $popupInput;
let $addPopupBtn;
let $closePopupBtn;
let $idNUmber = 0;


const main = () => {
    prapreDOMEvent();
    prepareDOMElment();
};

const prepareDOMElement = () => {
    $todoInput = document.querySelector('.todoInput');
    $addBtn = document.querySelector('.addBtn');
    $ulLIst = document.querySelector('.todoList ul');
    $alertInfo = document.querySelector('.alertInfo');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput')
    $closePopupBtn = document.querySelector('.cancel');
    $addPopupBtn = document.querySelector('.accept')
    $allTask = document.getElementsByTagName('li');

};


const prapreDOMEvent = () => {

    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $addPopupBtn.addEventListener('click', changeTodo);
    $closePopupBtn.addEventListener('click', closePopup);
    $todoInput.addEventListener('keyout', enterCheck);

};

const addNewTask = () => {
    
    if($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}'`);
        $ulList.appendChild($newTask)

        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();

    } else {

        $alertInfo.innerText = 'Wpisz wartość zadania!';
    };
    
};

const enterCheck = () => {
    if($todoInput.keyCode === 13) {
        addNewTask();
    };
} 


const createToolsArea = () => {

    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fa fa-check"></i>'
    
    
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
    
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);

};

const checkClick = (e) => {

    if(e.target.closest('button').classList.contains('completed')) {

        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');

    } else if (e.target.closest('button').className === 'edit') {
        editTask();
    } else if (e.target.closest('button').className === 'delete')  {
        delateTask();
    };

};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementsByID(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex'
};

const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąłś treść'
    };

};

const closePopup = () => {
    $popup.style.display = 'none';
  
};

const delateTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTask.length === 0) {
        $alertInfo.innerText = 'Nie ma zadan!'
    };
};




document.addEventListener('DOMContentLoaded', main);