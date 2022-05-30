

class Document extends HTMLElement {
    constructor() {
        super();

        this.firstPos = JSON.parse(localStorage.getItem(`${this.getAttribute("id")}Pos`)) || {
            posY: "200px",
            posX: "160px"
        }

        this.positions = {
            clientX: undefined,
            clientY: undefined,
            movementX: 0,
            movementY: 0
        }
        
        this.main = document.getElementsByTagName("main")[0]
        
    }

    connectedCallback() {
        console.log(`${this.getAttribute("id")} ADDED TO THE DOM`);
        console.log(this);

        this.style.top = this.firstPos.posY
        this.style.left = this.firstPos.posX
        
        this.printTodos();
        this.drag()

                
        var quill = new Quill(`#${this.getAttribute("id")}editor`, {
            modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
            
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                // [{ 'direction': 'rtl' }],                         // text direction
                ['clean'],                                         // remove formatting button
                
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                
                [{ 'font': [] }]
            
            ]
            },
            theme: 'snow'
        });


        var delta = quill.getContents();
        console.log(delta)
        
        this.querySelector("[btnModal]").addEventListener('dblclick', () =>{

            console.log(`${this.getAttribute("id")}`)
            MicroModal.show(`${this.getAttribute("id")}item`);
        
        });
        //console.log(this.dragItems)
    }

    disconnectedCallback() {
        console.log('Todo REMOVED TO THE DOM');
    }

    /* metodos */

    /*====================================================================================================================================*/
/* 
    docItem(i){
        const item =  
            `   
            <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
                <div class="modal__overlay" tabindex="-1">
                    <div class="modal__container bg-c4 br-12 mx-24" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                    <header class="modal__header px-24 py-28">
                        <h2 id="modal-1-title" class="title f-st1 c-white" placeholder="Add a title..." contenteditable="true">New Document</h2>
                        <button class="modal__close c-white" aria-label="Close modal" data-micromodal-close/>
                    </header>
                    <main class="modal__content c-white" id="modal-1-content">
                        <div id="editor"></div>
                    </main>
                    </div>
                </div>
            </div>
            `
        return item
    } */

    printTodos(){
        this.innerHTML =`

           
                <img btnModal class="doc__img" src="./assets/img/btnDocument.svg" alt="">
                 
            `;
            this.main.insertAdjacentHTML('afterend', 
            ` <div class="modal micromodal-slide" id="${this.getAttribute("id")}item" aria-hidden="true">
            <div class="modal__overlay" tabindex="-1">
                <div class="modal__container bg-c4 br-12 mx-24" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                <header class="modal__header px-24 py-28">
                    <h2 id="modal-1-title" class="title f-st1 c-white" placeholder="Add a title..." contenteditable="true">New Document</h2>
                    <button class="modal__close c-white" aria-label="Close modal" data-micromodal-close/>
                </header>
                <main class="modal__content c-white" id="modal-1-content">
                    <div id="${this.getAttribute("id")}editor"></div>
                </main>
                </div>
            </div>
        </div>  `);
        // <p id="titletask" class="title f-st1 c-c3 mb-16" placeholder="Add a title..." contenteditable="true"></p>
        /*  let container = this.querySelector('[taskItems]')
        container.innerHTML = ""
        for (let i = 0; i < this.todos.length; i++) {
        }
        console.log(this.todos)
        
        this.obsChanges() */
    
    }

    /*====================================================================================================================================*/

    drag(){

        this.addEventListener('mousedown', function(event){
            setTimeout(() => {
                event.preventDefault();
                //console.log(this)
                // get the mouse cursor position at startup:
                this.positions.clientY = event.clientY
                this.positions.clientX = event.clientX

                document.onmousemove = (event)=> {
                    
                    console.log()
                    event.preventDefault()
                    this.positions.movementY = this.positions.clientY - event.clientY
                    this.positions.movementX = this.positions.clientX - event.clientX
                    this.positions.clientX = event.clientX
                    this.positions.clientY = event.clientY
                    // set the element's new position:
                    this.style.top = ( this.offsetTop - this.positions.movementY) + "px"
                    this.style.left = ( this.offsetLeft - this.positions.movementX) + "px"

                    let pos = {
                        posY: this.style.top,
                        posX: this.style.left
                    }
                    
                    //localStorage.setItem(`${this.getAttribute("id")}Pos`, JSON.stringify(pos));
                    
                }
                document.onmouseup = ()=> {
                    document.onmouseup = null
                    document.onmousemove = null
                }

            }, 10);
        })
    }

 
    /*====================================================================================================================================*/

}
window.customElements.define('document-item', Document);

