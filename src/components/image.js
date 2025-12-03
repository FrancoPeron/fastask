import { dragEvent } from '../utils/dragEvents.js';
let tool = 'img';
let HtmlItem = val => {
  return `<image-item imgItem id="img${val}" class="flex imgItem shadow z-20"></image-item>`;
};

/* ========== ToogleImg ========== */

let btnImg = document.querySelector('[btn-img]');
let boxImg = document.querySelector('[boxImg]');
boxImg.style.display = 'none';
btnImg.addEventListener('click', e => {
  if (boxImg.style.display === 'none') {
    boxImg.style.display = 'flex';
  } else {
    boxImg.style.display = 'none';
  }
});

function insertItem(drag, listenItems) {
  let containerMain = document.querySelector('[board]');
  let inputSearch = document.querySelector('[inputSearch]');
  let client_id = 'client_id=btXOFRZKl5DqSAUkiX3C7gDBD7odWcz5_t4dU2ChBMI';
  let imgsArray;

  /* ========== GetImgs ========== */
  const getImgs = async path => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    try {
      const response = await fetch(`https://api.unsplash.com/${path}&${client_id}`, options);
      const result = await response.json();
      path == randomPath ? (imgsArray = result) : (imgsArray = result.results);

      unplashImgs.innerHTML = '';
      for (let index = 0; index < imgsArray.length; index++) {
        unplashImgs.insertAdjacentHTML(
          'beforeend',
          `<img class="unplash__img" src="${imgsArray[index].urls.regular}" alt="">`
        );
      }

      /* ==========  ========== */
      for (let index = 0; index < document.querySelectorAll('.unplash__img').length; index++) {
        document.querySelectorAll('.unplash__img')[index].addEventListener('click', e => {
          boxImg.style.display = 'none';
          localStorage.setItem(
            `img${document.querySelectorAll(`[${tool}Item]`).length}`,
            e.target.currentSrc
          );

          containerMain.insertAdjacentHTML(
            'beforeend',
            HtmlItem(document.querySelectorAll(`[${tool}Item]`).length)
          );
          localStorage.setItem(`cant-${tool}s`, document.querySelectorAll(`[${tool}Item]`).length);

          const _last = Array.from(document.querySelectorAll(`[${tool}Item]`)).pop();
          //drag(e, _last, false)
          listenItems();
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  let randomPath = `photos/?per_page=30`;
  getImgs(randomPath);
  inputSearch.addEventListener('keyup', e => {
    if (inputSearch.value.toString() != '') {
      let searchPath = `search/photos/?per_page=30&query=${inputSearch.value}`;
      getImgs(searchPath);
    } else {
      getImgs(randomPath);
    }
  });
}
dragEvent(tool, HtmlItem, insertItem);

class Image extends HTMLElement {
  constructor() {
    super();

    this.srcImg = localStorage.getItem(`${this.getAttribute('id')}`);
  }

  connectedCallback() {
    // elemento añadido al DOM
    /* ============================================================*/

    this.firstPos = JSON.parse(localStorage.getItem(`${this.getAttribute('id')}Pos`)) || {
      posY: '200px',
      posX: '160px',
    };
    this.style.top = this.firstPos.posY;
    this.style.left = this.firstPos.posX;

    this.size = JSON.parse(localStorage.getItem(`${this.getAttribute('id')}Size`)) || {
      width: 'auto',
      height: 'auto',
    };

    this.style.width = this.size.width + 'px';
    this.style.height = this.size.height + 'px';

    this.printImg();
    this.obsSize();
  }
  /* metodos */

  /*====================================================================================================================================*/

  printImg() {
    this.innerHTML = `<img class="w-100 h-100 object-cover" draggable="false" src="${this.srcImg}" alt="">`;
  }

  /*====================================================================================================================================*/
  obsSize() {
    new ResizeObserver(() => {
      this.size.width = this.offsetWidth;
      this.size.height = this.offsetHeight;

      localStorage.setItem(`${this.getAttribute('id')}Size`, JSON.stringify(this.size));
    }).observe(this);
  }
  /*====================================================================================================================================*/
}
window.customElements.define('image-item', Image);
