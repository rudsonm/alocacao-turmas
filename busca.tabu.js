class Tabu {
    static quantidade = 10;
    constructor(disciplina, laboratorio) {
        this.disciplina = disciplina;
        this.laboratorio = laboratorio;
    }
}

Array.prototype.adicionarConfigTabu = function(tabuCandidato) {
    for(let tabu of this) {
        if(tabu.disciplina == tabuCandidato.disciplina 
        && tabu.laboratorio == tabuCandidato.laboratorio) {
            return;
        }
    }
    this.unshift(novoTabu);
    if(this.length > Tabu.quantidade)
        this.pop();
}

function buscaTabu(instancia) {

}