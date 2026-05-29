/*
1) Armazenar nomes e senhas = class paciente
2) Gerenciar senhas = class gerenciarConsulta
3) Colocar pacientes na fila = adicionar paciente
4) Chamar pacientes = chamar()- Shift
4.1) Remover Paciente do chamado- shift(chama)
shift
push
*/

class Paciente {
    constructor(nome, senha){
        this.nome = nome;
        this.senha = senha;
    }
}

class gerenciadorConsulta{
    constructor(){
        this.fila = []
        this.proximaSenha = 1
    }

    adicionarPaciente (nome){
    let paciente = new Paciente(nome, this.proximaSenha)
        this.fila.push(paciente)
        this.proximaSenha ++
    }
    mostrarFila(){
        let pacienteRemovido = this.fila.shift()
        console.log("Senha:" + pacienteRemovido.senha + " Nome:" + pacienteRemovido.nome)
    }
}

let atendimento = new gerenciadorConsulta()
atendimento.adicionarPaciente("Fulano")
atendimento.mostrarFila()