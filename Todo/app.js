let $todoInput; // miejsce, gdzie użuytkownik wpisuje treść zadania
let $alertInfo; /// info braku zadania / konieczność wpisania tekstu
let $addBtn; // przycisk ADD - dodaj nowe elementy do listy 
let $ulList; // nasze lista zadań, tagi <ul>

let $newTask;// Tworzymy nową listę

let $popup;//pobrany popup
let $popupInfo;// alert w popupie, jak się doda pusty tekst
let $popupInput;// etytyjemy Toda

let $addPopupBtn;// przycisk "zatwierdz"
let $closeTodoBtn;// przycisk od zamykania popup'a
let $idNumber = 0;
let $allTask;



const main = () => {

    prepareDOMElement();
    prepareDOMEvent();

};

const prepareDOMElement = () => {


    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTask = $ulList.getElementsByTagName('li');

};

const prepareDOMEvent = () => {

    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);

};


const addNewTask = () => {
    
    if($todoInput.value !== '') {

        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}'`);
        $ulList.appendChild($newTask);

        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();

    } else {

        $alertInfo.innerText = 'Wpisz wartość zadania!';
    }
    
};

const enterCheck = (e) => {
    if(e.keyCode === 13) {
        addNewTask();
    }
};



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

    if(e.target.closest('button').classList.contains('completed')) 
    {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');

    } else if (e.target.closest('button').className === 'edit') 
    {
        editTask(e);
    }  else if (e.target.closest('button').className === 'delete') 
    {
        deleteTask(e);
    };
};

const editTask = (e) => {

    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
};


const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';

        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąłś trerść'
    };
};


const closePopup = () => {
    $popup.style.display = 'none';
};


const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTask.length === 0 ) {
        $alertInfo.innerText = 'Brak zadań na liście.';
    };
};



document.addEventListener('click', main);