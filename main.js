

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


imgSearch.addEventListener("keyup",(e)=>{
    console.log(imgSearch.value)
    getUser();
   /*  fetch(`https://api.unsplash.com/search/photos/?query=${imgSearch.value}&client_id=btXOFRZKl5DqSAUkiX3C7gDBD7odWcz5_t4dU2ChBMI`)
    .then((res) => res.json())
    .then((data) => {
        console.table(data);
        
       
        unplashImgs.innerHTML = ""
        for (let index = 0; index < data.results.length; index++) {
            unplashImgs.insertAdjacentHTML('beforeend',`<img class="unplash__img" src="${data.results[index].urls.regular}" alt="">`);
            
        }


    })
    .catch((err)=>{
        console.log(err)
    }); */

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
        const response = await fetch(`https://api.unsplash.com/search/photos/?query=${(imgSearch.value).toString()}&client_id=btXOFRZKl5DqSAUkiX3C7gDBD7odWcz5_t4dU2ChBMI`, options)
        const result = await response.text();
        const data = await JSON.parse(result);
        console.log(response)


        unplashImgs.innerHTML = ""
        for (let index = 0; index < data.results.length; index++) {
            unplashImgs.insertAdjacentHTML('beforeend',`<img class="unplash__img" src="${data.results[index].urls.regular}" alt="">`);
            
        }
    } catch (err) {
        console.log(err)
    }
}










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


/* var url = `http://palett.es/API/v1/palette/monochrome/over/0.${Math.floor(Math.random() * 8)+1}`;
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

http.open("GET", url, true);
http.send(); */


/* fetch(`https://cors-anywhere.herokuapp.com/http://palett.es/API/v1/palette/monochrome/over/0.${Math.floor(Math.random() * 8)+1}`,{ mode: 'no-cors'})
    .then((blob) => blob.json())
    .then((data) => {
        console.table(data);
    })
    .catch((err)=>{
        console.log(err)
    });
 */
/* 
const getUser = async ()=> {
    try {
        const response = await fetch('http://palett.es/API/v1/palette/monochrome/over/0.1', { mode: 'no-cors'});
        const result = await response.json();
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

getUser(); */