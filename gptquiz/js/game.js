var quest = document.querySelector('#quest');
var la = document.querySelector("#la");
var lb = document.querySelector("#lb");
var lc = document.querySelector("#lc");
var ld = document.querySelector("#ld");
var le = document.querySelector("#le");
var ansOutput = document.querySelector('.answer');
var ans = document.querySelector("#ans");
var ret = document.querySelector("#ret");
var themeChoiced = document.querySelector('#theme-choice');
var pointsGui = document.querySelector("#points");

var gameQuest = localStorage.getItem('question');
var gameLa = localStorage.getItem('a');
var gameLb = localStorage.getItem('b');
var gameLc = localStorage.getItem('c');
var gameLd = localStorage.getItem('d');
var gameLe = localStorage.getItem('e');
var gameAnswer = localStorage.getItem('answer');
var themeStorage = localStorage.getItem('theme');

var points = 0;

function start() {
    gameQuest = localStorage.getItem('question');
    gameLa = localStorage.getItem('a');
    gameLb = localStorage.getItem('b');
    gameLc = localStorage.getItem('c');
    gameLd = localStorage.getItem('d');
    gameLe = localStorage.getItem('e');
    gameAnswer = localStorage.getItem('answer');
    themeStorage = localStorage.getItem('theme');
    console.log({
        gameQuest, gameLa, gameLb, gameLc, gameLd, gameLe, gameAnswer, themeStorage
    });
    themeChoiced.innerHTML = themeStorage;
    quest.innerHTML = gameQuest;
    la.innerHTML = "A) " + gameLa;
    lb.innerHTML = "B) " + gameLb;
    lc.innerHTML = "C) " + gameLc;
    ld.innerHTML = "D) " + gameLd;
    le.innerHTML = "E) " + gameLe;
    ans.innerHTML = gameAnswer;
}

function getQuestion(theme) {
    payload = {
        "token": "xxxx",
        "msg": theme
    }

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/quiz",
        data: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function(data) {
            localStorage.setItem('question', data.pergunta);
            localStorage.setItem('a', data.a);
            localStorage.setItem('b', data.b);
            localStorage.setItem('c', data.c);
            localStorage.setItem('d', data.d);
            localStorage.setItem('e', data.e);
            localStorage.setItem('answer', data.resposta);

            document.querySelector('.a').style.background = '#636485';
            document.querySelector('.b').style.background = '#636485';
            document.querySelector('.c').style.background = '#636485';
            document.querySelector('.d').style.background = '#636485';
            document.querySelector('.e').style.background = '#636485';
            
            start();
        },
        error: function(data) {
            console.error("Erro na requisição:", data);
            if (data.status >= 400) getQuestion(themeStorage);
        }
    });
}

function calculate(letter) {
    if (gameAnswer.toLowerCase() == letter) {
        points += 5;
        pointsGui.innerHTML = points + "pts";
        document.querySelector('.'+letter).style.background = 'lime';
        getQuestion(themeStorage);
    } else {
        la.style.display = 'none';
        lb.style.display = 'none';
        lc.style.display = 'none';
        le.style.display = 'none';
        ld.style.display = 'none';
        ans.style.display = 'flex';
        ret.style.display = 'flex';
        ansOutput.style.display = 'flex';
    }
}

ret.addEventListener('click', function() {
    window.location.pathname = "./";
});

la.addEventListener('click', function(){calculate('a')});
lb.addEventListener('click', function(){calculate('b')});
lc.addEventListener('click', function(){calculate('c')});
ld.addEventListener('click', function(){calculate('d')});
le.addEventListener('click', function(){calculate('e')});

start();
