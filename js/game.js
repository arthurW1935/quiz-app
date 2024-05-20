let questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let score = 0;
let progressBarWidth = 0;
let ratio = Math.ceil(100/questions.length);
let remaining_questions = questions.map(elem => questions.indexOf(elem));


function checkAnswer(e){
    progressBarWidth = Math.min(100, progressBarWidth + ratio);
    document.querySelector(".progress").style.width = progressBarWidth + "%";

    let questionNumber = document.querySelector(".question").getAttribute("index");
    
    let selectedButton = e.target;
    let selectedOption = selectedButton.getAttribute("index");
    while (selectedOption === null){
        selectedButton = selectedButton.parentNode;
        selectedOption = selectedButton.getAttribute("index");
    }
    selectedOption++;
    if (questions[questionNumber].answer === selectedOption){
        selectedButton.classList.add("correct");
        score+=10;
    }
    else{
        selectedButton.classList.add("incorrect");
    }

    document.querySelector(".current-score").innerHTML = score;

    setTimeout(()=>{
        if(remaining_questions.length===0){
            localStorage.setItem("score", score);
            window.location.href = "results.html";
        }
        else{
            selectedButton.classList.remove("correct");
            selectedButton.classList.remove("incorrect");
            nextQuestion();
        }    
    }, 1500);
}


function nextQuestion(){
    let ch = Math.floor(Math.random() * remaining_questions.length);
    let choice = remaining_questions[ch];
    document.querySelector(".question").setAttribute("index", choice);

    let question = document.querySelector(".question-title").querySelector("p");
    let options = document.querySelectorAll(".answer");

    question.innerHTML = questions[choice].question;
    for (let i=0; i<4; i++){
        options[i].innerHTML = "<plaintext>"+questions[choice]["choice"+(i+1)];
    }
    remaining_questions.splice(ch, 1);
    document.querySelector(".q-no").innerHTML = questions.length - remaining_questions.length;
}

let optionButton = document.querySelectorAll(".question-options button");
for (let i=0; i<4; i++){
    optionButton[i].addEventListener('click', (e) => checkAnswer(e));
    optionButton[i].setAttribute("index", i);
}

localStorage.setItem("score", 0);

nextQuestion();