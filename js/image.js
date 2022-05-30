
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


let inputSearch = document.querySelector("[inputSearch]")
inputSearch.addEventListener("keyup",(e)=>{
    getUser();
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
        const response = await fetch(`https://api.unsplash.com/search/photos/?query=${(inputSearch.value).toString()}&client_id=btXOFRZKl5DqSAUkiX3C7gDBD7odWcz5_t4dU2ChBMI`, options)
        const result = await response.text();
        const data = await JSON.parse(result);
        console.log(response)


        unplashImgs.innerHTML = ""
        for (let index = 0; index < data.results.length; index++) {
            unplashImgs.insertAdjacentHTML('beforeend',`<img class="unplash__img" src="${data.results[index].urls.regular}" alt="">`);
            console.log(33)
        }
      
    } catch (err) {
        console.log(err)
    }
}

