const prompt = require('prompt-sync')();
const db = require('./database');

// -------------------------------------------
// FUNÇÕES AUXILIARES
// -------------------------------------------

function pausar() {
    // pausa a execucao e limpa a tela
}

function listarCompanhias() {
    // busca todas as companhias no banco e exibe no terminal
    // retorna o array de companhias

const Companhias = db.prepare('SELECT * FROM Companhia').all();
console.log(Companhias.length); // 4

for (let i = 0; i < Companhias.length; i++) {
    console.log(Companhias[i].titulo);
    return companhias
}

}

function validarOuCadastrarCompanhia(idInformado) {
    // busca a companhia pelo id informado
    // se nao existir, pergunta se o usuario quer cadastrar uma nova
    // se sim, pede nome e ano de fundacao e insere no banco
    // retorna o id valido ou null se o usuario optar por nao cadastrar

    const Companhia = db.prepare(`SELECT * FROM Companhia WHERE id = ?`).get(idInformado);
    
    if(Companhia){
        console.log(idInformado)
        return idInformado
    } 

    console.log('Nenhuma companhia cadastrada com esse ID')
    const opcaoCadastro = prompt('Deseja cadastrar uma nova companhia? (s/n):')
//toLocalLowerCase formata o texto para letras minusculas
    if(opcaoCadastro.toLocaleLowerCase() !== 's') {
        return null
    }

        const nome = prompt('Digite o nome da companhia:')
        const anoFundacao = parseInt(prompt('Digite o ano de fundação:'))

        const resultadoCompanhia = db.prepare (`INSERT INTO Companhia(nome, anoFundacao) VALUES (?, ?)`).run(nome, anoFundacao)

        console.log('Companhia cadastrada com sucesso!')

        return resultadoCompanhia.lastInsertRowid
        
    }



// -------------------------------------------
// FUNÇÕES DE TRECHOS
// -------------------------------------------

function cadastrarTrecho() {
    // lista as companhias, pede o id da companhia
    // valida ou cadastra a companhia
    // pede origem, destino, valor e numero de passagens
    // insere o trecho no banco
    validarOuCadastrarCompanhia();
}

function listarTrechos() {
    // busca todos os trechos com JOIN na tabela Companhia
    // exibe os dados de cada trecho no terminal
}

function editarTrecho() {
    // lista os trechos, pede o id do trecho a editar
    // verifica se o trecho existe
    // pede os novos dados e atualiza no banco
}

function excluirTrecho() {
    // lista os trechos, pede o id do trecho a excluir
    // verifica se o trecho existe
    // remove do banco
}

// -------------------------------------------
// FUNÇÕES DE CUPONS
// -------------------------------------------

function cadastrarCupom() {
    // lista as companhias, pede o id da companhia
    // valida ou cadastra a companhia
    // pede codigo, percentual de desconto e numero de cupons
    // insere o cupom no banco
}

function listarCupons() {
    // busca todos os cupons com JOIN na tabela Companhia
    // exibe os dados de cada cupom no terminal
}

function editarCupom() {
    // lista os cupons, pede o codigo do cupom a editar
    // verifica se o cupom existe
    // pede os novos dados e atualiza no banco
}

function excluirCupom() {
    // lista os cupons, pede o codigo do cupom a excluir
    // verifica se o cupom existe
    // remove do banco
}

// -------------------------------------------
// MENU PRINCIPAL
// -------------------------------------------

let opcao = -1;

console.clear();
console.log('\n===========================================');
console.log('   SISTEMA DE PASSAGENS - COMPANHIA        ');
console.log('===========================================');

while (opcao !== 0) {
    console.log('\n---- MENU ----');
    console.log('1 - Gerenciar Trechos');
    console.log('2 - Gerenciar Cupons');
    console.log('0 - Sair');
    console.log('-------------------------\n');

    opcao = parseInt(prompt('Escolha uma opcao: '));

    switch (opcao) {

        case 1:
            console.log('\n---- TRECHOS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoTrecho = parseInt(prompt('Escolha: '));
    

            switch (opcaoTrecho) {
                case 1:
                    const idInformado = parseInt(prompt('Informe o ID:'))
                    
                     cadastrarTrecho(); 
                break;
                case 2: listarTrechos(); break;
                case 3: editarTrecho(); break;
                case 4: excluirTrecho(); break;
                default: console.log('\nOpcao invalida.'); break;
            }
            pausar();
            break;

        case 2:
            console.log('\n---- CUPONS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoCupom = parseInt(prompt('Escolha: '));

            switch (opcaoCupom) {
                case 1: cadastrarCupom(); break;
                case 2: listarCupons(); break;
                case 3: editarCupom(); break;
                case 4: excluirCupom(); break;
                default: console.log('\nOpcao invalida.'); break;
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
