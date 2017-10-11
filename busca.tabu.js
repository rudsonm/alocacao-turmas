class Tabu {
    static obterNumeroMaximoConfiguracoes() {
        return 15;
    }
    constructor(disciplina, laboratorio) {
        this.disciplina = disciplina;
        this.laboratorio = laboratorio;
    }
}

Array.prototype.jaExisteConfigTabu = function(t) {
    for(let tabu of this)
        if(tabu.disciplina === t.disciplina && tabu.laboratorio === t.laboratorio)
            return true;
    return false;
}

Array.prototype.adicionarConfigTabu = function(tabuCandidato) {
    for(let tabu of this)
        if(tabu.disciplina === tabuCandidato.disciplina && tabu.laboratorio === tabuCandidato.laboratorio)
            return false;

    this.unshift(tabuCandidato);
    if(this.length > Tabu.obterNumeroMaximoConfiguracoes())
        this.pop();
    return true;
}

function clonarSolucao(solucao) {
    let nova = new Solucao();
    nova.alocacoes = solucao.alocacoes.copy();
    nova.usoLaboratorios = solucao.usoLaboratorios.copy();
    nova.qualidade = solucao.qualidade;
    return nova;
}

function buscaTabu(instancia, solucao, maxIt = 16) {
	let pesoRecurso = instancia.pesoRecurso;
	let pesoAluno = instancia.pesoAlunos;
    
    let melhorSolucao = clonarSolucao(solucao);
    let solucaoAtual = clonarSolucao(solucao);

    let tabus = [];
    let it = 0;
    do {        
        let proximaSolucao = { qualidade: Infinity };

        let menorQualidade = Infinity;
        let novoTabu;
        // possíveis estratégias:
        // para cada disciplina ja alocada, trocar de laboratório com as outras disciplinas?
        // para cada laboratório selecionar a disciplina que melhor se encaixa?
        
        // atual: aloca cada disciplina em todos os laboratorios disponíveis
        for(let i = 0; i < instancia.disciplinas.length; i++) {
            for(let j = 0; j < instancia.laboratorios.length; j++) {
                if(j == solucaoAtual.alocacoes[i])
                    continue;
                
                // verifica se laboratório tem dia disponível
                if(solucaoAtual.usoLaboratorios[j] == instancia.aulasPorSemana)
                    continue;
                
                if(tabus.jaExisteConfigTabu(new Tabu(i, j)))
                    continue;

                let solucaoVizinha = clonarSolucao(solucaoAtual);

                // decrescenta valor de qualidade da alocação que irá sair
                let disciplina = instancia.disciplinas[i];
                let laboratorioAntigo = instancia.laboratorios[solucaoVizinha.alocacoes[i]];
                solucaoVizinha.qualidade -= obterValorAvaliacao(laboratorioAntigo, disciplina, pesoRecurso, pesoAluno);
                // troca de laboratório
                solucaoVizinha.usoLaboratorios[solucaoVizinha.alocacoes[i]]--;
                solucaoVizinha.alocacoes[i] = j;
                solucaoVizinha.usoLaboratorios[j]++;

                // acrescenta valor de qualidade para nova alocação
                let laboratorioNovo = instancia.laboratorios[j];
                let qualidade = obterValorAvaliacao(laboratorioNovo, disciplina, pesoRecurso, pesoAluno);
                solucaoVizinha.qualidade += qualidade;
                
                if(qualidade < menorQualidade) {
                    novoTabu = new Tabu(i, j);
                    menorQualidade = qualidade;
                }

                if(solucaoVizinha.qualidade < proximaSolucao.qualidade)
                    proximaSolucao = clonarSolucao(solucaoVizinha);
                
                if(solucaoVizinha.qualidade < melhorSolucao.qualidade)
                    melhorSolucao = clonarSolucao(solucaoVizinha);
            }
        }
        solucaoAtual = clonarSolucao(proximaSolucao);
        tabus.adicionarConfigTabu(novoTabu);
    } while(it++ < maxIt);
	return melhorSolucao;
}