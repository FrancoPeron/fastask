import { dragEvent } from "./dragEvents.js";
let tool = "img";
let HtmlItem = (val)=>{ return `<image-item imgItem id="img${val}" class="flex imgItem shadow z-20"></image-item>`}

/* ========== ToogleImg ========== */

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

function insertItem(drag,listenItems) {

    
    let containerMain = document.querySelector("[board]");
    let inputSearch = document.querySelector("[inputSearch]")
    let randomImgUrl = `https://api.unsplash.com/photos?client_id=btXOFRZKl5DqSAUkiX3C7gDBD7odWcz5_t4dU2ChBMI`
    
    /* ========== GetImgs ========== */
    const getImgs = async (url)=> {
        console.log(url)
        const options = {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            }
        };
        try {
            const response = await fetch(`${url}`, options)
            const result = await response.text();
            const data = await JSON.parse(result);
            console.log(response)
            console.log(data.results)
            
            unplashImgs.innerHTML = ""
            for (let index = 0; index < data.results.length; index++) {
                unplashImgs.insertAdjacentHTML('beforeend',`<img class="unplash__img" src="${data.results[index].urls.regular}" alt="">`);
            }

            
            for (let index = 0; index < document.querySelectorAll(".unplash__img").length; index++) {
                document.querySelectorAll(".unplash__img")[index].addEventListener('click', e =>{
                    boxImg.style.display = "none";
                    console.log(e.target.currentSrc)
                    localStorage.setItem(`img${document.querySelectorAll(`[${tool}Item]`).length}`, e.target.currentSrc);

                    containerMain.insertAdjacentHTML('beforeend',HtmlItem(document.querySelectorAll(`[${tool}Item]`).length));
                    localStorage.setItem(`cant-${tool}s`, document.querySelectorAll(`[${tool}Item]`).length);

                    const last = Array.from(document.querySelectorAll(`[${tool}Item]`)).pop();
                    //drag(e, last, false)
                    listenItems()
                });
            }
                
        } catch (err) {
            console.log(err)
        }
    }

    getImgs(randomImgUrl);
    inputSearch.addEventListener("keyup",(e)=>{
        let searchImgUrl = `https://api.unsplash.com/search/photos/?per_page=30&query=${(inputSearch.value).toString()}&client_id=btXOFRZKl5DqSAUkiX3C7gDBD7odWcz5_t4dU2ChBMI`
        getImgs(searchImgUrl);
    })


}
dragEvent(tool,HtmlItem,insertItem)


class Image extends HTMLElement {
    constructor() {
        super();
        
        this.srcImg = localStorage.getItem(`${this.getAttribute("id")}`);
    }

    connectedCallback() {
        console.log(`${this.getAttribute("id")} ADDED TO THE DOM`);
        /* ============================================================*/

        this.firstPos = JSON.parse(localStorage.getItem(`${this.getAttribute("id")}Pos`)) || {
            posY: "200px",
            posX: "160px"
        }
        this.style.top = this.firstPos.posY
        this.style.left = this.firstPos.posX

        this.printImg()

    }
    /* metodos */

    /*====================================================================================================================================*/


    printImg(){
        this.innerHTML =`<img class="w-100 h-100 object-cover" draggable="false" src="${this.srcImg}" alt="">`;
    
    }

    /*====================================================================================================================================*/

    /*====================================================================================================================================*/

}
window.customElements.define('image-item', Image);
