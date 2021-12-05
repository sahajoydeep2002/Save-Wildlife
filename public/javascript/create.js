const about = document.getElementById("about");
const endangered = document.getElementById("endangered");
const number = document.getElementById("number");

const aboutClick = document.getElementById("about-click");
const endClick = document.getElementById("end-click");

aboutClick.addEventListener("click" , (e)=>{
    e.preventDefault();

    about.classList.toggle("hide");
});
endClick.addEventListener("click" , (e)=>{
    e.preventDefault();

    endangered.classList.toggle("hide");
});

let numL = 0;

const addLink = document.getElementById("add-link");
let linksWrapper = document.getElementById("link-wrapper");
addLink.addEventListener("click" , (e)=>{
    linksWrapper.innerHTML += `<input type="text" name="link_${numL}" id="link-${numL}" class="link form-control" placeholder="add link"></input>`;
    numL++;
});

const mapClick = document.getElementById("map-click");
let mapWrapper = document.getElementById("map-wrapper");

let numM = 0;
mapClick.addEventListener("click" , ()=>{
    mapWrapper.innerHTML += `<input type="text" name="map_${numM}" id="map-${numM}" class="form-control" placeholder="embed maps"></input>`;
    numM++
})