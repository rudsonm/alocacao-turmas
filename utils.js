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

Object.prototype.copy = function() {
	return Object.assign({}, this);
}

Array.prototype.copy = function() {
	return Object.assign([], this);
}

function Swap(a, b) {
	[a, b] = [b, a];
}

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