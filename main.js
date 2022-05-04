



/*--------------------------------------------------------*/

let container = document.querySelector('[items-list]')
const todos = [{
    id: 0,
    done: false,
    content: "",
}]

const config = {  
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true 
};


printTodos()
    
new MutationObserver((mutationsList) => {
    
    mutationsList.forEach(function(mutation) {

        (mutation.target).addEventListener('keyup', keyup);
        (mutation.target).addEventListener('click', click);
        

    }); 

}).observe(container, config)

function keyup(e){

    let todosHtmlArray =  Array.from(container.children)
    const index = todosHtmlArray.indexOf(e.target.parentElement.parentElement);
    //console.log(index,"---");
    
    if (index != -1) {
        
        addArray(e,index)

        deleteBtn(e,index)

    }

    //console.log(todos);
}



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
function printTodos(){

    container.innerHTML = ""
    for (let i = 0; i < todos.length; i++) {
        container.insertAdjacentHTML('beforeend',taskItem(todos[i]));
    }

}





function addArray(e, index){
    
    todos[index] = {
        id: index,
        done: todos[index].done,
        content: e.target.innerText.slice(0, getCaretIndex(e.target)),
    }    
    
    if (e.key == "Enter" && !e.shiftKey){

        let newContent = ""

        if (getCaretIndex(e.target) < e.target.innerText.length-2) {
            
            newContent = e.target.innerText.slice(getCaretIndex(e.target), e.target.innerText.length)
        }
        
        console.log(e.target.innerText.length)
        console.log(getCaretIndex(e.target))
        todos.splice(index+1, 0,  {
            id: index+1,
            done: false,
            content: newContent,
        })
        
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

function deleteArray(index){
    
    for (let i = index; i < todos.length; i++) {
        todos[i].id = i-1
    }
    todos.splice(index, 1);
    printTodos()
}


function setCursor(index, position ){ 
    let todosHtmlArray = Array.from(container.children)
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
            position = preCaretRange.toString().length;
        }
    }
    return position;
}

function deleteBtn(e,index){
   
    if (getCaretIndex(e.target) === 0 && todos.length > 1){ 

        (e.target).addEventListener("keydown", (e) =>{
            
            if (e.key === "Backspace") {
                deleteArray(index);
                (index == 0) ? setCursor(index, "end") : setCursor(index-1, "end")
                
                e.preventDefault()
            }
            else{
                
            }

        })
            
            
    }
   
}





function click(e){

    
    /* Me da el id del elemnto que clickie */
    
    let newArray = Array.from(container.children)
    let index = null
    newArray.forEach(todoItem =>{
        let todoItemClicked = todoItem.contains(e.target)
        if(todoItemClicked) index = newArray.indexOf(todoItem);
    })

    console.log(index)
    
    if (index !== null) {
        let item = ((container.children)[index])
        /*---------------------------------------------------*/

        /* Borar */
        
        let btnTrash = item.querySelector('[todo-trash]')
        let subTrashElements = btnTrash.contains(e.target)

        if (subTrashElements && todos.length > 1) {
            deleteArray(index)
        }


        /*---------------------------------------------------*/
        /* Check */

        let btnCheck = item.querySelector('[todo-check]')
        let subCheckElements = btnCheck.contains(e.target)

        if (subCheckElements) {
            todos[index].done = !todos[index].done
            printTodos()
        }
        console.log(todos);
    }
}















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
