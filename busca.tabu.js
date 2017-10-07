class Tabu {
    static quantidade = 10;
    constructor(disciplina, laboratorio) {
        this.disciplina = disciplina;
        this.laboratorio = laboratorio;
    }
}

Array.prototype.jaExisteConfigTabu = function(tabu) {
    for(let t of this)
        if(t.disciplina === tabu.disciplina && t.laboratorio === tabu.laboratorio)
            return true;
    return false;
}

Array.prototype.adicionarConfigTabu = function(tabuCandidato) {
    if(this.jaExisteConfigTabu(tabuCandidato))
        return false;
    this.unshift(novoTabu);
    if(this.length > Tabu.quantidade)
        this.pop();
    return true;
}

function buscaTabu(instancia, maxIt = 500) {
	var pRecurso = instancia.pesoRecurso;
	var pAluno = instancia.pesoAlunos;
	var aulasPorDia = Math.abs(instancia.laboratorios.length - instancia.aulasPorDia);
	var melhorSolucao = new Solucao();
    var laboratorios = laboratorios.copy();
    var tabus = [];
    var it = 0;
    do {
        var menorQualidade = Infinity;
        var novoTabu = new Tabu();
        let disciplinasAlocadas = 0;
        for(let i = 0; i < instancia.disciplinas.length; i++) {
            for(let j = 0; j < instancia.laboratorios.length; j++) {
                
            }
        }
    } while(++it < maxIt);
	return solucao;
}