// parametros: disciplinas, laboratórios, número de aulas por semana, peso de recurso, peso de alunos
var instancia = new Instancia(disciplinas, laboratorios, 5, 2, 1);
var solucao = buscaConstrutiva(instancia);
console.log(solucao.qualidade, JSON.stringify(solucao.alocacoes), JSON.stringify(solucao.usoLaboratorios));
var solucaoTabu = buscaTabu(instancia, solucao);
console.log(solucaoTabu.qualidade, JSON.stringify(solucaoTabu.alocacoes), JSON.stringify(solucaoTabu.usoLaboratorios));
//console.log(obterQualidadeSolucao(solucaoTabu.alocacoes, instancia));

function obterTamanhoRetangulo(alunos) {
	return alunos * 5;
}

function escrever(texto, x, y, fontSize = 25) {
	this.painel.fillStyle = "black";
	this.painel.font = 25 + 'px serif';	
	this.painel.fillText(texto, x, y - 3);
}

function criarLaboratorio(laboratorio) {
	let tamanhoRetangulo = this.obterTamanhoRetangulo(laboratorio.alunos);
    let x = this.laboratorios.length * this.espacoLaboratorio;
    x += Math.abs(this.espacoLaboratorio - tamanhoRetangulo) / 2;
    let y = this.yLaboratorio;

    let height = tamanhoRetangulo;
    let width = tamanhoRetangulo;

    this.painel.fillStyle = this.corLaboratorio;
    this.painel.fillRect(x, y, width, height);	
	
	this.escrever(laboratorio.nome, x, y, 4);
	
    this.laboratorios.push(laboratorio.alunos);
}

function criarDisciplina(disciplina) {
	let tamanhoRetangulo = this.obterTamanhoRetangulo(disciplina.alunos);
    let x = (this.disciplinas % this.maximoDisciplinaPorLinha) * this.espacoDisciplina;	
    x += Math.abs(this.espacoDisciplina - tamanhoRetangulo) / 2;
	
    let y = this.yDisciplina;
	y += this.espacoDisciplina * Math.floor(this.disciplinas / this.maximoDisciplinaPorLinha);
	

    let height = tamanhoRetangulo;
    let width = tamanhoRetangulo;

    this.painel.fillStyle = this.corDisciplina;
    this.painel.fillRect(x, y, width, height);
	
    this.disciplinas++;
}

function obterPosicaoLaboratorio(indice) {
	return {
		x: indice * this.espacoLaboratorio,
		y: this.yLaboratorio
	};
}

function desenharSolucao(solucao) {
	for(let disciplina = 0; disciplina < solucao.length; disciplina++) {
		laboratorio = solucao[disciplina];
	}
}

class Canvas {
    constructor(canvasId, disciplinas, laboratorios) {
        // Selecionando painel canvas
        this.elemento = document.getElementById(canvasId);
		this.elemento.setAttribute('height', window.innerHeight * 0.97);
		this.elemento.setAttribute('width', window.innerWidth * 0.985);
        this.painel = this.elemento.getContext('2d');

        // Configuração para laboratório
        this.laboratorios = [];
        this.totalLaboratorios = (typeof(laboratorios) == 'object') ? laboratorios.length : laboratorios;
        this.espacoLaboratorio = this.elemento.width / this.totalLaboratorios;
        this.yLaboratorio = 625;        
        this.corLaboratorio = "blue";

        // Configuração para disciplina
        this.disciplinas = 0;
        this.maximoDisciplinaPorLinha = 10;
        this.totalDisciplinas = (typeof(disciplinas) == 'object') ? disciplinas.length : disciplinas;
        this.espacoDisciplina = this.elemento.width / this.maximoDisciplinaPorLinha;
        this.yDisciplina = 10;
        this.corDisciplina = "red";

        // Definindo funções
		this.escrever = escrever;
        this.criarDisciplina = criarDisciplina;
        this.criarLaboratorio = criarLaboratorio;
		this.obterTamanhoRetangulo = obterTamanhoRetangulo;
    }
}

var canvas = new Canvas('canvas', disciplinas, laboratorios);

for(let disciplina of disciplinas) {
    canvas.criarDisciplina(disciplina);
}

for(let laboratorio of laboratorios) {
    canvas.criarLaboratorio(laboratorio);
}