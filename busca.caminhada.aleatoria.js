function obterSolucaoAleatoria(instancia) {
    let solucao = new Solucao(instancia.disciplinas.length, instancia.laboratorios.length);
    for(let i = 0; i < solucao.alocacoes.length; i++) {
        let laboratorio;
        do {
            laboratorio = Math.round(Math.random() * (instancia.laboratorios.length - 1));
        } while(solucao.usoLaboratorios[laboratorio] >= instancia.aulasPorSemana);
        solucao.alocacoes[i] = laboratorio;
        solucao.usoLaboratorios[laboratorio]++;
        solucao.qualidade += obterValorAvaliacao(instancia.laboratorios[laboratorio], instancia.disciplinas[i], instancia.pesoAlunos, instancia.pesoRecurso);
    }
    return solucao;
}

function caminhadaAleatoria(instancia, solucao, painter, velocidade = 1) {
    solucao = solucao || obterSolucaoAleatoria(instancia);

    let pesoRecurso = instancia.pesoRecurso;
    let pesoAluno = instancia.pesoAlunos;

    let melhores;
    let interval = setInterval(function() {
        painter.desenharSolucao(solucao.alocacoes);
        painter.adicionarPonto(solucao.qualidade);
        melhores = new Array();
        for(let i = 0; i < instancia.disciplinas.length; i++) {            
            for(let j = 0; j < instancia.laboratorios.length; j++) {
                // caso já esteja alocada ou ocupacao do laboratorio ja esteja no limite
                if (j === solucao.alocacoes[i] || solucao.usoLaboratorios[j] === instancia.aulasPorSemana)
                    continue;

                let solucaoVizinha = clonarSolucao(solucao);
                
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

                if(solucaoVizinha.qualidade < solucao.qualidade)
                    melhores.push(solucaoVizinha);
            }
        }
        if(melhores.length) {
            let proximaSolucao = Math.round(Math.random() * (melhores.length - 1));
            solucao = clonarSolucao(melhores[proximaSolucao]);            
        } else {
            clearInterval(interval);
            return solucao;
        }
    }, 500 * velocidade);
}