
import './style.scss'




const todos = [];
todos[0] = {
    id: 0,
    done: "",
    content: "",
}

function taskItem(val){
    const item =  
        `   
        <li id="${val.id}" class="task-item flex flex-row justify-between align-items-start mb-8">

            <div class="flex flex-row align-items-start flex-fill">
                <input class="checkbox mr-12 mt-4" type="checkbox" ${val.done}>
                <p class="task fw-6 f-b1 c-g1" placeholder="Add a task..." contenteditable="true">${val.content}</p>
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



let container = document.querySelector('[for="target"]')
container.insertAdjacentHTML('afterend', taskItem(todos[0]));



const addArray = (index, e) => {
    
    todos[index] = {
        id: index,
        done: "",
        content: (e.currentTarget).innerText,
    }

   
}



function aD(){
   
    let items = document.querySelectorAll(".task");

    container.addEventListener("DOMNodeInserted", function(e){
        items = document.querySelectorAll(".task");
        console.log(items)
    })

    for (var i = 0; i < items.length; i++) {
        

        items[i].addEventListener("keyup", function(e){
 
           
            addArray(i, e)

            if(e.key == "Enter"){
                container.insertAdjacentHTML('beforeend', taskItem(todos[i]));
                console.log(todos)
                
                
                i++

            }
            
           
            
        }, false);
     
    
    }

}


aD()
