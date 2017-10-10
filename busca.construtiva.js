function buscaConstrutiva(instancia) {	
	
}

function buscaConstrutiva(instancia) {
	var disciplinasNaoAlocadas = instancia.disciplinas.copy();
	disciplinasNaoAlocadas.sort((a,b) => a.recursos.length - b.recursos.length);
	var pRecurso = instancia.pesoRecurso;
	var pAluno = instancia.pesoAlunos;
	var aulasPorDia = Math.abs(instancia.laboratorios.length - instancia.aulasPorDia);
	// vetor onde as chaves representam as disciplinas e os valores os laboratórios onde cada disciplina será alocada
	var solucao = new Solucao();
	var laboratorios = instancia.laboratorios.copy();	
	var laboratoriosAlocados = 0;

	// começando pelo primeiro dia
	solucao.alocacoes.push([]);
	var dia = 0;
	do {		
		// seleciona melhor laboratório
		let disciplina = disciplinasNaoAlocadas.shift();
		let laboratorio = obterLaboratorioComRecurso(disciplina, laboratorios, pRecurso, pAluno);
		let qualidade = obterValorAvaliacao(laboratorio, disciplina, pRecurso, pAluno);						

		// solucao.alocacao.push(qualidade.toString().concat(" ", disciplina.nome, " => ", laboratorio.nome));
		solucao.alocacoes[dia].push({
			disciplina: instancia.disciplinas.indexOf(disciplina),
			laboratorio: instancia.laboratorios.indexOf(laboratorio), 
			qualidade: qualidade
		});

		solucao.qualidade += qualidade;
		laboratoriosAlocados++;

		// avança de dia caso não sobre laboratórios ou as aulas foram preenchidas
		laboratorios.splice(laboratorios.indexOf(laboratorio), 1);
		if(!laboratorios.length || laboratoriosAlocados == aulasPorDia) {
			laboratoriosAlocados = 0;
			laboratorios = Object.assign([], instancia.laboratorios);			
			solucao.alocacoes.push([]);			
			dia++;
		}
	} while(disciplinasNaoAlocadas.length > 0);
	return solucao;
}
// realocar laboratorios já alocados anteriormente