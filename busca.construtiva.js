function buscaConstrutiva(instancia) {	
	
}

function buscaConstrutiva(instancia) {
	var disciplinasNaoAlocadas = instancia.disciplinas.copy();
	disciplinasNaoAlocadas.sort((a,b) => a.recursos.length - b.recursos.length);

	var pesoRecurso = instancia.pesoRecurso;
	var pesoAluno = instancia.pesoAlunos;
	var aulasPorDia = Math.abs(instancia.laboratorios.length - instancia.aulasPorDia);

	var solucao = new Solucao(instancia.disciplinas.length, instancia.laboratorios.length);

	var laboratorios = instancia.laboratorios.copy();
	do {
		// seleciona melhor laboratório
		let disciplina = disciplinasNaoAlocadas.shift();
		let laboratorio = obterLaboratorioComRecurso(disciplina, laboratorios, pesoRecurso, pesoAluno);
		let qualidadeAlocacao = obterValorAvaliacao(laboratorio, disciplina, pesoRecurso, pesoAluno);
		
		let indexLab = instancia.laboratorios.indexOf(laboratorio);

		solucao.alocacoes[instancia.disciplinas.indexOf(disciplina)] = laboratorio.nome.concat(" => ", qualidadeAlocacao, " => ", disciplina.nome);
		// solucao.alocacoes[instancia.disciplinas.indexOf(disciplina)] = indexLab;

		solucao.usoLaboratorios[indexLab]++;
		if(solucao.usoLaboratorios[indexLab] >= instancia.aulasPorSemana) {
			laboratorios.splice(laboratorios.indexOf(laboratorio), 1);
		}
		solucao.qualidade += qualidadeAlocacao;
	} while(disciplinasNaoAlocadas.length > 0);
	return solucao;
}
// realocar laboratorios já alocados anteriormente