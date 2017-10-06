function buscaConstrutiva(instancia) {
	var disciplinasNaoAlocadas = instancia.disciplinas;
	var pRecurso = instancia.pesoRecurso;
	var pAluno = instancia.pesoAlunos;
	// vetor onde as chaves representam as disciplinas e os valores os laboratórios onde cada disciplina será alocada
	var solucao = new Solucao();
	var laboratorios = Object.assign([], instancia.laboratorios);
	do {
		let disciplina = disciplinasNaoAlocadas.shift();
		let laboratorio = obterLaboratorioComRecurso(disciplina, laboratorios, pRecurso, pAluno);
		let qualidade = obterValorAvaliacao(laboratorio, disciplina, pRecurso, pAluno);
		laboratorios.splice(laboratorios.indexOf(laboratorio), 1);
		if(!laboratorios.length)
			laboratorios = Object.assign([], instancia.laboratorios);

		solucao.qualidade += qualidade;
		solucao.alocacao.push(qualidade.toString().concat(" ", disciplina.nome, " => ", laboratorio.nome));
	} while(disciplinasNaoAlocadas.length > 0);
	return solucao;
}
// realocar laboratorios já alocados anteriormente