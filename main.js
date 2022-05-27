

let containerMain = document.querySelector("[board]");


/* todo */
let todoHtmlItem = (val)=>{ return `<todo-item todoItem id="todo${val}" class="todoItem p-24 br-8 shadow-sm bg-c4"></todo-item>`}
let todoId = localStorage.getItem('cantTodos') || 0;
let btnTodo = (document.querySelector("[btnTodo]"))
let todosItemArray = document.querySelectorAll("[todoItem]")

for (let index = 0; index < todoId ; index++) {
    containerMain.insertAdjacentHTML('beforeend',todoHtmlItem(index));
}
btnTodo.addEventListener('mousedown', e =>{
    todosItemArray = document.querySelectorAll("[todoItem]")
    containerMain.insertAdjacentHTML('beforeend',todoHtmlItem(todosItemArray.length));
    localStorage.setItem('cantTodos', todosItemArray.length+1);    
});


/* document */

let docId = JSON.parse(localStorage.getItem('cantTodos')) || 0;
let btnDoc = (document.querySelector("[btnDoc]"))
btnDoc.addEventListener('mousedown', e =>{
    containerMain.insertAdjacentHTML('beforeend',`<document-item docItem id="doc${docId++}" class="documentItem"></document-item>`);
    // localStorage.setItem('cantTodos', JSON.stringify(todoId));
    
});






/* fetch('http://colormind.io/api/', {
  method: 'POST',
  body: JSON.stringify({
    model: 'default',
    input : [[44,43,44],[90,83,82],"N","N","N"],        
  })
})
.then(res => res.json())
.then(console.log) */

/* var url = "http://colormind.io/api/";
var data = {
	model : "ui",
	input : ["N","N","N","N"]
}

var http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var palette = JSON.parse(http.responseText).result;
        console.log(palette)
        let paletteColor = document.querySelectorAll(".palette__color")
        
        for (let index = 0; index < paletteColor.length; index++) {

            let color = palette[index]
            console.log(color)
            paletteColor[index].style.backgroundColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
            
        }
        
	}
}

http.open("POST", url, true);
http.send(JSON.stringify(data));
 */


var url = `http://palett.es/API/v1/palette/monochrome/over/0.${Math.floor(Math.random() * 8)+1}`;
// var url = `http://palett.es/API/v1/palette/from/1b1a21`;
var http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) {
		
        console.log(JSON.parse(this.response))
        let paletteColor = document.querySelectorAll(".palette__color")
        let colors = JSON.parse(this.response)
        
        for (let index = 0; index < paletteColor.length; index++) {

            paletteColor[index].style.backgroundColor = colors[index];
            
            // document.querySelector(':root').style.setProperty(`--cBrand${index}`, colors[index]);
        }
        
        document.querySelector(':root').style.setProperty(`--cBrand1`, colors[0]);
        document.querySelector(':root').style.setProperty(`--cBrand2`, colors[1]);
        document.querySelector(':root').style.setProperty(`--cBrand3`, colors[3]);
	}
}

http.open("GET", url);
http.send();


