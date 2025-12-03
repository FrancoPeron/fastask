export function dragEvent(tool, HtmlItem, insertItem) {
  /* ========== Variables ========== */

  let containerMain = document.querySelector('[board]');
  let btnTrash = document.querySelector('[btnTrash]');
  let newItem = false;

  let positions = {
    clientX: undefined,
    clientY: undefined,
    movementX: 0,
    movementY: 0,
  };

  let startposX;
  let startposY;
  let maxmove = 3;

  /* ========== Functions ========== */

  let drag = (event, item, newItem) => {
    //console.log(event, item)

    startposX = event.clientX;
    startposY = event.clientY;

    event.preventDefault();
    positions.clientY = event.clientY;
    positions.clientX = event.clientX;

    document.onmousemove = event => {
      if (
        Math.abs(event.clientX - startposX) > maxmove ||
        Math.abs(event.clientY - startposY) > maxmove
      ) {
        event.preventDefault();
        positions.movementY = positions.clientY - event.clientY;
        positions.movementX = positions.clientX - event.clientX;
        positions.clientX = event.clientX;
        positions.clientY = event.clientY;
        // set the element's new position:
        item.style.top = item.offsetTop - positions.movementY + 'px';
        item.style.left = item.offsetLeft - positions.movementX + 'px';

        let pos = {
          posY: item.style.top,
          posX: item.style.left,
        };

        localStorage.setItem(`${item.getAttribute('id')}Pos`, JSON.stringify(pos));

        trashOpacity(event, item);
      }
    };
    document.onmouseup = event => {
      document.onmouseup = null;
      document.onmousemove = null;

      trash(event, item);
      itemOnBoard(event, item, newItem);
    };
  };

  let listenItems = () => {
    for (let index = 0; index < document.querySelectorAll(`[${tool}Item]`).length; index++) {
      let item = document.querySelectorAll(`[${tool}Item]`)[index];

      item.classList.add('itemMoveBlock');

      const mousedown = event => {
        newItem = false;
        drag(event, item);
      };
      const mouseup = event => {
        if (
          Math.abs(event.clientX - startposX) < maxmove &&
          Math.abs(event.clientY - startposY) < maxmove
        ) {
          item.classList.remove('itemMoveBlock');
          item.classList.add('itemMoveEditable');
          item.onmousedown = null;

          containerMain.addEventListener('mousedown', e => {
            if (e.target == e.currentTarget) {
              item.classList.remove('itemMoveEditable');
              item.classList.add('itemMoveBlock');
              item.onmousedown = mousedown;
            }
          });
        }
      };

      item.onmousedown = mousedown;
      item.onmouseup = mouseup;
    }
  };

  let borrarItem = item => {
    let ItemArray = document.querySelectorAll(`[${tool}Item]`);
    let thisId = Number(item.getAttribute('id').replace(/^\D+/g, ''));
    item.remove();
    // elemento borrado: reorganizar indices en localStorage

    localStorage.setItem(`cant-${tool}s`, localStorage.getItem(`cant-${tool}s`) - 1);
    for (let index = thisId; index < localStorage.getItem(`cant-${tool}s`); index++) {
      localStorage.setItem(`${tool}${index}`, localStorage.getItem(`${tool}${index + 1}`));
      localStorage.setItem(`${tool}${index}Pos`, localStorage.getItem(`${tool}${index + 1}Pos`));
      ItemArray[index + 1].id = `${tool}${index}`;
    }
    localStorage.removeItem(`${tool}${localStorage.getItem(`cant-${tool}s`)}`);
    localStorage.removeItem(`${tool}${localStorage.getItem(`cant-${tool}s`)}Pos`);
    localStorage.removeItem(`${tool}${localStorage.getItem(`cant-${tool}s`)}title`);
  };

  let itemOnBoard = (event, item, newItem) => {
    let board =
      containerMain.getBoundingClientRect().top - 60 < item.offsetTop - positions.movementY &&
      event.clientY < containerMain.getBoundingClientRect().bottom &&
      containerMain.getBoundingClientRect().left + 100 < item.offsetLeft - positions.movementX &&
      event.clientX < containerMain.getBoundingClientRect().right;
    if (!board && newItem) borrarItem(item);
  };

  let trash = (event, item) => {
    let delate =
      btnTrash.getBoundingClientRect().top < event.clientY &&
      event.clientY < btnTrash.getBoundingClientRect().bottom &&
      btnTrash.getBoundingClientRect().left < event.clientX &&
      event.clientX < btnTrash.getBoundingClientRect().right;
    if (delate) borrarItem(item);
  };

  let trashOpacity = (event, item) => {
    let delate =
      btnTrash.getBoundingClientRect().top < event.clientY &&
      event.clientY < btnTrash.getBoundingClientRect().bottom &&
      btnTrash.getBoundingClientRect().left < event.clientX &&
      event.clientX < btnTrash.getBoundingClientRect().right;
    delate ? item.classList.add('trashOpacity') : item.classList.remove('trashOpacity');
  };

  /* ========== Agrega una nueva Tool ========== */
  //console.log(insertItem)
  insertItem(drag, listenItems);

  /* ========== Imprimo los datos del localStorage ========== */

  for (let index = 0; index < localStorage.getItem(`cant-${tool}s`) || 0; index++) {
    containerMain.insertAdjacentHTML('beforeend', HtmlItem(index));
  }

  listenItems();

  return { drag, listenItems };
}
