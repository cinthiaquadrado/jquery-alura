function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody"); //buscando tbody dentro de placar
    var usuario = "Cinthia";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);
};

function novaLinha(usuario, palavras) {
    var linha = $("<tr>"); //cria um elemento html de verdade
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}

$(".botao-remover").click(removeLinha); //necessário para remover a linha padrão