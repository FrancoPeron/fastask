

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

function todoItem(){
    const item =
    `  
    <div todoItem class="todoItem p-24 br-12 shadow bg-c4">

    
        <ul taskItems class="flex flex-column my-12"></ul>
    
    </div>
    `
    return item
}

{/* <h2 id="titletask" class="title f-st1 c-c3 mb-16" placeholder="Add a title..." contenteditable="true"></h2> */}
/* -----------: Imprime por pantalla los task (tareas) */
function printTodos(){
    let taskItems = document.querySelector('[taskItems]')
    taskItems.innerHTML = ""
    for (let i = 0; i < todos.length; i++) {
        taskItems.insertAdjacentHTML('beforeend',taskItem(todos[i]));
    }

}

/*====================================================================================================================================*/

/*====================================================================================================================================*/

/* -----------: Retorna el id del elemento con el que se interactuo */
function getTargetId(e){
    let index = null
    let tasksHtmlArray = Array.from(document.querySelector('[taskItems]').children)
    tasksHtmlArray.forEach(todoItem =>{
        let todoItemClicked = todoItem.contains(e.target)
        if (todoItemClicked) 
            index = tasksHtmlArray.indexOf(todoItem);
    })
    return index

}

/* -----------: Retorna la posicion del cursor de un item */
function getCaretIndex(element) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        // Check if there is a selection (i.e. cursor in place)
        if (selection.rangeCount !== 0) {
            // Store the original range
            const range = window.getSelection().getRangeAt(0);
            // Clone the range
            const preCaretRange = range.cloneRange();
            // Select all textual contents from the contenteditable element
            preCaretRange.selectNodeContents(element);
            // And set the range end to the original clicked position
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            // Return the text length from contenteditable start to the range end
            /* if (range.endContainer.previousSibling != null) {
                console.log(preCaretRange.toString() + "ñ")
                console.log(range.toString())
            } */
            if (preCaretRange.startContainer.innerText.includes("\n")) {
                
                position = preCaretRange.toString().length + 1;
            }else{

                position = preCaretRange.toString().length;
            }
            console.log("d",selection.focusOffset)
            console.log(preCaretRange.toString().length)
            console.log(position)

        }
    }
    return position;
}

function setCursor(index, position){ 
    let todosHtmlArray = Array.from(document.querySelector('[taskItems]').children)
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

/*====================================================================================================================================*/

/* -----------: Agrega un task al array  */
function addArray(e, index){
    
    todos[index] = {
        id: index,
        done: todos[index].done,
        content: e.target.innerText.slice(0, getCaretIndex(e.target)),
    }

    localStorage.setItem('todos', JSON.stringify(todos));
}

/* -----------: ELimina un task al array  */
function deleteArray(index){
    
    for (let i = index; i < todos.length; i++) {
        todos[i].id = i-1
    }
    todos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todos));
    printTodos()
}

/*====================================================================================================================================*/

function enterKey(e,index){
    
    if (e.key == "Enter" && !e.shiftKey){
        
        /* -----------: Le doy enter, extraigo la plabra desde donde esta situado el cursor hasta el final de la palabra y la agrego en el content del sigiente task  */
        let newContent = ""
        if (getCaretIndex(e.target) < e.target.innerText.length)
            newContent = e.target.innerText.slice(getCaretIndex(e.target), e.target.innerText.length)

        todos.splice(index+1, 0,  {
            id: index+1,
            done: false,
            content: newContent,
        })
        
        console.log(e.target.innerText.length)
        console.log(getCaretIndex(e.target))
            
        /* -----------: Mueve los id una posicion mas */
        
        for (let i = index+2; i < todos.length; i++) {
            if (todos.length != 2){
                todos[i].id = i
            }
        }
        
        printTodos()
        
        setCursor(index+1,"start")
        console.log(todos);
        
        
    }
}

function deleteKey(e,index){
    
    /* -----------: Le doy delete, si el cursosr esta situado al incio elimino el task anterior */
    if (getCaretIndex(e.target) === 0 && todos.length > 1){ 
        
        if (e.key === "Backspace") {
            deleteArray(index);
            (index == 0) ? setCursor(index, "end") : setCursor(index-1, "end")
            
        }
        else{
            
        }
     /*    (e.target).addEventListener("keydown", (e) =>{
            e.preventDefault()
            

        })
             */
            
    }
   
}

function keyup(e){
    
    let index = getTargetId(e)

    if (index != -1) {
        /* -----------: Cada vez que se levante una tecla, si el content sufre cambios estos se gurdaran en el array */
        addArray(e,index)
        
        /* -----------: Acciones con el enter */
        enterKey(e,index)
        
        /* -----------: Acciones con el delete */
        deleteKey(e,index)
        
    }

}

/*====================================================================================================================================*/

/* -----------: Devuelve true si se cliqueo en el elemento pasdo por parametro o en al algun sub elemento del mismo  */
function getBoleanClick(e, index, element){
    let item = ((document.querySelector('[taskItems]').children)[index])
    let btn = item.querySelector(element)
    let boleanSubElements = btn.contains(e.target)
    return  boleanSubElements
}

function deleteBtn(e, index){
    
    if (getBoleanClick(e, index, '[todo-trash]') && todos.length > 1) {
        deleteArray(index)
    }
}

function checkBtn(e, index){

    if (getBoleanClick(e, index, '[todo-check]')) {
        todos[index].done = !todos[index].done
        printTodos()
    }
    localStorage.setItem('todos', JSON.stringify(todos));

}


function click(e){

    let index = getTargetId(e)
    if (index !== null) {

        /* -----------: Borra un elemento cuando se le da click al boton */
        deleteBtn(e, index)

        /* -----------: Marca como completado el task */
        checkBtn(e, index)

        console.log(todos);
    }
}

/*====================================================================================================================================*/


function mutObs() {
    
    let taskItems = document.querySelector('[taskItems]')
    /*----------------------------------------------------------------*/
    /* -----------: Observo los cambios en el contenedor */
    
    new MutationObserver((mutationsList) => {
        mutationsList.forEach(function(mutation) {
            
            (mutation.target).addEventListener('keyup', keyup);
            (mutation.target).addEventListener('click', click);
    
        }); 
        
    }).observe(taskItems, {  
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true 
    })
}

function drag(){


    let dragItem = document.querySelector("[todoItem]")
    
    dragItem.addEventListener('mousedown', function(event){
        setTimeout(() => {
            event.preventDefault()
            // get the mouse cursor position at startup:
            positions.clientX = event.clientX
            positions.clientY = event.clientY
            
            document.onmousemove = elementDrag;
            document.onmouseup = closeDragElement;
        }, 10);
    });


    function elementDrag (event) {
        event.preventDefault()
        positions.movementY = positions.clientY - event.clientY
        positions.movementX = positions.clientX - event.clientX
        positions.clientX = event.clientX
        positions.clientY = event.clientY
        // set the element's new position:
        dragItem.style.top = (dragItem.offsetTop - positions.movementY) + "px"
        dragItem.style.left = (dragItem.offsetLeft - positions.movementX) + "px"

        localStorage.setItem('posY', dragItem.style.top);
        localStorage.setItem('posX', dragItem.style.left);
    }

    function closeDragElement () {
        document.onmouseup = null
        document.onmousemove = null
    }

}

/*====================================================================================================================================*/

/* -----------: Array que contiene todos los task */
let todos = []

/* -----------: posicion del item */
let positions = {
    clientX: undefined,
    clientY: undefined,
    movementX: 0,
    movementY: 0
}

let containerBoard = document.querySelector("[board]")


todos = JSON.parse(localStorage.getItem("todos")) || [{
    id: 0,
    done: false,
    content: "",
}]
if (todos.length > 1 && todos[0].content != "") {
    
    containerBoard.insertAdjacentHTML('beforeend',todoItem());
    printTodos()
    
    let dragItem = document.querySelector("[todoItem]")
    dragItem.style.top = localStorage.getItem("posY")
    dragItem.style.left = localStorage.getItem("posX")

    drag()
    mutObs()
}


/* -----------: Boton Todo */
let btnTodo = document.querySelector("[btnTodo]")
btnTodo.addEventListener('mousedown', e =>{  
    
    containerBoard.insertAdjacentHTML('beforeend',todoItem());
    printTodos()    
    drag()
    mutObs()
});



/*====================================================================================================================================*/


























// let items = document.querySelectorAll(".task")
/*
let items = document.querySelectorAll(".task");
container.addEventListener('DOMNodeInserted', e => {

   
    
    items.forEach((item,i) => {
            
        item.addEventListener('keyup', enter.bind(e,i))
        printTodos()
            
            // item.removeEventListener('keydown', enter.bind(e,i))
    })
    
    e.preventDefault()
    // console.log(e.target.childNodes[1])
    console.log(items.length)
    console.log(todos);
    items = document.querySelectorAll(".task")
    
}, false);
 */



  /* const node = document.createElement("li")
        node.innerHTML = taskItem(todos[cant])


        console.log(items[cant-1])
        container.insertBefore(node,items[cant-1]) */
