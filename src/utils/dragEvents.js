/* eslint-disable no-undef */
export function dragEvent(tool, HtmlItem, insertItem) {
  /* ========== Variables ========== */

  let containerMain = document.querySelector('[board]');
  let btnTrash = document.querySelector('[btnTrash]');

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
    // Detectar si estamos en la esquina de resize (30px desde la esquina inferior-derecha)
    const rect = item.getBoundingClientRect();
    const distFromRight = rect.right - event.clientX;
    const distFromBottom = rect.bottom - event.clientY;
    
    // Si estamos en la zona de resize, no iniciar drag
    if (distFromRight < 30 && distFromBottom < 30) {
      return;
    }

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

      // Load lock state from localStorage
      const isLocked = localStorage.getItem(`${item.getAttribute('id')}Locked`) === 'true';
      if (isLocked) {
        item.classList.add('itemLocked');
        item.classList.remove('itemUnlocked');
      } else {
        item.classList.remove('itemLocked');
        item.classList.add('itemUnlocked');
      }

      let isDragging = false;

      const mousedown = event => {
        // Si está bloqueado, no permitir drag
        if (item.classList.contains('itemLocked')) return;

        // Si el target es un campo editable, no permitir drag
        const editableElements = item.querySelectorAll('[contenteditable="true"], input, textarea, button, .ql-editor, .ql-toolbar');
        let isEditableField = false;
        for (let elem of editableElements) {
          if (elem.contains(event.target) || elem === event.target) {
            isEditableField = true;
            break;
          }
        }

        if (isEditableField) return;

        // Seleccionar item si no estaba seleccionado
        if (!item.classList.contains('itemSelected')) {
          deselectAllItems();
          item.classList.add('itemSelected');
        }

        isDragging = true;
        drag(event, item);
      };

      const mouseup = event => {
        isDragging = false;
      };

      // Click para seleccionar
      item.addEventListener('click', e => {
        // Si es un click en campo editable, no seleccionar
        const editableElements = item.querySelectorAll('[contenteditable="true"], input, textarea, button, .ql-editor, .ql-toolbar');
        let isEditableField = false;
        for (let elem of editableElements) {
          if (elem.contains(e.target) || elem === e.target) {
            isEditableField = true;
            break;
          }
        }

        if (!isEditableField && !isDragging) {
          deselectAllItems();
          item.classList.add('itemSelected');
        }
      });

      // Menú contextual (right-click)
      item.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();

        // Remover menú anterior si existe
        const oldMenu = document.querySelector('.context-menu');
        if (oldMenu) oldMenu.remove();

        const isCurrentlyLocked = item.classList.contains('itemLocked');

        // Crear menú contextual
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.position = 'fixed';
        menu.style.top = e.clientY + 'px';
        menu.style.left = e.clientX + 'px';

        const lockOption = document.createElement('button');
        lockOption.className = 'context-menu-item';
        lockOption.textContent = isCurrentlyLocked ? 'Desbloquear' : 'Bloquear';
        lockOption.onclick = () => {
          if (isCurrentlyLocked) {
            item.classList.remove('itemLocked');
            item.classList.add('itemUnlocked');
            localStorage.setItem(`${item.getAttribute('id')}Locked`, 'false');
          } else {
            item.classList.remove('itemUnlocked');
            item.classList.add('itemLocked');
            localStorage.setItem(`${item.getAttribute('id')}Locked`, 'true');
          }
          menu.remove();
        };

        const deleteOption = document.createElement('button');
        deleteOption.className = 'context-menu-item';
        deleteOption.textContent = 'Eliminar';
        deleteOption.style.color = '#ff6b6b';
        deleteOption.onclick = () => {
          borrarItem(item);
          menu.remove();
        };

        menu.appendChild(lockOption);
        menu.appendChild(deleteOption);
        document.body.appendChild(menu);

        // Cerrar menú al hacer click fuera
        setTimeout(() => {
          const closeMenu = e => {
            if (!menu.contains(e.target)) {
              menu.remove();
              document.removeEventListener('click', closeMenu);
            }
          };
          document.addEventListener('click', closeMenu);
        }, 0);
      });

      // Remover antiguo botón de candado si existe
      const oldBtn = item.querySelector('.item-lock-btn');
      if (oldBtn) oldBtn.remove();

      item.onmousedown = mousedown;
      item.onmouseup = mouseup;

      // Deseleccionar al hacer click fuera del item
      document.addEventListener('click', e => {
        if (!item.contains(e.target)) {
          item.classList.remove('itemSelected');
        }
      });
    }
  };

  let deselectAllItems = () => {
    document.querySelectorAll('[itemSelected]').forEach(el => {
      el.classList.remove('itemSelected');
    });
    document.querySelectorAll(`[${tool}Item].itemSelected`).forEach(el => {
      el.classList.remove('itemSelected');
    });
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
