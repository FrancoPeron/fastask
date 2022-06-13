
// import { getLinkPreview } from "./node_modules/link-preview-js/build/index.js";
// // import * as getLinkPreview from 'link-preview-j';
// // pass the link directly
// getLinkPreview("https://www.youtube.com/watch?v=MejbOFk7H6c").then((data) =>
//   console.debug(data)
// );

let containerMain = document.querySelector("[board]");





/* imgae */


window.onresize = resize;

function resize()
{
    console.log(window.outerHeight)
}

const resize_ob = new ResizeObserver(function(entries) {
	// since we are observing only a single element, so we access the first element in entries array
	let rect = entries[0].contentRect;

	// current width & height
	let width = rect.width;
	let height = rect.height;

	console.log('Current Width : ' + width);
	console.log('Current Height : ' + height);
});

// start observing for resize
resize_ob.observe(document.documentElement);


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


/* fetch(`http://palett.es/API/v1/palette/monochrome/over/0.${Math.floor(Math.random() * 8)+1}`)
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