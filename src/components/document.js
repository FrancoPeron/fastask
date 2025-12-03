import { dragEvent } from '../utils/dragEvents.js';
let tool = 'doc';
let HtmlItem = val => {
  return `<document-item docItem id="doc${val}" class="documentItem flex-column-nowrap align-items-center z-20"></document-item>`;
};

function insertItem(drag, listenItems) {
  let containerMain = document.querySelector('[board]');
  document.querySelector(`[btn-${tool}]`).addEventListener('mousedown', event => {
    event.preventDefault();
    containerMain.insertAdjacentHTML(
      'beforeend',
      HtmlItem(document.querySelectorAll(`[${tool}Item]`).length)
    );
    localStorage.setItem(`cant-${tool}s`, document.querySelectorAll(`[${tool}Item]`).length);

    const last = Array.from(document.querySelectorAll(`[${tool}Item]`)).pop();
    drag(event, last, true);
    listenItems();
  });
}

dragEvent(tool, HtmlItem, insertItem);

class Document extends HTMLElement {
  constructor() {
    super();
    this.main = document.getElementsByTagName('main')[0];
    this.docId = this.getAttribute('id');
    this.quill = null;
    this.isInitialized = false;
  }

  connectedCallback() {
    // elemento añadido al DOM
    /* ============================================================*/

    this.firstPos = JSON.parse(localStorage.getItem(`${this.docId}Pos`)) || {
      posY: '160px',
      posX: '0px',
    };
    this.style.top = this.firstPos.posY;
    this.style.left = this.firstPos.posX;

    this.printDocs();
  }

  disconnectedCallback() {
    // documento removido del DOM
  }

  /* metodos */

  /*====================================================================================================================================*/

  printDocs() {
    const docTitle = JSON.parse(localStorage.getItem(`${this.docId}title`)) || 'New Document';

    this.innerHTML = `<svg class="mb-4" height="80" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8C4 5.79086 5.79086 4 8 4H42L56 18V64C56 66.2091 54.2091 68 52 68H8C5.79086 68 4 66.2091 4 64L4 8Z" fill="#39383E"/>
        <path d="M42 4L56 18H42V4Z" fill="#424147"/>
        <path d="M43.4142 2.58579L42.8284 2H42H8C4.68629 2 2 4.68629 2 8V64C2 67.3137 4.68629 70 8 70H52C55.3137 70 58 67.3137 58 64V18V17.1716L57.4142 16.5858L43.4142 2.58579Z" class="doc_outline" />
        <path d="M31 30L43 30" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M31 38L43 38" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M17 46H43" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M24.6467 28.4062V31.2734H24.3655C24.1988 30.612 24.0139 30.138 23.8108 29.8516C23.6076 29.5599 23.329 29.3281 22.9748 29.1562C22.7769 29.0625 22.4306 29.0156 21.9358 29.0156H21.1467V37.1875C21.1467 37.7292 21.1753 38.0677 21.2326 38.2031C21.2951 38.3385 21.4123 38.4583 21.5842 38.5625C21.7613 38.6615 22.0009 38.7109 22.303 38.7109H22.6545V39H17.1076V38.7109H17.4592C17.7665 38.7109 18.0139 38.6562 18.2014 38.5469C18.3368 38.474 18.4436 38.349 18.5217 38.1719C18.579 38.0469 18.6076 37.7188 18.6076 37.1875V29.0156H17.842C17.1285 29.0156 16.6102 29.1667 16.2873 29.4688C15.8342 29.8906 15.5477 30.4922 15.428 31.2734H15.1311V28.4062H24.6467Z" fill="white"/>
        </svg>
        <h2 ${this.docId}title class="title doc__title-board f-st2 fw-6 c-c4" placeholder="Add a title..." contenteditable="true">${docTitle}</h2>`;

    if (!document.querySelector(`#${this.docId}item`)) {
      this.main.insertAdjacentHTML(
        'afterend',
        `<div class="modal micromodal-slide" id="${this.docId}item" aria-hidden="true">
              <div class="modal__overlay" tabindex="-1">
                  <div class="modal__container bg-c4 br-12 mx-24" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                  <header class="modal__header px-24 py-28">
                      <h2 ${this.docId}title class="title f-st1 c-white" placeholder="Add a title..." contenteditable="true">${docTitle}</h2>
                      <button class="modal__close c-white" aria-label="Close modal" data-micromodal-close/>
                  </header>
                  <main class="modal__content c-white" id="modal-1-content">
                      <div id="${this.docId}editor"></div>
                  </main>
                  </div>
              </div>
          </div>`
      );
    }

    if (!this.isInitialized) {
      this.obsChanges();
      this.isInitialized = true;
    }
  }

  /*====================================================================================================================================*/

  obsChanges() {
    const docData = localStorage.getItem(`${this.docId}`) || '';

    this.quill = new Quill(`#${this.docId}editor`, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          ['clean'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
        ],
      },
      theme: 'snow',
    });

    // Load saved content
    if (docData) {
      this.quill.root.innerHTML = docData;
    }

    this.addEventListener('dblclick', () => {
      MicroModal.show(`${this.docId}item`);
    });

    // Save editor content when Quill content changes
    this.quill.on('text-change', () => {
      localStorage.setItem(`${this.docId}`, this.quill.root.innerHTML);
    });

    let titles = document.querySelectorAll(`[${this.docId}title]`);
    for (let index = 0; index < titles.length; index++) {
      titles[index].addEventListener('keyup', e => {
        localStorage.setItem(`${this.docId}title`, JSON.stringify(e.target.innerHTML));
        if (titles[index] === titles[0]) titles[1].innerHTML = e.target.innerHTML;
      });
    }
  }

  /*====================================================================================================================================*/
}
window.customElements.define('document-item', Document);
