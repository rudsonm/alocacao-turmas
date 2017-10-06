class Tabu {
    constructor(disciplina, laboratorio, qualidade) {
        this.disciplina = disciplina;
        this.laboratorio = laboratorio;
        this.qualidade = qualidade;
    }
}

Array.prototype.adicionarConfigTabu = adicionarConfigTabu;
function adicionarConfigTabu(tabuCandidato) {
    for(let tabu of this) {
        if(tabu.disciplina == tabuCandidato.disciplina 
        && tabu.laboratorio == tabuCandidato.laboratorio) {
            
        }
    }
}

function buscaTabu(instancia) {

}