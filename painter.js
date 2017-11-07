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
    // x += Math.abs(this.espacoLaboratorio - tamanhoRetangulo) / 2;
    x += this.espacoLaboratorio / 2;

    let y = this.yLaboratorio;
    y += this.espacoLaboratorio * Math.floor(this.laboratorios.length / this.maximoLaboratorioPorLinha);
    this.escrever(laboratorio.nome, x, y + 10);
    y += this.espacoLaboratorio / 2;
    // y += Math.abs(this.espacoLaboratorio - tamanhoRetangulo) / 2;

    let height = tamanhoRetangulo;
    let width = tamanhoRetangulo;
    
    this.painel.beginPath();
    this.painel.arc(x, y, tamanhoRetangulo / 2, 0, 2*Math.PI);    
    this.painel.fillStyle = this.cores[this.laboratorios.length];
    this.painel.fill();

    this.laboratorios.push(laboratorio.alunos);
}

function criarDisciplina(disciplina) {
	let tamanhoRetangulo = this.obterTamanhoRetangulo(disciplina.alunos);
    let x = (this.disciplinas.length % this.maximoDisciplinaPorLinha) * this.espacoDisciplina;    
    x += Math.abs(this.espacoDisciplina - tamanhoRetangulo) / 2;
    
    let y = this.yDisciplina;
	y += this.espacoDisciplina * Math.floor(this.disciplinas.length / this.maximoDisciplinaPorLinha);
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
        this.alocarDisciplinaEmLaboratorio(disciplina, laboratorio);
	}
}

function alocarDisciplinaEmLaboratorio(disciplina, laboratorio) {
    let posicao = this.obterPosicaoDisciplina(disciplina);

    // limpa espaco da disciplina
    this.painel.fillStyle = "white";
    this.painel.fillRect(posicao.x, posicao.y, this.espacoDisciplina, this.espacoDisciplina);
    
    // desenha laboratório
    let tamanhoRetLaboratorio = this.obterTamanhoRetangulo(this.laboratorios[laboratorio]);
    // x = posicao.x + Math.abs(this.espacoDisciplina - tamanhoRetLaboratorio) / 2;
    // y = posicao.y + Math.abs(this.espacoDisciplina - tamanhoRetLaboratorio) / 2;
    // this.painel.lineWidth = 2;
    // this.painel.strokeStyle = this.cores[laboratorio];
    // this.painel.strokeRect(x, y, tamanhoRetLaboratorio, tamanhoRetLaboratorio);

    let x = posicao.x + this.espacoDisciplina / 2;
    let y = posicao.y + this.espacoDisciplina / 2;
    this.painel.beginPath();
    this.painel.arc(x, y, tamanhoRetLaboratorio / 2, 0, 2*Math.PI);    
    this.painel.fillStyle = this.cores[laboratorio];
    this.painel.fill();

    // desenha disciplina
    // this.escrever("Alunos: ".concat(this.disciplinas[disciplina]), posicao.x, posicao.y + 10, 15);
    let tamanhoRetDisciplina = this.obterTamanhoRetangulo(this.disciplinas[disciplina]);
    // let x = posicao.x + Math.abs(this.espacoDisciplina - tamanhoRetDisciplina) / 2;
    // let y = posicao.y + Math.abs(this.espacoDisciplina - tamanhoRetDisciplina) / 2;
    // this.painel.fillStyle = this.corDisciplina;
    // this.painel.fillRect(x, y, tamanhoRetDisciplina, tamanhoRetDisciplina);
    
    x = posicao.x + this.espacoDisciplina / 2;
    y = posicao.y + this.espacoDisciplina / 2;
    this.painel.beginPath();
    this.painel.arc(x, y, tamanhoRetDisciplina / 2, 0, 2*Math.PI);
    this.painel.lineWidth = 3;
    this.painel.strokeStyle = this.corDisciplina;
    this.painel.stroke();    
}

function obterPosicaoPonto(ponto, indice) {
    let max = this.max - this.min;
    let med = ponto - this.min;
    let proporcao = med / max;
    return {
        x: this.xGrafico + 15 * indice,
        y: this.yGrafico + this.heightGrafico - 5 - ((this.heightGrafico - 10) * proporcao)
    }
}

function desenharGrafico() {
    this.painel.fillStyle = "white";
    this.painel.fillRect(this.xGrafico, this.yGrafico, this.widthGrafico, this.heightGrafico);
    this.painel.strokeStyle = "black";
    this.painel.strokeRect(this.xGrafico, this.yGrafico, this.widthGrafico, this.heightGrafico);
    for(let i = 1; i < this.pontos.length; i++) {
        let posicao = this.obterPosicaoPonto(this.pontos[i], i);

        this.painel.beginPath();
        let posicaoAnterior = this.obterPosicaoPonto(this.pontos[i - 1], i - 1);            
        this.painel.moveTo(posicaoAnterior.x, posicaoAnterior.y);
        this.painel.lineTo(posicao.x, posicao.y);

        let cor = (posicaoAnterior.y > posicao.y) ? "red" : "green";
        this.painel.strokeStyle = cor;
        this.painel.stroke();
    }
}

function adicionarPonto(ponto) {    
    this.pontos.push(ponto);
    if(this.pontos.length > 41)
        this.pontos.shift();
    this.min = this.pontos.reduce( (a, b) => Math.min(a, b) );
    let candidatoMax = this.pontos.reduce( (a, b) => Math.max(a, b) );
    this.max = Math.max(this.max, candidatoMax);

    this.desenharGrafico();
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

        // Configuração para gráfico
        this.xGrafico = this.elemento.width - (this.maximoLaboratorioPorLinha -1) * this.espacoLaboratorio;
        this.yGrafico = 10;
        this.widthGrafico = this.elemento.width - 10 - this.xGrafico;
        this.heightGrafico = this.espacoLaboratorio * 2;
        this.pontos = new Array();
        this.min = 0;
        this.max = -Infinity;

        // Definindo funções
		this.escrever = escrever;
        this.criarDisciplina = criarDisciplina;
        this.criarLaboratorio = criarLaboratorio;
        this.obterTamanhoRetangulo = obterTamanhoRetangulo;
        this.obterPosicaoDisciplina = obterPosicaoDisciplina;
        this.desenharSolucao = desenharSolucao;
        this.alocarDisciplinaEmLaboratorio = alocarDisciplinaEmLaboratorio;
        this.obterPosicaoPonto = obterPosicaoPonto;
        this.desenharGrafico = desenharGrafico;        
        this.adicionarPonto = adicionarPonto;
    }
}

var canvas = new Canvas('canvas', disciplinas, laboratorios);

for(let disciplina of disciplinas)
    canvas.criarDisciplina(disciplina);

for(let laboratorio of laboratorios)
    canvas.criarLaboratorio(laboratorio);


var solucao = buscaConstrutiva(instancia);
alert(solucao.qualidade);
// var solucaoAleatoria = caminhadaAleatoria(instancia, null, canvas);

var solucaoIterada = buscaIterada(instancia, solucao, canvas);

var solucaoTabu = buscaTabu(instancia, solucao, 50, canvas);