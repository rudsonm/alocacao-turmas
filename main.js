class Turma {
	constructor(alunos, recursos) {
		this.alunos = alunos;
		this.recursos = recursos;
	}
}

class Laboratorio {
	constructor(alunos, recursos) {
		this.alunos = alunos;
		this.recursos = recursos;
	}
}

class Instancia {
	constructor(turmas, laboratorios) {
		this.turmas = turmas;
		this.laboratorios = laboratorios;
	}
}

function obterValorAvaliacao(laboratorio, turma) {
	var recursosAtendidos = 0;
	turma.recursos.forEach(function(recursoT) {
		laboratorios.recursos.forEach(function(recursoL) {
			if(recursoT == recursoL)
				recursosAtendidos++;
		});
	});
	var recursos = (turma.recursos - recursosAtendidos) * 2;
	var alunos = laboratorio.alunos - turma.alunos;
	return  (recursos + alunos) / 3;
}

function obterLaboratorioComRecurso(turma, laboratorios) {
	var indice = 0;
	var qualidade = avaliacao(turma, laboratorios[0]);
	for(var i = 1; i < laboratorios.length; i++) {
		var qualidadeAtual = obterValorAvaliacao(turma, laboratorios[i]);
		if(qualidadeAtual < qualidade) {
			qualidade = qualidadeAtual;
			indice = i;
		}
	}
	return indice;
}

function buscaConstrutiva(instancia) {
	var turmasNaoAlocadas = instancia.turmas;
	// vetor onde as chaves representam as turmas e os valores os laboratórios onde cada turma será alocada
	var solucao = [];
	var qualidade = 0;
	for(var turma in turmasNaoAlocadas) {
		let indiceLaboratorio = obterLaboratorioComRecurso(turma, instancia.laboratorios);
		let laboratorio = instancia.laboratorios[indiceLaboratorio];
		qualidade += obterValorAvaliacao(laboratorio, turma);
		solucao.push(indiceLaboratorio);
	}
	return solucao;
}

// realocar laboratorios já alocados anteriormente