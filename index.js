var vezDoJogador, movimentos, FimDeJogo, span, BotaoRecomeco;
var placarX = 0;
var placarO = 0;

vezDoJogador = "";
movimentos = 0;
FimDeJogo = false;
span = document.getElementsByTagName("span");
BotaoRecomeco = '<button onclick="jogarOutraVez()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';

function iniciarJogoEFecharCard(simboloInicial) {
    iniciarJogo(simboloInicial); 
    var card = document.getElementById('selecionarSimboloCard');
    card.style.display = 'none';
}

function iniciarJogo(simbolo) {
    vezDoJogador = simbolo;
}

function play(y) {
    if (vezDoJogador === "") {
        return;
    }

    if (y.dataset.jogador == "none" && window.FimDeJogo == false) {
        y.innerHTML = vezDoJogador;
        y.dataset.jogador = vezDoJogador;
        movimentos++;

        vezDoJogador = vezDoJogador === 'X' ? 'O' : 'X';
    }

    verificarVencedor(1, 2, 3);
    verificarVencedor(4, 5, 6);
    verificarVencedor(7, 8, 9);
    verificarVencedor(1, 4, 7);
    verificarVencedor(2, 5, 8);
    verificarVencedor(3, 6, 9);
    verificarVencedor(1, 5, 9);
    verificarVencedor(3, 5, 7);

    if (movimentos == 9 && FimDeJogo == false) { desenhar(); }
}

function verificarVencedor(a, b, c) {
    a--;
    b--;
    c--;
    if ((span[a].dataset.jogador === span[b].dataset.jogador) && (span[b].dataset.jogador === span[c].dataset.jogador) && (span[a].dataset.jogador === span[c].dataset.jogador) && (span[a].dataset.jogador === "X" || span[a].dataset.jogador === "O") && FimDeJogo == false) {
        span[a].parentNode.className += " casaAtiva";
        span[b].parentNode.className += " casaAtiva";
        span[c].parentNode.className += " casaAtiva";
        fimDeJogo(a);
    }
}

function jogarOutraVez() {
    document.getElementsByClassName("alert")[0].parentNode.removeChild(document.getElementsByClassName("alert")[0]);
    resetarJogo();
    window.FimDeJogo = false;
    for (var k = 0; k < span.length; k++) {
        span[k].parentNode.className = span[k].parentNode.className.replace("casaAtiva", "");
    }
    var card = document.getElementById('selecionarSimboloCard');
    card.style.display = 'block';
}

function resetarJogo() {
    for (i = 0; i < span.length; i++) {
        span[i].dataset.jogador = "none";
        span[i].innerHTML = "&nbsp;";
    }
    vezDoJogador = "";
}

function fimDeJogo(a) {
    var vencedor = span[a].dataset.jogador;
    if (vencedor === 'X') {
        placarX++;
    } else if (vencedor === 'O') {
        placarO++;
    }
    var placarElement = document.getElementById('placar');
    placarElement.innerHTML = "X: " + placarX + " | O:  " + placarO;
    var fimDeJogoAlertElement = "<b>O Jogo Acabou</b><br><br> Jogador " + vencedor + ' Venceu!!! <br><br>' + BotaoRecomeco;
    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = fimDeJogoAlertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    window.FimDeJogo = true;
    movimentos = 0;
}

function desenhar() {
    var desenharAlertElement = '<b>DEU VELHA!!!</b><br><br>' + BotaoRecomeco;
    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = desenharAlertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    window.FimDeJogo = true;
    movimentos = 0;
}
