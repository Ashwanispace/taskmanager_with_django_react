const questions = [

    "Who developed Python Programming Language?",
    "Which type of Programming does Python support?",
    "Is Python case sensitive when dealing with identifiers?",
    "Which of the following is the correct extension of the Python file?",
    "Is Python code compiled or interpreted?"

]

const options = [

    ["Wick van Rossum", "Rasmus Lerdorf", "Guido van Rossum", "Niene Stom"],
    ["object-oriented programming", "structured programming", "functional programming", "All of the mentioned"],
    ["No", "Yes", "machine dependent", "None of the above"],
    [".p", ".py", ".pp", ".pl"],
    ["Both compiled and interpreted", "Neither compiled nor interpreted", "Only compiled", "Only Interpreted"]
]


const correct_options = [
    2, 3, 1, 1, 0  // indices of the correct options
]

let userAnswers = [-1,-1,-1,-1,-1];

let size = 5;
let curr_index = 0;

const totalquestions = 5;  // for pagination
let windowsize=2;    // for pagination
let currentpage=0;    // for pagination

let timerId=null;  // for the timer id returned by setinterval function

function startTest() {

    let x = document.querySelector(".start-test");
    x.style.display = "none";
    let y = document.querySelector(".quiz-container");
    y.style.display = "block";
    pagination();
    //showQuestion(0);  no need because every page will display its first question
    displayTimer();


}

function showQuestion(index) {
    
    curr_index=index;
    let prev = document.querySelector("#prev");
    let next = document.querySelector("#next");
    let submit = document.querySelector("#submit");

    prev.style.visibility = index === 0 ? "hidden" : "visible";
    next.style.display = index === size - 1 ? "none" : "inline-block";
    submit.style.display = index === size - 1 ? "inline-block" : "none";



    let q = document.querySelector(".question");
    q.innerHTML = `${index+1}. ${questions[index]}`;

    let o = document.querySelector(".options-container");
    o.innerHTML = "";



    options[index].forEach((option, i) => {

        // Create div inside label
        const div = document.createElement('div');

        // Create input (radio button)
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'common-name'; // Group name for radio buttons
        input.id = `option${i}`;
        input.value = `${i}`;

        if(userAnswers[index]!=-1 && userAnswers[index]==input.value){  // if this question has already been answered
            input.checked=true;
        }

        input.addEventListener('change',()=>{userAnswers[index]=i}); // if this option is clicked then store the answer

        // Create text node
        const textNode = document.createTextNode(option);
        
       
        const label = document.createElement('label');
        label.setAttribute("for",input.id);
        label.appendChild(textNode);

        // Append input and label to div
        div.appendChild(input);
        div.appendChild(label);

        


        // Append div to options container
        o.appendChild(div);
    });
}

function displayTimer(){
    let totalTime=30; // in seconds
    let timeLeft = totalTime;  
    function updateTimer(){
        
        let minutes = Math.floor(timeLeft/60);
        let seconds = timeLeft%60;
        let timerContainer = document.querySelector('.timer');
        timerContainer.innerHTML=`${minutes<10?"0":""}${minutes}:${seconds<10?"0":""}${seconds}`;
        let c;
        if(timeLeft>=totalTime/2) c="green";
        else if(timeLeft<totalTime/2 && timeLeft>totalTime/4) c="orange";
        else c="red";
        timerContainer.style.color=c;

    }

    timerId=setInterval(()=>{  
        if(timeLeft>0){
            updateTimer();
            timeLeft--;
           
        }else{
            submit(timerId);
        }
    },1000);
}

function goNext() { 
    curr_index += 1;
    if(curr_index%windowsize==0){
        currentpage++;
        pagination();
    } 
    else showQuestion(curr_index);
}

function goPrev() {
    curr_index -= 1;
    if(curr_index%windowsize== windowsize-1){
         currentpage--;
         pagination();
    }
    else showQuestion(curr_index);
}

function submit() {
    clearInterval(timerId);
    displayScore();
}


function displayScore() {
    let score = 0;
    userAnswers.forEach((ans, i) => {
        if (parseInt(ans) === correct_options[i]) score++;
    });

    let y = document.querySelector(".quiz-container");
    y.style.display = "none";
    let f = document.querySelector(".test-finish");
    f.style.display = "block";

    let to_display = "";
    if (score == 0) to_display = "Your score is 0/5. You need to Work Hard";
    else if (score == 1) to_display = "Your score is 1/5. You need to Work Hard";
    else if (score == 2) to_display = "Your score is 2/5. You need to be Consistent";
    else if (score == 3) to_display = "Your score is 3/5. Keep it up";
    else if (score == 4) to_display = "Your score is 4/5. You are right there";
    else to_display = "Your score is 5/5. Excellent job! You nailed it...";

    f.innerHTML = to_display;

}


function pagination(){
    let navbuttons = document.querySelector('.nav-buttons');
    navbuttons.innerHTML="";
    let start = currentpage*2;
    let end =  Math.min(start+windowsize,totalquestions);
    for(let i=start;i<end;i++){
        let btn = document.createElement('button');
        btn.innerHTML=`Q${i+1}`;
        btn.addEventListener('click',()=>{
            showQuestion(i)});
        navbuttons.appendChild(btn);
    } 
    showQuestion(start);  // show the first question in each page

    let prevpagebtn = document.querySelector('.prevpage-btn');
    let nextpagebtn = document.querySelector('.nextpage-btn');
    prevpagebtn.style.visibility= (start==0)?"hidden":"visible";
    nextpagebtn.style.visibility= (end==totalquestions)?"hidden":"visible";

}

function prevPage(){
    currentpage--;
    pagination();

}

function nextPage(){
    currentpage++;
    pagination();
}

function clearResponse(){
    if(userAnswers[curr_index] != -1){  // if any option has been selected
        userAnswers[curr_index]=-1;
       let selected = document.querySelector('input[name="common-name"]:checked');
       selected.checked=false;
    }

}