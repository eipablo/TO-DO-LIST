const inputTarefa = document.querySelector('#input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//* Função para criar um elemento <li>
function criaLi(){
    const li = document.createElement('li'); //* Cria um novo elemento <li>
    li.setAttribute('class', 'item-tarefa'); //* Adiciona uma classe ao <li> para estilização
    return li; //* Retorna o elemento <li> criado
}

//* Adiciona um evento de 'keypress' ao input de tarefa
inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) { //* Verifica se a tecla pressionada é Enter
        if(!inputTarefa.value) return; //* Verifica se o campo de entrada está vazio
        criaTarefa(inputTarefa.value); //* Cria a tarefa com o valor do input
    }
});

function limpaInput() {
    inputTarefa.value = ''; //* Limpa o campo de entrada após adicionar a tarefa
    inputTarefa.focus(); //* Foca novamente no campo de entrada
}

//* Função para criar o botão de apagar
function criaBotaoApagar(li){
    li.innerText += ' '; //* Adiciona um espaço entre o texto da tarefa e o botão de apagar
    const botaoApagar = document.createElement('button'); //* Cria um botão para apagar a tarefa
    botaoApagar.setAttribute('class', 'fa fa-trash apagar'); //* Adiciona classes do FontAwesome para o ícone de lixeira
    botaoApagar.setAttribute('title', 'apagar esta tarefa'); //* Adiciona um título ao botão
    li.appendChild(botaoApagar); //* Adiciona o botão de apagar ao <li>
}


//* Função para criar uma tarefa
function criaTarefa(texto){
    const li =criaLi(); //* Cria um novo elemento <li>
    li.innerText = texto; //* Define o texto do <li> como o valor passado
    tarefas.appendChild(li); //* Adiciona o <li> à lista de tarefas
    limpaInput(); //* Limpa o campo de entrada
    criaBotaoApagar(li); //* Cria o botão de apagar para a tarefa
    salvarTarefas(); //* Chama a função para salvar as tarefas no localStorage
}

//* Adiciona um evento de clique ao botão de tarefa
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return; //* Verifica se o campo de entrada está vazio 
    //* Se não estiver vazio, cria a tarefa
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target; //* Obtém o elemento que foi clicado
    if(el.classList.contains('apagar')){ //* Verifica se o elemento clicado tem a classe 'apagar'
        el.parentElement.remove(); //* Remove o elemento pai do botão de apagar (o <li>)
        salvarTarefas(); //* Chama a função para salvar as tarefas no localStorage
    }

});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li'); //* seleciona todos os elementos <li> dentro da lista de tarefas
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText; //* Obtém o texto de cada tarefa
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //* Remove o texto 'Apagar' e espaços extras
        listaDeTarefas.push(tarefaTexto); //* Adiciona o texto da tarefa
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //* Converte a lista de tarefas em uma string JSON
    localStorage.setItem('tarefas', tarefasJSON); //* Salva a string JSON no localStorage
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas'); //* Obtém as tarefas salvas no localStorage
    const listaDeTarefas = JSON.parse(tarefas); //* Converte a string JSON de volta para um array

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa); //* Cria cada tarefa a partir do array
    }
}

addTarefasSalvas(); //* Chama a função para adicionar as tarefas salvas ao carregar a página

