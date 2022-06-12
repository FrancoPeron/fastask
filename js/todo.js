
/* ========== Variables ========== */

let containerMain = document.querySelector("[board]");
let btnTrash = document.querySelector("[btnTrash]")
let newItem = false
/* todo */
let todoHtmlItem = (val)=>{ return `<todo-item todoItem id="todo${val}" class="todoItem p-24 br-4 shadow-sm bg-c4 z-20"></todo-item>`}
let todoPositions = {
    clientX: undefined,
    clientY: undefined,
    movementX: 0,
    movementY: 0
}


/* ========== Imprimo los datos del localStorage ========== */

let todoId = localStorage.getItem('cantTodos') || 0;
for (let index = 0; index < todoId ; index++) {
    containerMain.insertAdjacentHTML('beforeend',todoHtmlItem(index));
}

/* ========== Functions ========== */

let drag = (event,item)=>{
    console.log(event, item)
    
    setTimeout(() => {
        event.preventDefault();
        todoPositions.clientY = event.clientY
        todoPositions.clientX = event.clientX

        document.onmousemove = (event)=> {

            event.preventDefault()
            todoPositions.movementY = todoPositions.clientY - event.clientY
            todoPositions.movementX = todoPositions.clientX - event.clientX
            todoPositions.clientX = event.clientX
            todoPositions.clientY = event.clientY
            // set the element's new position:
            item.style.top = ( item.offsetTop - todoPositions.movementY) + "px"
            item.style.left = ( item.offsetLeft - todoPositions.movementX) + "px"

            let pos = {
                posY: item.style.top,
                posX: item.style.left
            }
            
            localStorage.setItem(`${item.getAttribute("id")}Pos`, JSON.stringify(pos));

            trashOpacity(event, item)
            //event.target.trashOpacity(event)
            
        }
        document.onmouseup = (event)=> {
            document.onmouseup = null
            document.onmousemove = null
            
            trash(event,item)
            itemOnBoard(event,item, newItem)
        
        }

    }, 10);
}

let listenItems = ()=> {
    for (let index = 0; index < document.querySelectorAll("[todoItem]").length; index++) {
        let item = document.querySelectorAll("[todoItem]")[index]
        item.addEventListener("mousedown", (event) =>{
            newItem = false
            drag(event, item, newItem)
        });
    }
}

let borrarItem = (item)=>{
    let todosItemArray = document.querySelectorAll("[todoItem]")
    let thisId = Number(item.getAttribute("id").replace( /^\D+/g, ''))
    item.remove()
    console.log(thisId)
    
    localStorage.setItem('cantTodos', localStorage.getItem('cantTodos')-1);    
    for (let index = thisId; index < localStorage.getItem('cantTodos'); index++) {
        localStorage.setItem(`todo${index}`, localStorage.getItem(`todo${index+1}`));
        localStorage.setItem(`todo${index}Pos`, localStorage.getItem(`todo${index+1}Pos`));
        todosItemArray[index+1].id = `todo${index}`
    }
    localStorage.removeItem(`todo${localStorage.getItem('cantTodos')}`)
    localStorage.removeItem(`todo${localStorage.getItem('cantTodos')}Pos`)
}

let itemOnBoard = (event, item, newItem) =>{
    
    let board = containerMain.getBoundingClientRect().top - 60 < ( item.offsetTop - todoPositions.movementY) && event.clientY < containerMain.getBoundingClientRect().bottom && 
                containerMain.getBoundingClientRect().left + 130 < ( item.offsetLeft - todoPositions.movementX) && event.clientX < containerMain.getBoundingClientRect().right 

    if (!board && newItem) {
        borrarItem(item)
    }
}

let trash = (event, item)=>{

    let delate = btnTrash.getBoundingClientRect().top < event.clientY && event.clientY < btnTrash.getBoundingClientRect().bottom && 
                btnTrash.getBoundingClientRect().left < event.clientX && event.clientX < btnTrash.getBoundingClientRect().right
    
    if (delate) {
        borrarItem(item)

    }
}

let trashOpacity = (event, item)=>{
    
    let delate = btnTrash.getBoundingClientRect().top < event.clientY && event.clientY < btnTrash.getBoundingClientRect().bottom && 
    btnTrash.getBoundingClientRect().left < event.clientX && event.clientX < btnTrash.getBoundingClientRect().right;
    (delate) ? item.style.opacity = ".8" : item.style.opacity = "1";
}

/* ========== Agrega un nuevo Todo ========== */

let btnTodo = document.querySelector("[btnTodo]")
btnTodo.addEventListener('mousedown', (event) =>{
    event.preventDefault();
    newItem = true
    containerMain.insertAdjacentHTML('beforeend',todoHtmlItem(document.querySelectorAll("[todoItem]").length));
    localStorage.setItem('cantTodos', document.querySelectorAll("[todoItem]").length);
    const last = Array.from(document.querySelectorAll("[todoItem]")).pop();
    drag(event, last, newItem)
    listenItems()
});

listenItems()



/* new MutationObserver((mutationsList) => {
    // console.log(mutationsList.length)
    
    mutationsList.forEach(function(mutation) {
        console.log (mutation.target)
        
        
    }); 

}).observe(containerMain,{  
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true 
})
 */


/*----------------------------------*/

class ToDoList extends HTMLElement {
    constructor() {
        super();
        this.todos = JSON.parse(localStorage.getItem(`${this.getAttribute("id")}`)) || [{
            id: 0,
            done: false,
            content: "",
        }]
    
        this.containerMain = document.querySelector("[board]");

        
    }

    connectedCallback() {
        console.log(`${this.getAttribute("id")} ADDED TO THE DOM`);
        /* ============================================================*/

        this.firstPos = JSON.parse(localStorage.getItem(`${this.getAttribute("id")}Pos`)) || {
            posY: "46px",
            posX: "16px"
        }
        this.style.top = this.firstPos.posY
        this.style.left = this.firstPos.posX
        
        this.printTodos();
       
    }

    disconnectedCallback() {
        console.log('Todo REMOVED TO THE DOM');
    }

    /* metodos */

    /*====================================================================================================================================*/

    taskItem(i){
        const item =  
            `   
            <li id="task${this.todos[i].id}" class="task-item flex flex-row justify-between align-items-start my-4">

                <div class="flex flex-row align-items-start flex-fill">
                    <input todo-check class="checkbox mr-16 mt-4" type="checkbox" ${(this.todos[i].done) ? "checked": ""}>
                    <p todo-task class="task fw-6 f-b1 c-g1" placeholder="Add a task..." contenteditable="true" tabindex="1">${this.todos[i].content}</p>
                </div>
                
                <svg todo-trash class="trash cursor-pointer p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <g transform="translate(-89.25 -860.75)">
                        <line class="trash-a" x2="24" transform="translate(90.5 867)"/>
                        <path class="trash-b" d="M2,0h8a2,2,0,0,1,2,2V5a0,0,0,0,1,0,0H0A0,0,0,0,1,0,5V2A2,2,0,0,1,2,0Z" transform="translate(96.5 862)"/>
                        <path class="trash-b" d="M0,0H18L16,17a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Z" transform="translate(93.5 867)"/>
                    </g>
                </svg>

                <!-- <div class="flex flex-row justify-end">
                <button class="btn-text b-trans f-b2 fw-6 c-c1 ml-8" @click="removeAllTodos">Remove All</button>
                <button class="btn-text b-trans f-b2 fw-6 c-c1 ml-8" @click="markAllDone">Mark All</button>
            
                </div> -->
                
            </li>
            `
        return item
    }

    printTodos(){
        this.innerHTML =`<ul taskItems class="flex flex-column"></ul>`
        // <p id="titletask" class="title f-st1 c-c3 mb-16" placeholder="Add a title..." contenteditable="true"></p>
        let container = this.querySelector('[taskItems]')
        container.innerHTML = ""
        for (let i = 0; i < this.todos.length; i++) {
            container.insertAdjacentHTML('beforeend',this.taskItem(i));
        }
        //console.log(this.todos)
        
        this.obsChanges()
    
    }

    /*====================================================================================================================================*/

    obsChanges() {
    
        let taskItems = this.querySelector('[taskItems]')
        //console.log(taskItems)
        /*----------------------------------------------------------------*/
        /* -----------: Observo los cambios en el contenedor */

        taskItems.addEventListener('keydown', (e)=>{
            let index = this.getTargetId(e)
            if (index != -1) {
            
                /* -----------: Acciones con el enter */
                this.enterKey(e,index)
                
                /* -----------: Acciones con el delete */
                //deleteKey(e,index)
                
            }
        });

            
        taskItems.addEventListener('keyup', (e)=>{
            let index = this.getTargetId(e)        
            if (index != -1) {
                /* -----------: Cada vez que se levante una tecla, si el content sufre cambios estos se gurdaran en el array */
                this.addArray(e,index)
            }
        });

        taskItems.addEventListener('click', (e)=>{
            let index = this.getTargetId(e)
            if (index != -1) {
                
                /* -----------: Borra un elemento cuando se le da click al boton */
                if (this.getBoleanClick(e, index, '[todo-trash]') && this.todos.length > 1) {
                    this.deleteArray(index)
                }

                /* -----------: Marca como completado el task */
                this.checkBtn(e, index)


            }
        });

    }

    /*====================================================================================================================================*/

    /* -----------: Retorna la posicion del cursor de un item */
    getTargetId = (e)=>{
        let index = null
        let tasksHtmlArray = Array.from(this.querySelector('[taskItems]').children)
        tasksHtmlArray.forEach(todoItem =>{
            if (todoItem.contains(e.target)) index = tasksHtmlArray.indexOf(todoItem);
        })
        return index
    
    }

    /* -----------: Devuelve true si se cliqueo en el elemento pasdo por parametro o en al algun sub elemento del mismo  */
    getBoleanClick(e, index, element){
        let item = ((this.querySelector('[taskItems]').children)[index])
        let btn = item.querySelector(element)
        let boleanSubElements = btn.contains(e.target)
        return  boleanSubElements
    }

    /* -----------: Coloca el cursor en en siguiente task*/
    setCursor(index, position){ 
        let todosHtmlArray = Array.from(this.querySelector('[taskItems]').children)
        let nextNode = todosHtmlArray[index].querySelector('[todo-task]')
    
        const selection = window.getSelection();  
        const range = document.createRange();  
    
        if (position === "start") {
            range.setStart(nextNode, 0);
        }else{
            range.selectNodeContents(nextNode);
            range.collapse(false);
        }
        selection.removeAllRanges();  
        selection.addRange(range);
        nextNode.focus();
    }

    getCaretIndex(element) {
        let position = 0;
        const isSupported = typeof window.getSelection !== "undefined";
        if (isSupported) {
            const selection = window.getSelection();
            
            if (selection.rangeCount !== 0) {
            
                const range = window.getSelection().getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                if (preCaretRange.startContainer.innerText.includes("\n")) {
                    
                    position = preCaretRange.toString().length + 1;
                }else{
    
                    position = preCaretRange.toString().length;
                }
                //console.log("d",selection.focusOffset)
                //console.log(preCaretRange.toString().length)
                //console.log(position)
    
            }
        }
        return position;
    }
    
    /*====================================================================================================================================*/

    /* -----------: Agrega un task al array  */
    addArray(e, index){
        
        this.todos[index] = {
            id: index,
            done: false,
            content: e.target.innerText
        }
        localStorage.setItem(`${this.getAttribute("id")}`, JSON.stringify(this.todos));
    }

    /* -----------: ELimina un task al array  */
    deleteArray(index){
    
        for (let i = index; i < this.todos.length; i++) {
            this.todos[i].id = i-1
        }

        this.todos.splice(index, 1);
        this.printTodos()
    
        localStorage.setItem(`${this.getAttribute("id")}`, JSON.stringify(this.todos));
    }

    /* -----------: Guarda si el tas esta completado o no  */
    checkBtn(e, index){

        if (this.getBoleanClick(e, index, '[todo-check]')) {
            this.todos[index].done = !this.todos[index].done
            this.printTodos()
        }
        localStorage.setItem(`${this.getAttribute("id")}`, JSON.stringify(this.todos));
    
    }

    /*====================================================================================================================================*/

    enterKey(e,index){
    
        if (e.key == "Enter" && !e.shiftKey){
            e.preventDefault()
            this.todos.splice(index+1, 0,  {
                id: index+1,
                done: false,
                content: "",
            })

            /* -----------: Mueve los id una posicion mas */
            for (let i = index+2; i < this.todos.length; i++) {
                if (this.todos.length != 2){
                    this.todos[i].id = i
                }
            }
            
            this.printTodos()
            
            this.setCursor(index+1,"start")
            console.log(this.todos);
            
            
        }
    }

    /*====================================================================================================================================*/

}
window.customElements.define('todo-item', ToDoList);




    // /*====================================================================================================================================*/

    // drag(){

    //     this.addEventListener('mousedown', function(event){
    //         setTimeout(() => {
    //             event.preventDefault();

    //             this.positions.clientY = event.clientY
    //             this.positions.clientX = event.clientX

    //             document.onmousemove = (event)=> {

    //                 event.preventDefault()
    //                 this.positions.movementY = this.positions.clientY - event.clientY
    //                 this.positions.movementX = this.positions.clientX - event.clientX
    //                 this.positions.clientX = event.clientX
    //                 this.positions.clientY = event.clientY
    //                 // set the element's new position:
    //                 this.style.top = ( this.offsetTop - this.positions.movementY) + "px"
    //                 this.style.left = ( this.offsetLeft - this.positions.movementX) + "px"

    //                 let pos = {
    //                     posY: this.style.top,
    //                     posX: this.style.left
    //                 }
                    
    //                 localStorage.setItem(`${this.getAttribute("id")}Pos`, JSON.stringify(pos));

    //                 this.trashOpacity(event)
                    
    //             }
    //             document.onmouseup = (event)=> {
    //                 document.onmouseup = null
    //                 document.onmousemove = null

    //                 this.trash(event)

    //                 let board = this.containerMain.getBoundingClientRect().top - 60 < ( this.offsetTop - this.positions.movementY) && event.clientY < this.containerMain.getBoundingClientRect().bottom && 
    //                 this.containerMain.getBoundingClientRect().left + 130 < ( this.offsetLeft - this.positions.movementX) && event.clientX < this.containerMain.getBoundingClientRect().right 
    //                 let onetime = true

    //                 console.log(board,( this.offsetTop - this.positions.movementY), this.btnTodo.getBoundingClientRect().left)
    //                 if (board && onetime) {
    //                     onetime = false
    //                     this.containerMain.insertAdjacentElement('beforeend',this);
    //                 }
    //                 else{
    //                     this.style.opacity = ".8"
    //                     this.style.top = "-25px"
    //                     this.style.left = "0px"


    //                     let pos = {
    //                         posY: this.style.top,
    //                         posX: this.style.left
    //                     }
                        
    //                     localStorage.setItem(`${this.getAttribute("id")}Pos`, JSON.stringify(pos));


    //                 }
    //             }

    //         }, 10);
    //     })
    // }

    // /*====================================================================================================================================*/

    // trash(event){
    //     let delate = this.btnTrash.getBoundingClientRect().top < event.clientY && event.clientY < this.btnTrash.getBoundingClientRect().bottom && 
    //     this.btnTrash.getBoundingClientRect().left < event.clientX && event.clientX < this.btnTrash.getBoundingClientRect().right
    //     if (delate) {
    //         //this.style.opacity = ".8"
    //         let todosItemArray = document.querySelectorAll("[todoItem]")
    //         let thisId = Number(this.getAttribute("id").replace( /^\D+/g, ''))
    //         console.log(thisId)
    //         this.remove()
            
    //         localStorage.setItem('cantTodos', localStorage.getItem('cantTodos')-1);    
    //         for (let index = thisId; index < localStorage.getItem('cantTodos'); index++) {
    //             localStorage.setItem(`todo${index}`, localStorage.getItem(`todo${index+1}`));
    //             localStorage.setItem(`todo${index}Pos`, localStorage.getItem(`todo${index+1}Pos`));
    //             todosItemArray[index+1].id = `todo${index}`
    //         }
    //         localStorage.removeItem(`todo${localStorage.getItem('cantTodos')}`)
    //         localStorage.removeItem(`todo${localStorage.getItem('cantTodos')}Pos`)

    //     }
    // }

    // trashOpacity = (event)=>{
        
    //     let delate = this.btnTrash.getBoundingClientRect().top < event.clientY && event.clientY < this.btnTrash.getBoundingClientRect().bottom && 
    //     this.btnTrash.getBoundingClientRect().left < event.clientX && event.clientX < this.btnTrash.getBoundingClientRect().right;
    //     (delate) ? this.style.opacity = ".8" : this.style.opacity = "1";
    // }
