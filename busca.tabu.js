function buscaTabu(instancia, solucao, maxIt = 16, painter, velocidade, funcaoTermino = alert) {
    solucao = solucao || obterSolucaoAleatoria(instancia);
    let maximoConfigTabu = instancia.disciplinas.length * 0.25;
    let pesoRecurso = instancia.pesoRecurso;
    let pesoAluno = instancia.pesoAlunos;

    let melhorSolucao = clonarSolucao(solucao);
    let solucaoAtual = clonarSolucao(solucao);

    let tabus = [];
    let it = 0;
    let melhorIt = 0;
    let interval = setInterval(function() {
        painter.desenharSolucao(solucaoAtual.alocacoes);
        painter.adicionarPonto(solucaoAtual.qualidade);

        let proximaSolucao = { qualidade: Infinity };
        let menorQualidade = Infinity;
        let novoTabu;

        for (let i = 0; i < instancia.disciplinas.length; i++) {
            for (let j = 0; j < instancia.laboratorios.length; j++) {
                if (tabus.some(t => t[0] === i && t[1] === j) // verifica se configuração está na lista de tabus
                    || j === solucaoAtual.alocacoes[i] // caso disciplina já esteja alocada no laboratório j
                    || solucaoAtual.usoLaboratorios[j] === instancia.aulasPorSemana) // laboratório ocupado todos os dias
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

                if (qualidade < menorQualidade) {
                    novoTabu = [i, j];
                    menorQualidade = qualidade;
                }

                if (solucaoVizinha.qualidade < proximaSolucao.qualidade) {
                    proximaSolucao = clonarSolucao(solucaoVizinha);

                    if (solucaoVizinha.qualidade < melhorSolucao.qualidade) {
                        melhorSolucao = clonarSolucao(solucaoVizinha);
                        melhorIt = it;
                    }
                }                
            }
        }
        solucaoAtual = clonarSolucao(proximaSolucao);

        tabus.unshift(novoTabu);
        if (tabus.length > maximoConfigTabu)
            tabus.pop();        
        if(++it === maxIt) {
            clearInterval(interval);
            funcaoTermino(solucao.qualidade + " " + melhorIt);
            return melhorSolucao;
        }
    }, velocidade);    
}