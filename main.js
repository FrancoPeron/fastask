
import './style.scss'

function taskItem(val){
    const item =  
        `   
        <li id="task${val.id}" class="task-item flex flex-row justify-between align-items-start mb-8">

            <div class="flex flex-row align-items-start flex-fill">
                <input todo-check class="checkbox mr-12 mt-4" type="checkbox" ${val.done}>
                <p class="task fw-6 f-b1 c-g1" placeholder="Add a task..." contenteditable="true" tabindex="1">${val.content}</p>
            </div>
            
            <svg btn="trash" class="trash cursor-pointer p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
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


function click(e){

    /* Me da el id del elemnto que clickie */
  
    let newArray = Array.from(container.children)
    let index = null
    newArray.forEach(todoItem =>{
        let todoItemClicked = todoItem.contains(e.target)
        if(todoItemClicked) index = newArray.indexOf(todoItem);
    })

    /*---------------------------------------------------*/

    /* Borar */
    
    let btnTrash = ((container.children)[index]).querySelector('[btn="trash"]')
    let subElemnts = btnTrash.contains(e.target)


    if (subElemnts && todos.length > 1) {
        deleteArray(index)
    }


    /*********************** */

    let btnCheck = ((e.currentTarget.children)[index]).querySelector('[todo-check]')
    
    console.log(btnCheck);
}

function keyup(e){
    e.preventDefault()
    
    let newArray =  Array.from(container.children)
    const index = newArray.indexOf(e.target.parentElement.parentElement);
    //console.log(index,"---");

    
    if (index != -1) {

        addArray(e,index)
        console.log(todos);
        if (e.key == "Enter"){
            
            console.warn(index+1)
            todos.splice(index+1, 0,  {
                id: index+1,
                done: "",
                content: "",
            })
            
            for (let i = index+2; i < todos.length; i++) {
                if (todos.length != 2){

                    console.log( todos[i].id)
                    todos[i].id = i
                }
            }
            
            printTodos()
            
            let todosHtmlArray = Array.from(container.children)
            let nextNode = todosHtmlArray[index+1].querySelector(".task")
            setCursor(nextNode)
            //console.log(todos);
            
            
        }
        

        if (e.key === "Backspace" && e.target.innerText == ""){
            console.log(e.key)
            deleteArray()
            
        }
        
    }

    //console.log(todos);
}

const addArray = (e, index) => {
    
    todos[index] = {
        id: index,
        done: "",
        content: e.target.innerText.slice(0, -2),
    }
}

function deleteArray(index){
    
    for (let i =  index; i < todos.length; i++) {
        todos[i].id = i-1
    }
    todos.splice(index, 1);
    printTodos()
}


function setCursor(el){ 
    const selection = window.getSelection();  
    const range = document.createRange();  
    selection.removeAllRanges();  
    range.selectNodeContents(el);  
    range.collapse(false);  
    selection.addRange(range);  
    el.focus();
}


function printTodos(){

    container.innerHTML = ""
    for (let index = 0; index < todos.length; index++) {
        
        container.insertAdjacentHTML('beforeend',taskItem(todos[index]));
    }

}

/*--------------------------------------------------------*/

let container = document.querySelector('[for="target"]')
const todos = [{
    id: 0,
    done: "",
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
    // console.log(mutationsList.length)
    
    mutationsList.forEach(function(mutation) {

        if(document.contains((mutation.target))) {
            console.log('#child has been added');
            //observer.disconnect();
        }

        (mutation.target).addEventListener('keyup', keyup);
        (mutation.target).addEventListener('click', click);
        
        //console.log((mutation.target))
        // ((mutation.target).querySelector('.trash')).addEventListener('click', click)
        

    }); 

}).observe(container, config)
















console.log(document.body.contains(document.querySelector("main")))















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
