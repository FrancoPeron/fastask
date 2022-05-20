import { todos } from "../main.js";

/* -----------: Retorna el html con los datos del array recibido */
function taskItem(val){
    const item =  
        `   
        <li id="task${val.id}" class="task-item flex flex-row justify-between align-items-start mb-8">
            <div class="flex flex-row align-items-start flex-fill">
                <input todo-check class="checkbox mr-12 mt-4" type="checkbox" ${(val.done) ? "checked": ""}>
                <p todo-task class="task fw-6 f-b1 c-g1" placeholder="Add a task..." contenteditable="true" tabindex="1">${val.content}</p>
            </div>
            
            <svg todo-trash class="trash cursor-pointer p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <g transform="translate(-89.25 -860.75)">
                    <line class="trash-a" x2="24" transform="translate(90.5 867)"/>
                    <path class="trash-b" d="M2,0h8a2,2,0,0,1,2,2V5a0,0,0,0,1,0,0H0A0,0,0,0,1,0,5V2A2,2,0,0,1,2,0Z" transform="translate(96.5 862)"/>
                    <path class="trash-b" d="M0,0H18L16,17a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Z" transform="translate(93.5 867)"/>
                </g>
            </svg>
            
        </li>
        `
    return item
}

/* -----------: Imprime por pantalla los task (tareas) */
function printTodos(){
    let taskItems = document.querySelector('[taskItems]')
    taskItems.innerHTML = ""
    for (let i = 0; i < todos.length; i++) {
        taskItems.insertAdjacentHTML('beforeend',taskItem(todos[i]));
    }

}

export {printTodos}; 
