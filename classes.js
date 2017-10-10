class Disciplina {
	constructor(alunos, recursos = [], nome = null) {
		this.nome = nome;
		this.alunos = alunos;
		this.recursos = recursos;
	}
}

class Laboratorio {
	constructor(alunos, recursos = [], nome = null) {
		this.nome = nome;
		this.alunos = alunos;
		this.recursos = recursos;
	}
}

class Instancia {
	constructor(disciplinas, laboratorios, aulasPorSemana, pesoRecurso = 2, pesoAlunos = 1) {
		this.disciplinas = disciplinas;
		this.laboratorios = laboratorios;
		this.pesoRecurso = pesoRecurso;
		this.pesoAlunos = pesoAlunos;
		this.aulasPorSemana = aulasPorSemana;
	}
}

class Solucao {
	constructor(qtdDisciplinas, qtdLaboratorios) {
		this.qualidade = 0;
		this.alocacoes = Array(qtdDisciplinas);
		this.usoLaboratorios = [];
		for(let i = 0; i < qtdLaboratorios; i++)
			this.usoLaboratorios.push(0);
	}
}