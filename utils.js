Array.prototype.separarEmIntervalo = function(intervalo) {
    let separados = [];
    let grupo = [];
    for(let i = 0; i < this.length; i++) {
        grupo.push(this[i]);
        if(grupo.length == intervalo) {
			separados.push(grupo);
			grupo = [];
		}
	}
	if(grupo.length)
		separados.push(grupo);
    return separados;
}

Array.prototype.copy = function() {
	return Object.assign([], this);
}

function Swap(a, b) {
	[a, b] = [b, a];
}

function obterRecursosAtendidos(recursosDis, recursosLab) {
	var recursosAtendidos = 0;
	for(let a of recursosDis)
		for(let b of recursosLab)
			if(a == b)
				recursosAtendidos++;
	return recursosAtendidos;
}

function obterValorAvaliacao(laboratorio, disciplina, pesoRecurso, pesoAlunos) {
	let recursosAtendidos = obterRecursosAtendidos(disciplina.recursos, laboratorio.recursos);
	let recursos = (disciplina.recursos.length - recursosAtendidos) * pesoRecurso;
	let alunos = (laboratorio.alunos - disciplina.alunos) * pesoAlunos;
	// penaliza quando faltar lugar
	alunos *= (laboratorio.alunos < disciplina.alunos) ? 2 : 1;
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

function obterQualidadeSolucao(alocacoes, instancia) {
	let qualidade = 0;
	for(let i = 0; i < alocacoes.length; i++) {
		let laboratorio = instancia.laboratorios[alocacoes[i]];
		let disciplina = instancia.disciplinas[i];
		qualidade += obterValorAvaliacao(laboratorio, disciplina, instancia.pesoRecurso, instancia.pesoAlunos);
	}
	return qualidade;
}

function clonarSolucao(solucao) {
    let nova = new Solucao();
    nova.alocacoes = solucao.alocacoes.copy();
    nova.usoLaboratorios = solucao.usoLaboratorios.copy();
    nova.qualidade = solucao.qualidade;
    return nova;
}

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

function imprimirSolucao(solucao) {	
	alert(solucao.qualidade + " " + JSON.stringify(solucao.alocacoes) + " " + JSON.stringify(solucao.usoLaboratorios));
}