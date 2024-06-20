var valueTheme = ''
var menu = document.querySelector('.menu-start');
var titleThemeChoice = document.querySelector('.theme-title-quiz');

function pressStart() {
    let theme = document.querySelector('#theme');
    let valueTheme = theme.value;
    localStorage.setItem('theme', valueTheme);
    getQuestion(valueTheme);
    menu.innerHTML = 'Carregando...';
    titleThemeChoice.style.display = 'none';
    theme.style.display = 'none';
}

function getQuestion(theme) {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/get-questions",
        data: { theme: theme },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function(data) {
            console.log(data); // Verifique os dados retornados
            localStorage.setItem('question', data.pergunta);
            localStorage.setItem('a', data.a);
            localStorage.setItem('b', data.b);
            localStorage.setItem('c', data.c);
            localStorage.setItem('d', data.d);
            localStorage.setItem('e', data.e);
            localStorage.setItem('answer', data.resposta);
            window.location.pathname = "game/quiz.html";
        },
        error: function(data) {
            console.error("Erro na requisição:", data);
            if (data.status >= 400) window.location.reload();
        }
    });
}

document.querySelector('#start').addEventListener('click', pressStart);
