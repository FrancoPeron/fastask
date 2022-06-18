import { dragEvent } from "./dragEvents.js";
import Quill from 'quill';
let tool = "text";
let HtmlItem = (val)=>{ return `<text-item textItem id="text${val}" class="textItem p-24 br-4 shadow bg-c4 z-20"></text-item>`}

function insertItem(drag,listenItems) {
    let containerMain = document.querySelector("[board]");
    document.querySelector(`[btn-${tool}]`).addEventListener('mousedown', (event) =>{
        event.preventDefault();
        containerMain.insertAdjacentHTML('beforeend',HtmlItem(document.querySelectorAll(`[${tool}Item]`).length));
        localStorage.setItem(`cant-${tool}s`, document.querySelectorAll(`[${tool}Item]`).length);
    
        const last = Array.from(document.querySelectorAll(`[${tool}Item]`)).pop();
        drag(event, last, true)
        listenItems()
    });

}

dragEvent(tool,HtmlItem,insertItem)

/*----------------------------------*/

class TextList extends HTMLElement {
    constructor() {
        super();
        this.textData = JSON.parse(localStorage.getItem(`${this.getAttribute("id")}`)) || ""
    
    }

    connectedCallback() {
        console.log(`${this.getAttribute("id")} ADDED TO THE DOM`);
        /* ============================================================*/

        this.firstPos = JSON.parse(localStorage.getItem(`${this.getAttribute("id")}Pos`)) || {
            posY: "10px",
            posX: "16px"
        }
        this.style.top = this.firstPos.posY
        this.style.left = this.firstPos.posX
        
        this.printTodos();
       
    }

    disconnectedCallback() {
        console.info('Todo REMOVED TO THE DOM');
    }

    /* metodos */

    /*====================================================================================================================================*/

   

    printTodos(){
        this.innerHTML =`
        
        <main class="text-modal c-white" id="modal-1-content">
            <div id="${this.getAttribute("id")}editor">${this.textData}</div>
        </main>
        `
       
        this.obsChanges()
    
    }

    /*====================================================================================================================================*/

    obsChanges() {
        
        var quill = new Quill(`#${this.getAttribute("id")}editor`, {
            modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                ['code-block'],
                
            ]
            },
            theme: 'snow'
        });

        let textId = this.getAttribute("id")
        document.querySelector(`#${textId}editor`).addEventListener('DOMSubtreeModified', (e)=>{
            localStorage.setItem(`${textId}`, JSON.stringify(quill.root.innerHTML));
        })
      
    }


    /*====================================================================================================================================*/

}
window.customElements.define('text-item', TextList);