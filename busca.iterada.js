function buscaIterada(instancia, solucao, maxIt = 100, painter, velocidade, funcaoTermino = alert, taxaPerturbacao = 0.25) {
    solucao = solucao || obterSolucaoAleatoria(instancia);
    let solucaoAtual = clonarSolucao(solucao);
    let it = 0;
    let melhorIt = 0;
    let interval = setInterval(function() {
        painter.desenharSolucao(solucaoAtual.alocacoes);
        painter.adicionarPonto(solucaoAtual.qualidade);

        let proximaSolucao = { qualidade: Infinity };        
        for(let i = 0; i < instancia.disciplinas.length; i++) {
            for(let j = 0; j < instancia.laboratorios.length; j++) {
                if (j === solucao.alocacoes[i] || solucao.usoLaboratorios[j] === instancia.aulasPorSemana)
                    continue;

                let solucaoVizinha = obterSolucaoVizinha(instancia, solucao, i, j);
                if(solucaoVizinha.qualidade < proximaSolucao.qualidade) {
                    proximaSolucao = clonarSolucao(solucaoVizinha);                    
                    if(solucaoVizinha.qualidade < solucao.qualidade) {
                        melhorIt = it;
                        solucao = clonarSolucao(solucaoVizinha);
                    }
                }
            }
        }

        if(proximaSolucao.qualidade <= solucaoAtual.qualidade) {
            let disciplinasPerturbadas = instancia.disciplinas.length * taxaPerturbacao;
            for(let i = 0; i < disciplinasPerturbadas; i++) {
                let disciplina = Math.round(Math.random() * (instancia.disciplinas.length - 1));
                let laboratorio;
                do {
                    laboratorio = Math.round(Math.random() * (instancia.laboratorios.length - 1));
                } while(proximaSolucao.usoLaboratorios[laboratorio] >= instancia.aulasPorSemana);
                proximaSolucao = obterSolucaoVizinha(instancia, proximaSolucao, disciplina, laboratorio);
            }
        }
        solucaoAtual = clonarSolucao(proximaSolucao);
        
        if(it++ === maxIt) {
            clearInterval(interval);
            funcaoTermino(solucao.qualidade + " " + melhorIt);
            return solucao;
        }
    }, velocidade);
}