
window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	const cal_el = document.querySelector("#calendar");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
		const date = cal_el.value;


		if(!task && !date)
		{
			alert("Please fill in task and select date")
			return
			
		}
		if(!task)
		{
			alert("Please fill in task")
			return
		}
		if(!date)
		{
			alert("Please fill select date")
			return
		}

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);	
		
		const checkbox = document.createElement('input')
		checkbox.type = "checkbox";
		checkbox.classList.add('tick')

		task_content_el.appendChild(checkbox);
	
		console.log(checkbox);

		

		const due_date = document.createElement('label');
		due_date.htmlFor = "text";
		due_date.classList.add('dueDate');
		due_date.innerText = cal_el.value;

		task_content_el.appendChild(due_date);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

        task_edit_el.addEventListener('click', () =>{
            if(task_edit_el.innerText.toLowerCase() == "edit")
            {
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
            task_edit_el.innerText = "Save";
            }
            else
            {
                task_input_el.setAttribute("readonly","readonly");
                task_edit_el.innerText = "Edit";
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
		
    });

});
