//Agora vamos expandir o sistema anterior. Além de armazenar alunos e calcular médias por disciplina, queremos criar uma classe chamada Turma, responsável por reunir vários alunos e gerar uma lista com o desempenho deles em uma determinada disciplina.

class Aluno{
    constructor(nome){
        this.nome = nome;
        this.matematica = [];
        this.portugues = [];
    }

    adicionaNota(nota, disciplina){
        if (disciplina == "matematica"){
            this.matematica.push(nota)
        }
        else if (disciplina == "portugues"){
            this.portugues.push(nota)
        }
    }

    media(array){
        let soma = 0;
        for (let nota of array){
            soma += nota;
        }
        return soma / array.length
    }

    calculaMedia(disciplina){
        if (disciplina == "matematica"){
            return this.media(this.matematica)
        }
        else if(disciplina == "portugues"){
            return this.media(this.portugues)
        }
        else{
            console.log("Disciplina não reconhecida.")
        }
    }
}

class Turma{
    constructor(nomeTurma){
        this.nomeTurma = nomeTurma;
        this.alunos = [];
    }

    criaRanking(disciplina){
        for(let aluno of turma)
        media = aluno.calculaMedia(disciplina)
        media.push(aluno, media)
        for(let i = 0; i < media.length; i++){
        maior = 1;
    }
    }
    
    
}


// Casos de teste

let a1 = new Aluno("Beltrano");
a1.adicionaNota(8, "matematica");
a1.adicionaNota(9, "portugues");

let a2 = new Aluno("Fulano");
a2.adicionaNota(10, "matematica");
a2.adicionaNota(7, "portugues");

let a3 = new Aluno("Ciclana");
a3.adicionaNota(10, "matematica");
a3.adicionaNota(9, "portugues");

let turma = new Turma("3º Ano");

turma.alunos.push(a1);
turma.alunos.push(a2);
turma.alunos.push(a3);

console.log(turma.criaRanking("matematica"))
console.log(turma.criaRanking("portugues"))

