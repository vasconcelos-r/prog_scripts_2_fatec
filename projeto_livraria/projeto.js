class Livros {
    constructor(nome, autor, genero, editora) {
        this.nome = nome;
        this.autor = autor;
        this.genero = genero;
        this.editora = editora;
    }
}

var listaLivros = [];
var auxPosicao = '';

function cadastrar(objeto, lista) {
    lista.push(objeto);
}

function alterar(objeto, lista, posicao) {
    lista[posicao] = objeto;
}

function excluir(lista, posicao) {
    lista.splice(posicao, 1);
}

function listar(lista) {
    let auxHtml = '';
    for (let i = 0; i < lista.length; i++) {
        auxHtml += '<tr>' +
            '<td>' + lista[i].nome + '</td>' +
            '<td>' + lista[i].autor + '</td>' +
            '<td>' + lista[i].genero + '</td>' +
            '<td>' + lista[i].editora + '</td>' +
            '<td>' +
            '<button class="btn btn-warning" rel="'+ i +'">A</button>'+
            '</td>'+
            '<td>'+
            '<button class="btn btn-danger" rel="'+ i +'">X</button>'+
            '</td>'+
            '</tr>';
    }
    return auxHtml;
}

$(document).ready(() => {
    $('#btnSalvar').click(() => {
        let nome = $('#nome').val();
        let autor = $('#autor').val();
        let genero = $('#genero').val();
        let editora = $('#editora').val();
        if (nome != '' && autor != '' && genero != '' && editora != '') {
            let livro = new Livros(nome, autor, genero, editora);
            if (auxPosicao == '') {
                cadastrar(livro, listaLivros);
            } else {
                alterar(livro, listaLivros, auxPosicao);
                auxPosicao = '';
            }
            $('#tbTabela').html(listar(listaLivros));
            $('input').val('');
        } else {
            alert('Preencha todos os campos!');
        }
    });

    $('#tbTabela').on('click', '.btn-warning', function () {
        auxPosicao = $(this).attr('rel');
        $('#nome').val(listaLivros[auxPosicao].nome);
        $('#autor').val(listaLivros[auxPosicao].autor);
        $('#genero').val(listaLivros[auxPosicao].genero);
        $('#editora').val(listaLivros[auxPosicao].editora);
    });

    $('#tbTabela').on('click', '.btn-danger', function () {
        let posicaoExcluir = $(this).attr('rel');
        if (confirm('Tem certeza que deseja excluir?')) {
            excluir(listaLivros, posicaoExcluir);
            $('#tbTabela').html(listar(listaLivros));
        }
    });

    $('#btnAjax').click(() => {
        $.ajax({
            url: 'http://date.jsontest.com/',
            method: 'GET'
        }).done(function (resposta) {
            $('#retornoAjax').html(resposta.time);
        });
    });

    $('#btnJson').click(() => {
        let jsonLivros = JSON.stringify(listaLivros);
        console.log(jsonLivros);
    });
});