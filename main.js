

let containerMain = document.querySelector("[board]");
let btnTodo = (document.querySelector("[btnTodo]"))
let todoId = JSON.parse(localStorage.getItem('cantTodos')) || 0;

for (let index = 0; index < JSON.parse(localStorage.getItem('cantTodos')) ; index++) {
    containerMain.insertAdjacentHTML('beforeend',`<todo-item todoItem id="todo${index}" class="todoItem p-24 br-12 shadow bg-c4"></todo-item>`);
}

btnTodo.addEventListener('mousedown', e =>{
    containerMain.insertAdjacentHTML('beforeend',`<todo-item todoItem id="todo${todoId++}" class="todoItem p-24 br-12 shadow bg-c4"></todo-item>`);
    localStorage.setItem('cantTodos', JSON.stringify(todoId));
    
});

