class Tabu {
    static obterNumeroMaximoConfiguracoes() {
        return 5;
    }
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
    this.unshift(tabuCandidato);
    if(this.length >= Tabu.obterNumeroMaximoConfiguracoes())
        this.pop();
    return true;
}

function buscaTabu(instancia, solucao, maxIt = 500) {
	var pRecurso = instancia.pesoRecurso;
	var pAluno = instancia.pesoAlunos;
    var aulasPorDia = Math.abs(instancia.laboratorios.length - instancia.aulasPorDia);
    
    var melhorSolucao = solucao.copy();
    var solucaoAtual = solucao.copy();

    var tabus = [];
    var it = 0;
    do {        
        let menorQualidade = Infinity;
        let novoTabu;
        // possíveis estratégias:
        // para cada disciplina ja alocada, trocar de laboratório com as outras disciplinas?
        // para cada laboratório selecionar a disciplina que melhor se encaixa?
        
                // trocar as disciplinas de laboratório => i para j
                Swap();
                
                // verificar se atende as restrições de configurações tabu

                // recalcular qualidade de acordo com a troca (para facilitar: decrementar antes de trocar?)

                // selecionando configuracao candidata à tabu
                
        tabus.adicionarConfigTabu(novoTabu);
    } while(++it < maxIt);
	return solucao;
}