var recursos = [
	'Portugol Studio', 		// 0
	'Code Blocks', 			// 1
	'NetBeans', 			// 2
	'Postgres', 			// 3
	'Enterprise Architect', // 4
	'MatLab', 				// 5
	'JFlap',				// 6
	'Gals', 				// 7
	'Corel Draw', 			// 8
	'Open MP', 				// 9
	'Logisim', 				// 10
	'Quartus II', 			// 11
	'Mars', 				// 12
	'Max+Plus', 			// 13
	'Bipide', 				// 14
	'XAMPP', 				// 15
	'NetLogo', 				// 16
	'Balsamiq' 				// 17
];

// alunos, recursos, nome
var disciplinas = [
	// 1º Semestre
	new Disciplina(35, [0], 'Algoritmos e Programacao I'),
	new Disciplina(30, [11], 'Computação Basica'),
	
	// 2º Semestre
	new Disciplina(28, [1],  	 'Algoritmos e Programacao II'),
	new Disciplina(27, [10, 13], 'Circuitos Digitais'),
	
	// 3º Semestre
	new Disciplina(25, [1, 11, 12], 'Arquitetura E Organização de Computadores I'),
	new Disciplina(25, [1],     	'Estruturas de Dados'),
	new Disciplina(25, [2, 4], 		'Programação I'),
	
	// 4º Semestre
	new Disciplina(23, [2, 14], 'Programação II'),
	new Disciplina(22, [1, 9],  'Arquitetura E Organização de Computadores II'),
	new Disciplina(16, [],      'Calculo Númerico'),
	
	// 5º Semestre
	new Disciplina(23, [4], 	'Eng. De Software I'),
	new Disciplina(25, [3],     'Banco de Dados I'),
	new Disciplina(20, [1, 5],  'Sistemas Operacionais'),
	new Disciplina(23, [1],  	'Tópicos especiais em Programação'),
		
	// 6º Semestre
	new Disciplina(20, [3],       'Banco de Dados II'),
	new Disciplina(22, [],   	  'Eng. De Software II'),
	new Disciplina(19, [16],  	  'Simulacao Discreta de Sistemas'),
	new Disciplina(19, [],  	  'Grafos'),
	new Disciplina(22, [2, 6, 7], 'Automatos e Linguagens Formais'),
	
	// 7º Semestre
	new Disciplina(17, [5], 	  'Redes e Sistemas de Computadores I'),
	new Disciplina(14, [], 		  'Inteligencia Artificial I'),
	new Disciplina(12, [],  	  'Complexidade de Algoritmos'),
	new Disciplina(11, [],  	  'Compiladores'),
	new Disciplina(19, [],   	  'Eng. De Software III'),
	
	// 8º Semestre
	new Disciplina(15, [5], 'Redes e Sistemas de Computadores II'),
	new Disciplina(9, [], 	'Inteligencia Artificial II'),
	new Disciplina(8, [],  'Sistemas Distribuidos'),
	
	// 9º Semestre
	new Disciplina(11, [], 	 'Tópicos´ Especiais em Computação I'),
	new Disciplina(7, [17], 'Eng. de Usabilidade'),
	
	// 10º Semestre
	new Disciplina(8, [], 'Tópicos´ Especiais em Computação II')
	
	];

// capacidade, recursos, nome
var laboratorios = [
	new Laboratorio(10, [0, 4, 7], 'Lab 1'),
	new Laboratorio(25, [2, 3, 4], 'Lab 2'),
	new Laboratorio(30, [5, 6], 'Lab 3'),
	new Laboratorio(30, [], 'Lab 4'),
	new Laboratorio(25, [0, 1, 4], 'Lab 5'),
	new Laboratorio(25, [0, 4, 7], 'Lab 6'),
	new Laboratorio(10, [2, 3, 4], 'Lab 7'),
	new Laboratorio(30, [5, 6], 'Lab 8'),
	new Laboratorio(21, [], 'Lab 9'),
	new Laboratorio(25, [0, 1, 4], 'Lab 10'),
	new Laboratorio(25, [0, 1, 4], 'Lab 11')
];

// parametros: disciplinas, laboratórios, número de aulas por semana, peso de recurso, peso de alunos
var instancia = new Instancia(disciplinas, laboratorios, 5, 2, 1);
//console.log(obterQualidadeSolucao(solucaoTabu.alocacoes, instancia));