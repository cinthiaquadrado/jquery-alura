var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao"); //selecionar campo de digitacao

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text(); //pega a frase e depois o texto contido nela
    var numPalavras = frase.split(" ").length; //quebra a frase onde há espaços e calcula a quantidade de palavras
    var tamanhoFrase = $("#tamanho-frase"); //pega valor do span para poder trocar
    tamanhoFrase.text(numPalavras); //imprime o número de palavras na frase
};

function inicializaContadores() {
    campo.on("input", function(){
        var conteudo = campo.val(); //acessa o valor dos inputs do usuário
        var qtdPalavras = conteudo.split(/\S+/).length - 1; //expressão regular busca qualquer caractere, exceto espaço vazio
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
};

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
};

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores (){
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
};

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado"); //se no momento que a função for chamada, o elemento possuir a classe, ela será removida
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
};