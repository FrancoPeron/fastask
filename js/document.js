
/* ========== Variables ========== */

let containerMain = document.querySelector("[board]");
let btnTrash = document.querySelector("[btnTrash]")
let newItem = false
/* Doc */
let docHtmlItem = (val)=>{ return `<document-item docItem id="doc${val}" class="documentItem z-20"></document-item>`}
let docPositions = {
    clientX: undefined,
    clientY: undefined,
    movementX: 0,
    movementY: 0
}

/* ========== Imprimo los datos del localStorage ========== */

let docId = localStorage.getItem('cantDoc') || 0;
for (let index = 0; index < docId ; index++) {
    containerMain.insertAdjacentHTML('beforeend',docHtmlItem(index));
}

/* ========== Functions ========== */

let drag = (event,item)=>{
    console.log(event, item)
    
    setTimeout(() => {
        event.preventDefault();
        docPositions.clientY = event.clientY
        docPositions.clientX = event.clientX

        document.onmousemove = (event)=> {

            event.preventDefault()
            docPositions.movementY = docPositions.clientY - event.clientY
            docPositions.movementX = docPositions.clientX - event.clientX
            docPositions.clientX = event.clientX
            docPositions.clientY = event.clientY
            // set the element's new position:
            item.style.top = ( item.offsetTop - docPositions.movementY) + "px"
            item.style.left = ( item.offsetLeft - docPositions.movementX) + "px"

            let pos = {
                posY: item.style.top,
                posX: item.style.left
            }
            
            localStorage.setItem(`${item.getAttribute("id")}Pos`, JSON.stringify(pos));

            trashOpacity(event, item)
            //event.target.trashOpacity(event)
            
        }
        document.onmouseup = (event)=> {
            document.onmouseup = null
            document.onmousemove = null
            
            trash(event,item)
            itemOnBoard(event,item, newItem)
        
        }

    }, 10);
}

let listenItems = ()=> {
    for (let index = 0; index < document.querySelectorAll("[docItem]").length; index++) {
        let item = document.querySelectorAll("[docItem]")[index]
        item.addEventListener("mousedown", (event) =>{
            newItem = false
            drag(event, item, newItem)
        });
    }
}

let borrarItem = (item)=>{
    let docsItemArray = document.querySelectorAll("[docItem]")
    let thisId = Number(item.getAttribute("id").replace( /^\D+/g, ''))
    item.remove()
    console.log(thisId)
    
    localStorage.setItem('cantDoc', localStorage.getItem('cantDoc')-1);    
    for (let index = thisId; index < localStorage.getItem('cantDoc'); index++) {
        localStorage.setItem(`doc${index}`, localStorage.getItem(`doc${index+1}`));
        localStorage.setItem(`doc${index}Pos`, localStorage.getItem(`doc${index+1}Pos`));
        docsItemArray[index+1].id = `doc${index}`
    }
    localStorage.removeItem(`doc${localStorage.getItem('cantDoc')}`)
    localStorage.removeItem(`doc${localStorage.getItem('cantDoc')}Pos`)
}

let itemOnBoard = (event, item, newItem) =>{
    
    let board = containerMain.getBoundingClientRect().top - 60 < ( item.offsetTop - docPositions.movementY) && event.clientY < containerMain.getBoundingClientRect().bottom && 
                containerMain.getBoundingClientRect().left + 130 < ( item.offsetLeft - docPositions.movementX) && event.clientX < containerMain.getBoundingClientRect().right 

    if (!board && newItem) {
        borrarItem(item)
    }
}

let trash = (event, item)=>{

    let delate = btnTrash.getBoundingClientRect().top < event.clientY && event.clientY < btnTrash.getBoundingClientRect().bottom && 
                btnTrash.getBoundingClientRect().left < event.clientX && event.clientX < btnTrash.getBoundingClientRect().right
    
    if (delate) {
        borrarItem(item)

    }
}

let trashOpacity = (event, item)=>{
    
    let delate = btnTrash.getBoundingClientRect().top < event.clientY && event.clientY < btnTrash.getBoundingClientRect().bottom && 
    btnTrash.getBoundingClientRect().left < event.clientX && event.clientX < btnTrash.getBoundingClientRect().right;
    (delate) ? item.style.opacity = ".8" : item.style.opacity = "1";
}

/* ========== Agrega un nuevo Document ========== */

let btnDoc = document.querySelector("[btnDoc]")
btnDoc.addEventListener('mousedown', (event) =>{
    event.preventDefault();
    newItem = true
    containerMain.insertAdjacentHTML('beforeend',docHtmlItem(document.querySelectorAll("[docItem]").length));
    localStorage.setItem('cantDoc', document.querySelectorAll("[docItem]").length);
    const last = Array.from(document.querySelectorAll("[docItem]")).pop();
    drag(event, last, newItem)
    listenItems()
});

listenItems()


class Document extends HTMLElement {
    constructor() {
        super();
        
        this.main = document.getElementsByTagName("main")[0]
        
    }

    connectedCallback() {
        console.log(`${this.getAttribute("id")} ADDED TO THE DOM`);
        /* ============================================================*/

        this.firstPos = JSON.parse(localStorage.getItem(`${this.getAttribute("id")}Pos`)) || {
            posY: "160px",
            posX: "0px"
        }

        this.style.top = this.firstPos.posY
        this.style.left = this.firstPos.posX
        
        this.printDocs();
        //this.drag()

                
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
            delta = quill.getContents();
            console.log(delta)
        });
        //console.log(this.dragItems)
    }

    disconnectedCallback() {
        console.log('Document REMOVED TO THE DOM');
    }

    /* metodos */

    /*====================================================================================================================================*/


    printDocs(){
        this.innerHTML =`<img btnModal class="doc__img" src="./assets/img/btnDocument.svg" alt="">`;
        this.main.insertAdjacentHTML('afterend', 
        `<div class="modal micromodal-slide" id="${this.getAttribute("id")}item" aria-hidden="true">
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
        </div>`);
    
    }

    /*====================================================================================================================================*/

}
window.customElements.define('document-item', Document);

