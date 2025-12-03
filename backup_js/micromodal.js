const MicroModal = window.MicroModal;
MicroModal.init();

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
