function display(){
    d = document.querySelector('.dice');
    max = 6;
    min = 1;
    randomDecimal = Math.random();
    randomInteger = Math.floor(randomDecimal * (max - min + 1) + min);
    d.innerHTML=randomInteger;
    
   

}


document.addEventListener("DOMContentLoaded",()=>{

d = document.querySelector('.dice');
b = document.querySelector('.btn');
b.addEventListener("click",()=>{
    
    d.style.animationPlayState = "running"; // Run the animation
    setTimeout(()=>{
        d.style.animationPlayState = "paused";  // after 0.5 sec pause the animation and display the result
        display();
    },500);
});

d.addEventListener("animationend",display);


})