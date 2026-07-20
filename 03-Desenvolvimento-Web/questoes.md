# Lista de Exercícios – JavaScript (Básico ao Intermediário)

> **Instruções:** Resolva as questões na ordem apresentada. As questões **1, 2 e 3** são incrementais. As questões **4 e 5** formam outro conjunto incremental.

---

## 01. Cadastro de uma Pessoa

Crie um programa que receba duas variáveis (`nome` e `idade`) e exiba uma mensagem no seguinte formato:

```text
Olá! Meu nome é João e tenho 20 anos.
```

---

## 02. Transformando o Programa em uma Função

Utilizando o programa da questão anterior, crie uma função chamada `apresentarPessoa(nome, idade)` que receba o nome e a idade como parâmetros e exiba a mesma mensagem.

Agora, em vez de definir os valores diretamente no código, faça com que eles sejam informados pelo usuário.

---

## 03. Cadastrando Várias Pessoas

A partir da função criada na questão anterior, modifique o programa para trabalhar com um **array de nomes**.

Crie um array contendo o nome de **cinco pessoas** e utilize uma função chamada `listarPessoas(lista)` para percorrer o array e exibir todos os nomes numerados, conforme o exemplo abaixo:

```text
1 - Ana
2 - Bruno
3 - Carlos
4 - Daniela
5 - Eduardo
```

---

## 04. Calculando a Média de um Array

Crie um programa que receba um **array contendo cinco notas** e desenvolva uma função chamada `calcularMedia(notas)` que retorne a média aritmética dos valores.

Após calcular a média, exiba o resultado no console.

Exemplo:

```text
Entrada:
[8, 6, 9, 7, 10]

Saída:
Média: 8
```

---

## 05. Ordenando um Array

Utilizando o mesmo array de notas da questão anterior, crie uma função chamada `ordenarNotas(notas)` que organize os valores em **ordem crescente** e exiba o resultado.

Exemplo:

```text
Entrada:
[8, 6, 9, 7, 10]

Saída:
[6, 7, 8, 9, 10]
```

> **Observação:** Utilize o método `sort()` com uma função de comparação para realizar a ordenação corretamente.