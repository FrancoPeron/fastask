
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





