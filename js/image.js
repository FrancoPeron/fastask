
let btnImg = (document.querySelector("[btnImg]"))
let boxImg = (document.querySelector("[boxImg]"))
boxImg.style.display = "none";
btnImg.addEventListener('click', e =>{
    if (boxImg.style.display === "none") {
        boxImg.style.display = "flex";
    } else {
        boxImg.style.display = "none";
    }
});

let containerMain = document.querySelector("[board]");

let inputSearch = document.querySelector("[inputSearch]")
inputSearch.addEventListener("keyup",(e)=>{
    getUser();
})

const getUser = async ()=> {

    const options = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        }
    };
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos/?query=${(inputSearch.value).toString()}&client_id=btXOFRZKl5DqSAUkiX3C7gDBD7odWcz5_t4dU2ChBMI`, options)
        const result = await response.text();
        const data = await JSON.parse(result);
        console.log(response)


        unplashImgs.innerHTML = ""
        for (let index = 0; index < data.results.length; index++) {
            unplashImgs.insertAdjacentHTML('beforeend',`<img class="unplash__img" src="${data.results[index].urls.regular}" alt="">`);
            console.log(33)
        }

        let itemImg = (document.querySelectorAll(".unplash__img"))
        console.log(itemImg)
        for (let index = 0; index < itemImg.length; index++) {
            itemImg[index].addEventListener('click', e =>{
                // console.log(e.target.currentSrc)
                containerMain.insertAdjacentHTML('beforeend',`<image-item srcimg="${e.target.currentSrc}" class="imgItem z-20"></image-item>`);
                
                boxImg.style.display = "none";
            });
        }

      
    } catch (err) {
        console.log(err)
    }
}


class Image extends HTMLElement {
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

        this.draggeable = true
        
        this.main = document.getElementsByTagName("main")[0]
        
    }

    connectedCallback() {
        console.log(`${this.getAttribute("id")} ADDED TO THE DOM`);
        console.log(this);
        this.setAttribute('draggable', false);
        this.style.top = this.firstPos.posY
        this.style.left = this.firstPos.posX

        const drag = (event) => {

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
    
            
        }

        this.addEventListener('mousedown', drag)
        this.addEventListener('dblclick', e =>{
            if(this.draggeable == true) {
                console.log(this.draggable)
                this.removeEventListener('mousedown', drag)
                this.draggeable = false
            } else {
                this.addEventListener('mousedown', drag)
                console.log(this.draggable)
                this.draggeable = true
                
            }
        });

     
        

    }

    static get observedAttributes() {
        return ["srcimg"];
      }
      attributeChangedCallback(name, oldValue, newValue) {
        this.printImg(newValue)
      }

    disconnectedCallback() {
        console.log('Todo REMOVED TO THE DOM');
    }

    /* metodos */

    /*====================================================================================================================================*/


    printImg(newValue){
        this.innerHTML =`<img class="w-100 h-100 object-cover" draggable="false" src="${newValue}" alt="">`;
    
    }

    /*====================================================================================================================================*/

    

 
    /*====================================================================================================================================*/

}
window.customElements.define('image-item', Image);
