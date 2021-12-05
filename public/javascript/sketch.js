let dp;
let new_img;
let dp_input;
let dp_wrap;
let cover;
let cover_wrap;
let cover_input
function setup(){
    canvas = createCanvas(420 , 700);
    canvas.hide();

    dp = select("#dp");
    dp.dragOver(() => {
        console.log("1  hello")
        dp.style('border', '2px solid black');
    });
    dp.dragLeave(() => {
        dp.style('border', '#fff');
    });

    dp.drop((file) => {
        console.log("hello world")
        console.log(file);
        dp_wrap = select("#dp_wrap");
        dp.attribute('src' , file.data);
        dp_input = createInput(file.data , 'file');
        dp_wrap.child(dp_input);
        dp_input.attribute('name' , 'dp');
        dp_input.attribute('accept' , 'image/*');
        dp_input.hide();
    }, () => {
        dp.style('display', 'block');
    });


    cover = select("#cover");
    cover.dragOver(() => {
        cover.style('border', '2px solid black');
    });
    cover.dragLeave(() => {
        cover.style('border', '#fff');
    });
    cover.drop((file) => {
        cover_wrap = select("#dp_wrap");
        let cover_img = createImg(file.data);
        cover.child(cover_img);
        cover_input = createInput(file.data , 'file');
        cover_wrap.child(cover_input);
        cover_input.attribute('name' , 'dp');
        cover_input.attribute('accept' , 'image/*');
        cover_input.hide();
    }, () => {
        cover.style('display', 'block');
    });


}