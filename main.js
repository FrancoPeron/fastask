

let containerMain = document.querySelector("[board]");


/* todo */

for (let index = 0; index < JSON.parse(localStorage.getItem('cantTodos')) ; index++) {
    containerMain.insertAdjacentHTML('beforeend',`<todo-item todoItem id="todo${index}" class="todoItem p-24 br-12 shadow bg-c4"></todo-item>`);
}

let btnTodo = (document.querySelector("[btnTodo]"))
let todoId = JSON.parse(localStorage.getItem('cantTodos')) || 0;
btnTodo.addEventListener('mousedown', e =>{
    containerMain.insertAdjacentHTML('beforeend',`<todo-item todoItem id="todo${todoId++}" class="todoItem p-24 br-12 shadow bg-c4"></todo-item>`);
    localStorage.setItem('cantTodos', JSON.stringify(todoId));
    
});


/* document */

let docId = JSON.parse(localStorage.getItem('cantTodos')) || 0;
let btnDoc = (document.querySelector("[btnDoc]"))
btnDoc.addEventListener('mousedown', e =>{
    containerMain.insertAdjacentHTML('beforeend',`<document-item todoItem id="doc${docId++}" class="documentItem"></todo-item>></document-item>`);
    //localStorage.setItem('cantTodos', JSON.stringify(todoId));
    
});
