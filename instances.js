var disciplinas = [
	new Disciplina(13, [0, 1], 'Algoritmos e Programacao'),
	new Disciplina(16, [1], 'Banco de Dados I'),
	new Disciplina(12, [0, 1, 2], 'Simulacao Discreta de Sistemas'),
	new Disciplina(15, [], 'Complexidade de Algoritmos'),
	new Disciplina(20, [0, 1, 2], 'Inteligencia Artificial'),
	new Disciplina(21, [], 'Redes e Sistemas de Computadores'),
	new Disciplina(9, [1, 2], 'Sistemas Operacionais')
];

var laboratorios = [
	new Laboratorio(23, [1], 'Lab 1'),
	new Laboratorio(18, [0, 2], 'Lab 2'),
	new Laboratorio(13, [], 'Lab 3'),
	new Laboratorio(9, [0, 1], 'Lab 4')
];

var instancia = new Instancia(disciplinas, laboratorios, 2, 1, 2);

var solucao = buscaConstrutiva(instancia);
console.log(solucao.alocacoes.separarEmIntervalo(instancia.aulasPorDia));
solucao.alocacoes = solucao.alocacoes.separarEmIntervalo(instancia.aulasPorDia);
buscaTabu(instancia, solucao);