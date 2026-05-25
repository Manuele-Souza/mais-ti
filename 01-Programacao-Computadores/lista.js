// retorna posição de um número. lista.length

//Se negativo, inverte a ordem. console.log(lista.sort((x, y) => y-x));

/* Crie um código que receba uma lista de números e mostre no terminal

-A quantidade de elementos
-Se a lista está ordenada em ordem crescente/ Caso não esteja ordene e  mostre na tela
-A média da lista
-Os elementos acima da média

prompt = require('prompt-sync')();
*/


let lista = [4, 2, 8, 5, 9];

console.log('A quantidade de elementos da lista é:', lista.length)

lista_ ordenada = lista.sort((x, y) => x-y)

copia_lista = [...lista]

console.log('A lista não está ordenada: ' + lista)
console.log('A lista está ordenada: ' + lista.sort((x, y) => x-y));


let media = (4 + 2 + 8 + 5 + 9) / 5

console.log('A média é: ' + media)

for(let elemento of lista)
