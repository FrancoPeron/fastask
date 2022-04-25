
import './style.scss'

function taskItem(val){
    const item =  
        `   
        <li id="task${val.id}" class="task-item flex flex-row justify-between align-items-start mb-8">

            <div class="flex flex-row align-items-start flex-fill">
                <input class="checkbox mr-12 mt-4" type="checkbox" ${val.done}>
                <p task="${val.id}" class="task fw-6 f-b1 c-g1" placeholder="Add a task..." contenteditable="true">${val.content}</p>
            </div> 

            <svg class="trash cursor-pointer p-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
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

const addArray = (e, index) => {
    
    todos[index] = {
        id: index,
        done: "",
        content: (e.currentTarget).innerText,
    }
    
    todos.splice(index+1, 0,  {
        id: index+1,
        done: "",
        content: "",
    })
    if ( todos[index+1].content !== todos[index].content ) {
      console.log("s")  
    }


}

function showTask(){


    cant = 1;
    
        
    const observer = new MutationObserver((mutationsList) => {
        // console.log(mutationsList.length)
        
        mutationsList.forEach(function(mutation) {
            
            console.log((mutation.target));
            
            (mutation.target).addEventListener('keydown', (e) => {
                //console.log(e.target)
                console.log(e)
                addArray(e,cant)
                
                if (e.key == "Enter"){
                    
                    e.preventDefault()
                    console.log(e.target)
                    console.log(mutation.addedNodes)
                    
                    
                    const node = document.createElement("li")
                    node.innerHTML = taskItem(todos[cant])
                    container.append(node)
                    e.preventDefault()
                    cant+=1;
                    
                    
                    
                } 

                
            });

            (mutation.target).addEventListener('click', (e) => {
                console.log(e.target)
            })
        }); 

    })
    observer.observe(container, config)
    

}

function showTask2(){

    container.insertAdjacentHTML('beforeend',taskItem(todos[cant]));
    cant+=1;
    let items = document.querySelectorAll(".task");
    var el = document.documentElement;
    el.addEventListener('DOMNodeInserted', e => {

        items.forEach((item,i) => {


            item.addEventListener('change', fp)

            // item.removeEventListener('keydown', enter)

            item.addEventListener('keypress', enter)
        })

        items = document.querySelectorAll(".task")

    }, false);
        
}

function enter(e){
    
    if (e.key == "Enter"){
        e.preventDefault()

        let index = parseInt((e.target).getAttribute("task"))
        console.log(e.target)
        
        addArray(e,index)
        
        container.insertAdjacentHTML('beforeend',taskItem(todos[index+1]));
        cant+=1;

        // container.insertAdjacentHTML('beforeend',taskItem(todos[cant+1]));
        
        console.log(todos);

    }
}

function fp(e){
    console.log(2,e)
}


/*--------------------------------------------------------*/

const todos = [];
let container = document.querySelector('[for="target"]')
const config = {  
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true 
};

todos[0] = {
    id: 0,
    done: "",
    content: "",
}


let cant = 0;


showTask2();




  /* const node = document.createElement("li")
        node.innerHTML = taskItem(todos[cant])


        console.log(items[cant-1])
        container.insertBefore(node,items[cant-1]) */
