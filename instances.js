var recursos = [
	'Portugol Studio', // 0
	'Code Blocks', // 1
	'NetBeans', // 2
	'Postgres', // 3
	'Enterprise Architect', // 4
	'MatLab', // 5
	'JFlap', // 6
	'Gals', // 7
	'Corel Draw' // 8
];

var disciplinas = [
	new Disciplina(13, [0], 'Algoritmos e Programacao I'),
	new Disciplina(13, [1], 'Algoritmos e Programacao II'),
	new Disciplina(16, [3], 'Banco de Dados I'),
	new Disciplina(16, [3], 'Banco de Dados II'),
	new Disciplina(12, [], 'Simulacao Discreta de Sistemas'),
	new Disciplina(15, [], 'Complexidade de Algoritmos'),
	new Disciplina(15, [2, 6, 7], 'Automatos e Linguagens Formais'),
	new Disciplina(20, [0, 1, 2], 'Inteligencia Artificial I'),
	new Disciplina(20, [0, 1, 2, 3], 'Inteligencia Artificial II'),
	new Disciplina(21, [5], 'Redes e Sistemas de Computadores I'),
	new Disciplina(21, [5], 'Redes e Sistemas de Computadores II'),
	new Disciplina(9, [1, 5], 'Sistemas Operacionais')
];

var laboratorios = [
	new Laboratorio(9, [0, 4, 7], 'Lab 1'),
	new Laboratorio(18, [2, 3, 4], 'Lab 2'),
	new Laboratorio(13, [5, 6], 'Lab 3'),
	new Laboratorio(21, [], 'Lab 4'),
	new Laboratorio(15, [0, 1, 4], 'Lab 5')
];

// parametros: disciplinas, laboratórios, número de aulas por semana, peso de recurso, peso de alunos
var instancia = new Instancia(disciplinas, laboratorios, 5, 2, 1);
var solucao = buscaConstrutiva(instancia);
console.log(solucao.qualidade, JSON.stringify(solucao.alocacoes), JSON.stringify(solucao.usoLaboratorios));
var solucaoTabu = buscaTabu(instancia, solucao);
console.log(solucaoTabu.qualidade, JSON.stringify(solucaoTabu.alocacoes), JSON.stringify(solucaoTabu.usoLaboratorios));
//console.log(obterQualidadeSolucao(solucaoTabu.alocacoes, instancia));

