
import './style.scss'

function taskItem(val){
    const item =  
        `   
        <li class="task-item flex flex-row justify-between align-items-start mb-8">

            <div class="flex flex-row align-items-start flex-fill">
                <input class="checkbox mr-12 mt-4" type="checkbox" ${val.done}>
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

    let trashBtn = ((e.target.parentElement.children)[1]).getAttribute('btn')

    // console.log(e.target.parentElement.children[1])

    let newArray =  Array.from(container.children)
    const index = newArray.indexOf(e.target.parentElement.parentElement);
    console.log(index,"--");

    if (trashBtn === "trash" && todos.length > 1) {
        deleteArray(index-1)
    }
    // console.log(todos);
}

function keyup(e){
    e.preventDefault()
    
    let newArray =  Array.from(container.children)
    const index = newArray.indexOf(e.target.parentElement.parentElement);
    console.log(index,"--");

    
    if (index != -1) {

        addArray(e,index)
        
        if (e.key == "Enter"){

            todos.splice(index+1, 0,  {
                done: "",
                content: "",
            })
        
            printTodos()
            
            let todosHtmlArray = Array.from(container.children)
            let nextNode = todosHtmlArray[index+1].querySelector(".task")
            setCursor(nextNode)
            
        }
        

        if (e.key === "Backspace" && e.target.innerText == ""){
            console.log(e.key)
            deleteArray()
            
        }
        
    }

    console.log(todos);
}

const addArray = (e, index) => {
    
    todos[index] = {
        done: "",
        content: e.target.innerText,
    }
}

function deleteArray(index){
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
        
        /* console.log((mutation.target))
        ((mutation.target).querySelector('.trash')).addEventListener('click', click) */
        
       


       
    }); 

}).observe(container, config)
































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
