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
        for(let i = 0; i < solucao.alocacoes.length; i++) {
            let alocacoes = solucao.alocacoes[i];
            for(let j = i + 1; j < alocacoes.length; j++) { // i + 1 para não occorrer trocas iguais
                let alocacao = alocacoes[j];
                // trocar as disciplinas i para j
                Swap();
                
                // verificar se atende as restrições de configurações tabu

                // recalcular qualidade de acordo com a troca (decrementar antes de trocar?)

                // selecionando configuracao candidata à tabu
                if(alocacao.qualidade < menorQualidade) {
                    menorQualidade = alocacao.qualidade;
                    novoTabu = new Tabu(alocacao.disciplina, alocacao.laboratorio);
                }
            }
        }
        tabus.adicionarConfigTabu(novoTabu);
    } while(++it < maxIt);
	return solucao;
}