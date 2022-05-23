const MicroModal = window.MicroModal;
MicroModal.init();

document.querySelector("[btnModal]").addEventListener('click', () =>{
  MicroModal.show("modal-1");
  var delta = quill.getContents();
  console.log(delta)
});