function obterRecursosAtendidos(recursosDis, recursosLab) {
	var recursosAtendidos = 0;
	for(let a of recursosDis) {
		for(let b of recursosLab) {
			if(a == b)
				recursosAtendidos++;
		}
	}
	return recursosAtendidos;
}

function obterValorAvaliacao(laboratorio, disciplina, pesoRecurso, pesoAlunos) {
	let recursosAtendidos = obterRecursosAtendidos(disciplina.recursos, laboratorio.recursos);
	let recursos = (disciplina.recursos.length - recursosAtendidos) * pesoRecurso;
	let alunos = (laboratorio.alunos - disciplina.alunos) * pesoAlunos;
	return  (recursos + Math.abs(alunos)) / (pesoRecurso + pesoAlunos);
}

function obterLaboratorioComRecurso(disciplina, laboratorios, pesoRecurso, pesoAlunos) {
	var indice = 0;
	var qualidade = Infinity;
	var melhorLaboratorio = null;
	for(let laboratorio of laboratorios) {
		let qualidadeAtual = obterValorAvaliacao(disciplina, laboratorio, pesoRecurso, pesoAlunos);
		if(qualidadeAtual < qualidade) {
			qualidade = qualidadeAtual;
			melhorLaboratorio = laboratorio;
		}
	}
	return melhorLaboratorio;
}