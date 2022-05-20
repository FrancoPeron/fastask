/*----------------------------------*/

class ToDoList extends HTMLElement {
    constructor() {
        super();
        this.todos = [{
            id: 0,
            done: false,
            content: "",
        }]

        this.positions = {
            clientX: undefined,
            clientY: undefined,
            movementX: 0,
            movementY: 0
        }

        this.dragItem = document.querySelector("[todoItem]")
        this.dragItems = document.querySelectorAll("[todoItem]")

        
        
    }

    connectedCallback() {
        console.log('Todo ADDED TO THE DOM');
        this.todoItem();
        this.printTodos();
        this.drag()
        
        console.log(this.dragItems)
    }

    disconnectedCallback() {
        console.log('Todo REMOVED TO THE DOM');
    }

    /* metodos */

    todoItem(){
        this.innerHTML =
            `
                <p id="titletask" class="title f-st1 c-c3 mb-16" placeholder="Add a title..." contenteditable="true"></p>

                <ul items-list class="flex flex-column my-12"></ul>
            `
        ;
    }

    taskItem(i){
        const item =  
            `   
            <li id="task${this.todos[i].id}" class="task-item flex flex-row justify-between align-items-start mb-8">

                <div class="flex flex-row align-items-start flex-fill">
                    <input todo-check class="checkbox mr-12 mt-4" type="checkbox" ${(this.todos[i].done) ? "checked": ""}>
                    <p todo-task class="task fw-6 f-b1 c-g1" placeholder="Add a task..." contenteditable="true" tabindex="1">${this.todos[i].content}</p>
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

    printTodos(){
        let container = document.querySelector('[items-list]')
        container.innerHTML = ""
        for (let i = 0; i < this.todos.length; i++) {
            container.insertAdjacentHTML('beforeend',this.taskItem(i));
        }
    
    }

    drag(){

        this.dragItems.forEach(dragItem => dragItem.addEventListener('mousedown', function(event){
            setTimeout(() => {
                event.preventDefault();
                console.log(this)
                // get the mouse cursor position at startup:
                this.positions.clientY = event.clientY
                this.positions.clientX = event.clientX

                document.onmousemove = this.elementDrag;
                document.onmouseup = this.closeDragElement;

            }, 10);
        }))
     /*    this.dragItem.addEventListener('mousedown', function(event){
            setTimeout(() => {
                event.preventDefault();
                // get the mouse cursor position at startup:
                this.positions.clientY = event.clientY
                this.positions.clientX = event.clientX

                document.onmousemove = this.elementDrag;
                document.onmouseup = this.closeDragElement;

            }, 10);
        }); */
        
        
        
    }
    elementDrag = (event)=> {
        
        console.log()
        event.preventDefault()
        this.positions.movementY = this.positions.clientY - event.clientY
        this.positions.movementX = this.positions.clientX - event.clientX
        this.positions.clientX = event.clientX
        this.positions.clientY = event.clientY
        // set the element's new position:
        this.style.top = ( this.offsetTop - this.positions.movementY) + "px"
        this.style.left = ( this.offsetLeft - this.positions.movementX) + "px"

        localStorage.setItem('posY', this.dragItem.style.top);
        localStorage.setItem('posX', this.dragItem.style.left);
    }

    closeDragElement = ()=> {
        document.onmouseup = null
        document.onmousemove = null
    }
    
}
window.customElements.define('todo-item', ToDoList);

let containerMain = document.querySelector("[board]");
let btnTodo = (document.querySelector("[btnTodo]"))
btnTodo.addEventListener('mousedown', e =>{
    console.log(2)
    containerMain.insertAdjacentHTML('beforeend','<todo-item todoItem class="todoItem p-24 br-12 shadow bg-c4" ></todo-item>');
    
});
