/************************************
 * creates objct of elements needed *
 ************************************/

 const elements = {
    form: document.querySelector("#new-task-form"),
    input: document.querySelector("#new-task-input"),
    list: document.querySelector("#tasks"),
    cal: document.querySelector("#calendar")
  };
  
  /****************************
   * Generates an ID for task *
   ****************************/
  
  const createId = () =>
    `${Math.floor(Math.random() * 10000)}-${new Date().getTime()}`;
  
  /*****************************
   * creates the HTML elements *
   ****************************/
  
  const createTask = () => {
    const id = createId();
    const task = elements.input.value;
    const date = elements.cal.value;
  
    if (!task && !date) return alert("Please fill in task and select date");
    if (!task) return alert("Please fill in task");
    if (!date) return alert("Please select date");
  
    const tasks = document.createElement("div");
  
    tasks.innerHTML = `
      <div class="task" data-id="${id}">
          <div class="content">
              <input type ="checkbox" class="tick" data-id="${id}>
              <input type ="text" class = text id = "text" readonly>${task}
              <label class = "due-date" for ="text">${date}</label>
              <input type ="date" class = date id = "date">
          </div>
  
          <div class = "actions">
              <button class="edit" data-id="${id}">Edit</button>
              <button class="delete" data-id="${id}">Delete</button>
          </div>
      </div>
      `;
  
    elements.list.appendChild(tasks);
    return tasks;
  };
  
  /**************************************************************
   * Event that listens for the submit, edit and delete button  *
   **************************************************************/
  
  elements.list.addEventListener("click", (event) => {
    const { target } = event;
    const { id } = target.dataset;
    const tasks = id ? document.querySelector('[data-id="${id}"]') : '';
  
    const type = {
      edit: event.target.classList.contains("edit"),
      delete: event.target.classList.contains("delete"),
      checkbox: event.target.classList.contains("tick")
    };
  
    if(tasks && type.checkbox)
    {
      const text = tasks.querySelector("text")
      target.innerText = "text"
      text.style.textDecoration = 'line-through';
    }

    const isFromSaveLabel = target.innerText.toLowerCase() === "save";
  
    if (tasks && type.edit && isFromSaveLabel) {
      const text = tasks.querySelector("text");
      target.innerText = "Edit";
      text.addAttribute("readonly");
      return;
    }
  
    if (tasks && type.edit) {
      const text = tasks.querySelector("text");
      target.innerText = "save";
      text.removeAttribute("readonly");
      text.focus();
      return;
    }
  
    if (tasks && type.delete) {
      const tasks = tasks.querySelector("task");
      tasks.remove.appendChild(tasks);
      return;
    }
  });
  
  const submitHandler = (event) => {
    event.preventDefault();
    createTask();
  };
  
  elements.form.addEventListener("submit", submitHandler);
  

  