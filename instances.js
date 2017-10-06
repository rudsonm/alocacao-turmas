var recursos = [0, 1, 2];
var disciplinas = [
	new Disciplina(15, [0, 1], 'Algoritmos e Programacao'),
	new Disciplina(20, [1, 2], 'Banco de Dados I'),
	new Disciplina(25, [0, 1, 2], 'Simulacao Discreta de Sistemas'),
	new Disciplina(15, [], 'Complexidade de Algoritmos'),
	new Disciplina(20, [0, 1, 2], 'Inteligencia Artificial'),
	new Disciplina(25, [], 'Redes e Sistemas de Computadores'),
	new Disciplina(15, [1, 2], 'Sistemas Operacionais')
];
var laboratorios = [
	new Laboratorio(28, [1], 'Lab 1'),
	new Laboratorio(27, [0,2], 'Lab 2'),
	new Laboratorio(26, [], 'Lab 3')
];
var instancia = new Instancia(disciplinas, laboratorios, 2, 1);
var solucao = buscaConstrutiva(instancia);
console.log(solucao);