class Disciplina {
	constructor(alunos, recursos, nome) {
		this.nome = nome;
		this.alunos = alunos;
		this.recursos = recursos;
	}
}

class Laboratorio {
	constructor(alunos, recursos, nome) {
		this.nome = nome;
		this.alunos = alunos;
		this.recursos = recursos;
	}
}

class Instancia {
	constructor(disciplinas, laboratorios, aulasPorDia, pesoRecurso = 2, pesoAlunos = 1) {
		this.disciplinas = disciplinas;
		this.laboratorios = laboratorios;
		this.pesoRecurso = pesoRecurso;
		this.pesoAlunos = pesoAlunos;
		this.aulasPorDia = aulasPorDia || laboratorios.length;
	}
}

class Solucao {
	constructor() {
		this.qualidade = 0;
		this.alocacao = [];
	}
}