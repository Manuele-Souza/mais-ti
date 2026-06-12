const prompt = require('prompt-sync')();
const db = require('./database');

// -------------------------------------------
// FUNÇÕES AUXILIARES
// -------------------------------------------

function pausar() {
    // pausa a execucao e limpa a tela
    console.log('n/-------------------------');
    console.log("Pressione ENTER para continuar...");
    console.clear();
}

// -------------------------------------------
// FUNÇÕES DE VISUALIZACAO
// -------------------------------------------

function listarTodosOsTrechos() {
    // busca os trechos com numeroPassagens > 0
    // faz JOIN com Companhia para exibir o nome
    // exibe no terminal

  const trecho = db.prepare('SELECT * FROM trecho').all();

    if (trecho.length === 0) {
        console.log('\nNenhum trecho cadastrado.');
    } else {
        console.log('\n======= Trechos =======');
        for (let i = 0; i < trecho.length; i++) {
            const trecho = db.prepare('SELECT * FROM Trecho WHERE numeroPassagens = ?').get(idTrecho);

        }
    }

    return trecho;


}

function listarTrechosPorCompanhia() {
    // lista as companhias, pede o id da companhia
    // busca os trechos daquela companhia com numeroPassagens > 0
    // exibe no terminal

}

// -------------------------------------------
// FUNÇÕES DE COMPRA
// -------------------------------------------

function exibirCarrinho(carrinho) {
    // percorre o array carrinho e exibe cada item com origem, destino e valor
}

function adicionarAoCarrinho(carrinho) {
    // chama listarTodosOsTrechos, pede o id do trecho
    // busca o trecho no banco e verifica se tem passagens disponiveis
    // adiciona o trecho ao array carrinho
}

function removerDoCarrinho(carrinho) {
    // exibe o carrinho, pede o numero do item a remover
    // remove do array usando splice
}

function aplicarCupom() {
    // pede o codigo do cupom
    // busca no banco, verifica se existe e se tem cupons disponiveis
    // exibe o aviso adequado e retorna o percentual de desconto (ou 0)
}

function finalizarCompra(carrinho) {
    // verifica se o carrinho nao esta vazio
    // chama aplicarCupom para obter o percentual de desconto
    // calcula subtotal, valor de desconto e valor final
    // exibe o cupom fiscal
    // pede confirmacao digitando "comprar"
    // se confirmado: subtrai uma passagem de cada trecho no banco e subtrai um cupom se houver desconto
    // retorna true se a compra foi confirmada, false caso contrario
}

// -------------------------------------------
// MENU PRINCIPAL
// -------------------------------------------

let opcao = -1;
const carrinho = [];

console.clear();
console.log('\n===========================================');
console.log('   SISTEMA DE PASSAGENS - CLIENTE          ');
console.log('===========================================');

while (opcao !== 0) {
    console.log('\n---- MENU ----');
    console.log('1 - Ver trechos disponiveis');
    console.log('2 - Adicionar trecho ao carrinho');
    console.log('3 - Remover trecho do carrinho');
    console.log('4 - Ver carrinho');
    console.log('5 - Finalizar compra');
    console.log('0 - Sair');
    console.log('-------------------------\n');

    opcao = parseInt(prompt('Escolha uma opcao: '));

    switch (opcao) {

        case 1:
            console.log('\n---- VISUALIZAR TRECHOS ----');
            console.log('1 - Todos os trechos');
            console.log('2 - Por companhia');
            const opcaoVisualizacao = parseInt(prompt('Escolha: '));

            if (opcaoVisualizacao === 1) listarTodosOsTrechos();
            else if (opcaoVisualizacao === 2) listarTrechosPorCompanhia();
            else console.log('\nOpcao invalida.');

            pausar();
            break;

        case 2:
            adicionarAoCarrinho(carrinho);
            pausar();
            break;

        case 3:
            removerDoCarrinho(carrinho);
            pausar();
            break;

        case 4:
            exibirCarrinho(carrinho);
            pausar();
            break;

        case 5:
            const compraFinalizada = finalizarCompra(carrinho);
            if (compraFinalizada) {
                carrinho.length = 0; // esvazia o carrinho apos a compra
            }
            pausar();
            break;

        case 0:
            console.log('\nFinalizando o sistema... Ate logo!\n');
            break;

        default:
            console.log('\nOpcao invalida! Tente novamente.');
            pausar();
            break;
    }
}
