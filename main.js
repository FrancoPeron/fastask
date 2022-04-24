
import './style.scss'

function taskItem(val){
    const item =  
        `   
        <div id="task${val.id}" class="task-item flex flex-row justify-between align-items-start mb-8">

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

        </div>
        `
    return item
}

const addArray = (e, index ) => {
    
    todos[index] = {
        id: index,
        done: "",
        content: (e.currentTarget).innerText,
    }

}

function showTask(){

    let container = document.querySelector('[for="target"]')

    setTimeout(() => {
        container.insertAdjacentHTML('beforeend', taskItem(todos[0]));
    }, 100);

    let cant = 0;

    const config = {  
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true };
    
        
    const observer = new MutationObserver((mutationsList) => {
        // console.log(mutationsList.length)
        
        mutationsList.forEach(function(mutation) {
            
            console.log(mutation);

            (mutation.target).addEventListener('keydown', (e) => {
                

                if (e.key == "Enter"){
                    
                    
                    addArray(e,cant)
                    const node = document.createElement("li")
                    node.innerHTML = taskItem(todos[cant])
                    container.append(node)
                    

                    cant+=1;
                    console.log(todos)
                    console.log(mutation)


                    e.preventDefault()
                  
                }

                
            });



           /*  (mutation.target).addEventListener("keyup", function(e){


                
                
            }, false); */
            // console.log(mutation.attributeName)
        }); 

      
        
      /*   for(var i = 0; i < items.length; i++) {
        
            items[i].addEventListener("keyup", function(e){
                addArray(i, e) // agrego una tarea
                
                if(e.key == "Enter"){
                    container.insertAdjacentHTML('beforebegin', taskItem(todos[i]));
                    e.currentTarget.innerText = "";
                    console.log(todos)
                    i++;
                    items = document.querySelectorAll(".task");
                }
                
                
                
            }, false);
        } */
      
    })
    observer.observe(container, config)
    

}


/*--------------------------------------------------------*/

const todos = [];
todos[0] = {
    id: 0,
    done: "",
    content: "",
}


showTask();




/* const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(function(mutation) {
       console.log(mutation)
      });   
})
observer.observe(document.getElementById('titletask'),  {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
})

 */
   /*  container.addEventListener("DOMNodeInserted", function(e){
        items = document.querySelectorAll(".task");
        console.log(items)
    })
 */