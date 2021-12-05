console.log("hello world");
const read_more = document.getElementsByClassName("read_more");
const read_less = document.getElementsByClassName("read_less");
const long = document.getElementsByClassName("long");
const hashtags = document.getElementsByClassName("hashtag");
console.log(long);

Array.from(read_more).forEach((element , index) => {
    element.addEventListener("click" , (e)=>{
        e.preventDefault();

        // read more
        let currReadMore = document.getElementById(`read_more_${index}`)
        let currReadLess = document.getElementById(`read_less_${index}`)
        let hashtag = document.getElementById(`hashtag_${index}`)
        let long = document.getElementById(`long_${index}`)
        
        currReadLess.classList.toggle("hide");
        currReadMore.classList.toggle("hide");
        hashtag.classList.toggle("hide");
        long.classList.toggle("hide");
    })
});


Array.from(read_less).forEach((element , index) => {
    element.addEventListener("click" , (e)=>{
        e.preventDefault();
    
        let currReadMore = document.getElementById(`read_more_${index}`)
        let currReadLess = document.getElementById(`read_less_${index}`)
        let hashtag = document.getElementById(`hashtag_${index}`)
        let long = document.getElementById(`long_${index}`)
        
        currReadLess.classList.toggle("hide");
        currReadMore.classList.toggle("hide");
        hashtag.classList.toggle("hide");
        long.classList.toggle("hide");
    });
});
Array.from.addEventListener("click" , (e)=>{
    
});