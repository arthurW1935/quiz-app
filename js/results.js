document.querySelector(".score").innerHTML = localStorage.getItem("score");

document.querySelector(".restart-btn").addEventListener('click', ()=>{
    window.location.href = "game.html";
});

document.querySelector(".home-btn").addEventListener('click', ()=>{
    window.location.href = "index.html";
});