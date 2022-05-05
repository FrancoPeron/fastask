

/* 
class Todo extends HTMLElement{


    constructor(){
        super()
        this.attachShadow({ mode: "open" })

        const todos = [];
        todos[0] = {
            id: 0,
            done: "",
            content: "",
        }

        
    }
    
    
    connectedCallback() {
        console.warn("connectedCallback")

        this.shadowRoot.innerHTML =  
        `   
        <li id="${this.todos[0].id}" class="task-item flex flex-row justify-between align-items-start mb-8">

            <div class="flex flex-row align-items-start flex-fill">
                <input class="checkbox mr-12 mt-4" type="checkbox" ${this.todos[0].done}>
                <p class="task fw-6 f-b1 c-g1" placeholder="Add a task..." contenteditable="true">${this.todos[0].content}</p>
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
    
    }

    disconnectedCallback() {
        console.error("disconnectedCallback")      
    }

 
}

window.customElements.define("todo-component", Todo)
 */

const templateTodo = document.createElement('template');
templateTodo.innerHTML = `
    <section>
        <todo-input></todo-input>
        <ul id="list-container"></ul>
    </section>
`;

class MyTodo extends HTMLElement {
    constructor() {
        super();
        // Do not use shadow DOM to avoid problems when testing with selenium
        // this._root = this.attachShadow({ 'mode': 'open' });
        // initial state
        this._list = [
            { text: 'my initial todo', checked: false },
            { text: 'Learn about Web Components', checked: true }
        ];
    }

    connectedCallback() {
        this.appendChild(templateTodo.content.cloneNode(true));
        this.$input = this.querySelector('todo-input');
        this.$listContainer = this.querySelector('#list-container');
        this.$input.addEventListener('onSubmit', this.addItem.bind(this));
        this._render();
    }

    addItem(e) {
        this._list.push({ text: e.detail, checked: false, });
        this._render();
    }

    removeItem(e) {
        this._list.splice(e.detail, 1);
        this._render();
    }

    toggleItem(e) {
        const item = this._list[e.detail];
        this._list[e.detail] = Object.assign({}, item, {
            checked: !item.checked
        });
        this._render();
    }

    disconnectedCallback() { }

    _render() {
        if (!this.$listContainer) return;
        // empty the list
        this.$listContainer.innerHTML = '';
        this._list.forEach((item, index) => {
            let $item = document.createElement('todo-item');
            $item.setAttribute('text', item.text);
            $item.checked = item.checked;
            $item.index = index;
            $item.addEventListener('onRemove', this.removeItem.bind(this));
            $item.addEventListener('onToggle', this.toggleItem.bind(this));
            this.$listContainer.appendChild($item);
        });
    }
}

window.customElements.define('my-todo', MyTodo);