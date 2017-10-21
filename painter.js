function obterTamanhoRetangulo(alunos) {
	return alunos * 3;
}

function escrever(texto, x, y, fontSize = 25) {
	this.painel.fillStyle = "black";
	this.painel.font = fontSize + 'px serif';	
	this.painel.fillText(texto, x, y - 3);
}

function criarLaboratorio(laboratorio) {
	let tamanhoRetangulo = this.obterTamanhoRetangulo(laboratorio.alunos);
    let x = (this.laboratorios.length % this.maximoLaboratorioPorLinha) * this.espacoLaboratorio;
    x += Math.abs(this.espacoLaboratorio - tamanhoRetangulo) / 2;

    let y = this.yLaboratorio;
    y += this.espacoLaboratorio * Math.floor(this.laboratorios.length / this.maximoLaboratorioPorLinha);
    this.escrever(laboratorio.nome, x, y + 10);
    y += Math.abs(this.espacoLaboratorio - tamanhoRetangulo) / 2;

    let height = tamanhoRetangulo;
    let width = tamanhoRetangulo;

    this.painel.fillStyle = this.cores[this.laboratorios.length];
    this.painel.fillRect(x, y, width, height);	
	
    this.laboratorios.push(laboratorio.alunos);
}

function criarDisciplina(disciplina) {
	let tamanhoRetangulo = this.obterTamanhoRetangulo(disciplina.alunos);
    let x = (this.disciplinas.length % this.maximoDisciplinaPorLinha) * this.espacoDisciplina;    
    x += Math.abs(this.espacoDisciplina - tamanhoRetangulo) / 2;
    
    let y = this.yDisciplina;
	y += this.espacoDisciplina * Math.floor(this.disciplinas.length / this.maximoDisciplinaPorLinha);
    this.escrever("Alunos: ".concat(disciplina.alunos), x, y + 10, 15);
    y += Math.abs(this.espacoDisciplina - tamanhoRetangulo) / 2;    

    let height = tamanhoRetangulo;
    let width = tamanhoRetangulo;

    this.painel.fillStyle = this.corDisciplina;
    this.painel.fillRect(x, y, width, height);
	
    this.disciplinas.push(disciplina.alunos);
}

function obterPosicaoDisciplina(indice) {
    let tamanhoRetangulo = this.obterTamanhoRetangulo(this.disciplinas[indice]);
	return {
		x: (indice % this.maximoDisciplinaPorLinha) * this.espacoDisciplina,
		y: this.yDisciplina + this.espacoDisciplina * Math.floor(indice / this.maximoDisciplinaPorLinha)
	};
}

function desenharSolucao(solucao) {
	for(let disciplina = 0; disciplina < solucao.length; disciplina++) {
        let laboratorio = solucao[disciplina];
        let cor = this.cores[laboratorio];

        let tamanhoRetangulo = obterTamanhoRetangulo(this.laboratorios[laboratorio]);
        let posicao = this.obterPosicaoDisciplina(disciplina);
        posicao.x += Math.abs(this.espacoDisciplina - tamanhoRetangulo) / 2;
        posicao.y += Math.abs(this.espacoDisciplina - tamanhoRetangulo) / 2;

        this.painel.lineWidth = 2;
        this.painel.strokeStyle = cor;        
        this.painel.strokeRect(posicao.x, posicao.y, tamanhoRetangulo, tamanhoRetangulo);
	}
}

class Canvas {
    constructor(canvasId, disciplinas, laboratorios) {
        // Selecionando painel canvas
        this.elemento = document.getElementById(canvasId);
		this.elemento.setAttribute('height', window.innerHeight * 0.97);
		this.elemento.setAttribute('width', window.innerWidth * 0.985);
        this.painel = this.elemento.getContext('2d');

        this.cores = [
            "#1abc9c",
            "#f1c40f",
            "#3498db",
            "#e74c3c",
            "#9b59b6",
            "#34495e",
            "#7f8c8d",
            "#27ae60",
            "#d35400",
            "#2980b9",
            "#803F15"
        ].sort( (a, b) => .5 - Math.random() );

        // Configuração para laboratório
        this.laboratorios = [];
        this.maximoLaboratorioPorLinha = 6;
        this.totalLaboratorios = (typeof(laboratorios) == 'object') ? laboratorios.length : laboratorios;
        this.espacoLaboratorio = this.elemento.width / this.totalLaboratorios;
        this.yLaboratorio = 20;

        // Configuração para disciplina
        this.disciplinas = [];
        this.maximoDisciplinaPorLinha = 10;
        this.totalDisciplinas = (typeof(disciplinas) == 'object') ? disciplinas.length : disciplinas;
        this.espacoDisciplina = this.elemento.width / this.maximoDisciplinaPorLinha;
        this.yDisciplina = 290;
        this.corDisciplina = "#bdc3c7";

        // Definindo funções
		this.escrever = escrever;
        this.criarDisciplina = criarDisciplina;
        this.criarLaboratorio = criarLaboratorio;
        this.obterTamanhoRetangulo = obterTamanhoRetangulo;
        this.obterPosicaoDisciplina = obterPosicaoDisciplina;
        this.desenharSolucao = desenharSolucao;
    }
}

var canvas = new Canvas('canvas', disciplinas, laboratorios);

for(let disciplina of disciplinas)
    canvas.criarDisciplina(disciplina);

for(let laboratorio of laboratorios)
    canvas.criarLaboratorio(laboratorio);

var solucao = buscaConstrutiva(instancia);
console.log(solucao.qualidade, JSON.stringify(solucao.alocacoes), JSON.stringify(solucao.usoLaboratorios));
var solucaoTabu = buscaTabu(instancia, solucao, 50, canvas);
console.log(solucaoTabu.qualidade, JSON.stringify(solucaoTabu.alocacoes), JSON.stringify(solucaoTabu.usoLaboratorios));

canvas.desenharSolucao(solucaoTabu.alocacoes);