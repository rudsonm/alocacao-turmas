function buscaConstrutiva(instancia) {
	var disciplinasNaoAlocadas = instancia.disciplinas.copy();
	var pRecurso = instancia.pesoRecurso;
	var pAluno = instancia.pesoAlunos;
	var aulasPorDia = Math.abs(instancia.laboratorios.length - instancia.aulasPorDia);
	// vetor onde as chaves representam as disciplinas e os valores os laboratórios onde cada disciplina será alocada
	var solucao = new Solucao();
	var laboratorios = instancia.laboratorios.copy();
	do {
		// seleciona melhor laboratório
		let disciplina = disciplinasNaoAlocadas.shift();
		let laboratorio = obterLaboratorioComRecurso(disciplina, laboratorios, pRecurso, pAluno);
		let qualidade = obterValorAvaliacao(laboratorio, disciplina, pRecurso, pAluno);

		// remove laboratório selecionado e/ou avança o dia
		laboratorios.splice(laboratorios.indexOf(laboratorio), 1);
		if(!laboratorios.length || laboratorios.length == aulasPorDia)
			laboratorios = Object.assign([], instancia.laboratorios);

		// adiciona valor da alocação para o total da solução
		solucao.qualidade += qualidade;
		// solucao.alocacao.push(qualidade.toString().concat(" ", disciplina.nome, " => ", laboratorio.nome));
		solucao.alocacoes.push({
			disciplina: instancia.disciplinas.indexOf(disciplina),
			laboratorio: instancia.laboratorios.indexOf(laboratorio), 
			qualidade: qualidade
		});
	} while(disciplinasNaoAlocadas.length > 0);
	return solucao;
}
// realocar laboratorios já alocados anteriormente