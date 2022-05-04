const STORAGE_KEY = "task-list-storage-key";

/************************************
 * creates objct of elements needed *
 ************************************/
 
 const elements = {
	form: document.querySelector("#new-task-form"),
	input: document.querySelector("#new-task-input"),
	list: document.querySelector("#tasks"),
	cal: document.querySelector("#calendar")
}

/****************************
 * Generates an ID for task *
 ****************************/

 const createId = () => `${Math.floor(Math.random() * 10000)}-${new Date().getTime()}`

/**********************************************
 * function that creates the HTML elements    *
 **********************************************/

 const createTask = () => {
    const id = createId()
    const task = elements.input.value;
    const date = elements.cal.value;

    if(!task && !date) return alert("Please fill in task and select date");
    if(!task) return alert("Please fill in task");
    if(!date) return alert("Please select date");

	const tasks = document.createElement("div");

    tasks.innerHTML = `
    <button class = "sort">Sort</button>
    <div class="task" data-id = "${id}">
        <div class="content">
            <input type ="checkbox" class="tick">
            <input type ="text" class = "text" id = "text" value="${task}" readonly>
            <label class = "due-date" for ="text">${date}</label>
            <input type ="date" class = "date" id = "date">
        </div>

        <div class = "actions">
            <button class="edit" data-id="${id}">Edit</button>
            <button class="delete" data-id="${id}">Delete</button>
        </div>
    </div>
    `
    elements.list.appendChild(tasks)
    markOfdddueDate()
    return tasks
}

/********************************************
 * Marks due date as complete with checkbox    *
 ********************************************/

function markOfdddueDate(){
    let allCheckboxes = document.querySelectorAll('.tick')

    allCheckboxes.forEach(checkbox =>{
        checkbox.addEventListener('change',(e)=>{
            let parentElem=e.target.parentElement
            console.log(e.target.parentElement)
            if(e.target.checked){
                parentElem.style.textDecoration = "line-through"
            }
            else{
                parentElem.style.textDecoration = "none"
            }
        });
    });
	
}

/**************************************************************
 * Event that listens for the edit,save and delete buttons    *
 **************************************************************/
elements.list.addEventListener('click',event => {
    const {target} = event;
    const {id} = target.dataset;
    const task = id ? document.querySelector(`[data-id="${id}"]`):null;  

    const type = {
        edit: event.target.classList.contains('edit'),
        delete: event.target.classList.contains('delete')
    }

    const isFromSaveLabel = target.innerText.toLowerCase() === 'save'

    //Checking to see if buttons are pressed//

    if(task && type.edit && isFromSaveLabel){
        const text = task.querySelector('.text')
        target.innerText = 'Edit'
        text.setAttribute('readonly', "true")
        return
    };

    if(task && type.edit){
        const text = task.querySelector('.text')
        target.innerText = 'save'
        text.removeAttribute('readonly')
        text.focus()
        return
    };

    if(task && type.delete){
        const textlist = task.querySelector('.task')
        textlist.appendChild.remove()
        return
    }
    
});

/*******************************************************************
 * Submits the HTML elements to have the lists submited and created*
 *******************************************************************/

 const submitHandler = (event) =>{
    event.preventDefault();
    createTask();
}
elements.form.addEventListener("submit", submitHandler);


/*********************************
 * Storing tasks in local storage*
 *********************************/

function Storingtasks(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    createTask(tasks)
}

function getStoredtask(){
    const storedkey = localStorage.get(STORAGE_KEY);
    if(storedkey){
    tasks = JSON.parse(storedkey);
    createTask(tasks)
    }
}

getStoredtask()