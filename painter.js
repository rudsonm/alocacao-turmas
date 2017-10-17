// parametros: disciplinas, laboratórios, número de aulas por semana, peso de recurso, peso de alunos
var instancia = new Instancia(disciplinas, laboratorios, 5, 2, 1);
var solucao = buscaConstrutiva(instancia);
console.log(solucao.qualidade, JSON.stringify(solucao.alocacoes), JSON.stringify(solucao.usoLaboratorios));
var solucaoTabu = buscaTabu(instancia, solucao);
console.log(solucaoTabu.qualidade, JSON.stringify(solucaoTabu.alocacoes), JSON.stringify(solucaoTabu.usoLaboratorios));
//console.log(obterQualidadeSolucao(solucaoTabu.alocacoes, instancia));

function criarLaboratorio(laboratorio) {
    let x = this.laboratorios * this.espacoLaboratorio;
    x += Math.abs(this.espacoLaboratorio - laboratorio.alunos) / 2;
    let y = this.yLaboratorio;

    let height = laboratorio.alunos;
    let width = laboratorio.alunos;

    this.painel.fillStyle = this.corLaboratorio;
    this.painel.fillRect(x, y, width, height);
    this.laboratorios++;
}

function criarDisciplina(disciplina) {
    let x = this.disciplinas * this.espacoDisciplina;
    //x *= Math.floor(this.totalDisciplinas / this.maximoDisciplinaPorLinha);
    x += Math.abs(this.espacoDisciplina - disciplina.alunos) / 2;
    let y = this.yDisciplina;

    let height = disciplina.alunos;
    let width = disciplina.alunos;

    this.painel.fillStyle = this.corDisciplina;
    this.painel.fillRect(x, y, width, height);
    this.disciplinas++;
}

class Canvas {
    constructor(canvasId, disciplinas, laboratorios) {
        // Selecionando painel canvas
        this.elemento = document.getElementById(canvasId);
        this.painel = this.elemento.getContext('2d');

        // Configuração para laboratório
        this.laboratorios = 0;
        this.totalLaboratorios = (typeof(laboratorios) == 'object') ? laboratorios.length : laboratorios;
        this.espacoLaboratorio = this.elemento.width / this.totalLaboratorios;
        this.yLaboratorio = 120;        
        this.corLaboratorio = "blue";

        // Configuração para disciplina
        this.disciplinas = 0;
        this.maximoDisciplinaPorLinha = 10;
        this.totalDisciplinas = (typeof(disciplinas) == 'object') ? disciplinas.length : disciplinas;
        this.espacoDisciplina = this.elemento.width / this.maximoDisciplinaPorLinha;
        this.yDisciplina = 10;
        this.corDisciplina = "red";

        // Definindo funções
        this.criarDisciplina = criarDisciplina;
        this.criarLaboratorio = criarLaboratorio;        
    }
}

var canvas = new Canvas('canvas', disciplinas, laboratorios);

for(let disciplina of disciplinas) {
    canvas.criarDisciplina(disciplina);
}

for(let laboratorio of laboratorios) {
    canvas.criarLaboratorio(laboratorio);
}