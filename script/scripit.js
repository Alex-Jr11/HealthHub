//SEÇÕES
function showContent(sectionId) {
    //Oculta todas as seções
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    //Mostra a seção selecionada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}
//==================================================================================================================================
//FUNÇÃO PARA ABRIR/FECHAR O MENU LATERAL
function openClosemenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('active');
}
//==================================================================================================================================
//FUNÇÃO PARA ADICIONAR INTERAÇÃO COM A TABELA DE LEMBRETES
document.getElementById('addReminderForm').addEventListener('submit', function(event) {
    event.preventDefault(); //Impede o envio do formulário

    const reminderInput = document.getElementById('reminderInput');
    const reminderText = reminderInput.value.trim();

    if (reminderText === "") return; //Impede lembretes vazios

    addReminder(reminderText); //Adiciona o lembrete à tabela
    reminderInput.value = ""; //Limpa o campo de entrada
});

function addReminder(reminderText) {
    const table = document.getElementById('reminderTable');
    const tableBody = table.querySelector('tbody');

    //Mostra a tabela se ela estiver oculta
    table.style.display = 'table';

    //Cria uma nova linha
    const row = document.createElement('tr');

    //Coluna do lembrete
    const reminderCell = document.createElement('td');
    reminderCell.textContent = reminderText;

    //Coluna do status
    const statusCell = document.createElement('td');
    statusCell.textContent = "Pendente";

    //Coluna de ações
    const actionsCell = document.createElement('td');

    //Botão de concluir
    const completeButton = document.createElement('button');
    completeButton.textContent = "Concluir";
    completeButton.classList.add('complete');
    completeButton.addEventListener('click', function() {
        if (!row.classList.contains('completed')) {
            row.classList.add('completed');
            statusCell.textContent = "Concluído";
        } else {
            row.classList.remove('completed');
            statusCell.textContent = "Pendente";
        }
    });

    //Botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        tableBody.removeChild(row);
        checkTableVisibility(); //Verifica se ainda há lembretes na tabela
    });

    actionsCell.appendChild(completeButton);
    actionsCell.appendChild(deleteButton);

    //Adiciona as células na linha
    row.appendChild(reminderCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);

    //Adiciona a linha na tabela
    tableBody.appendChild(row);
}

function checkTableVisibility() {
    const table = document.getElementById('reminderTable');
    const tableBody = table.querySelector('tbody');

    //Oculta a tabela se não houver mais lembretes
    if (tableBody.children.length === 0) {
        table.style.display = 'none';
    }
}
//==================================================================================================================================
//TABELA DE REGISTROS
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const activity = row.cells[1].textContent;
        const duration = row.cells[2].textContent;
        
        const newActivity = prompt("Atualize a atividade:", activity);
        const newDuration = prompt("Atualize a duração:", duration);

        if (newActivity) row.cells[1].textContent = newActivity;
        if (newDuration) row.cells[2].textContent = newDuration;
    });
});
//==================================================================================================================================
//TABELA DE MEDITAÇÃO
//Adiciona evento ao formulário de meditação
document.getElementById('meditationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('meditationDate').value;
    const duration = document.getElementById('meditationDuration').value.trim();
    const notes = document.getElementById('meditationNotes').value.trim();

    if (date === "" || duration === "") return;

    addMeditationSession(date, duration, notes);

    //Limpa os campos do formulário
    document.getElementById('meditationDate').value = "";
    document.getElementById('meditationDuration').value = "";
    document.getElementById('meditationNotes').value = "";
});

//Função para adicionar sessão de meditação à tabela
function addMeditationSession(date, duration, notes) {
    const tableBody = document.getElementById('meditationTable').querySelector('tbody');
    
    const newRow = document.createElement('tr');

    //Coluna: Data
    const dateCell = document.createElement('td');
    dateCell.textContent = date;

    //Coluna: Duração
    const durationCell = document.createElement('td');
    durationCell.textContent = duration;

    //Coluna: Observações
    const notesCell = document.createElement('td');
    notesCell.textContent = notes || "N/A";

    //Coluna: Ações
    const actionsCell = document.createElement('td');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
        newRow.remove();
    });

    actionsCell.appendChild(deleteButton);

    //Adiciona colunas à nova linha
    newRow.appendChild(dateCell);
    newRow.appendChild(durationCell);
    newRow.appendChild(notesCell);
    newRow.appendChild(actionsCell);

    //Adiciona a nova linha ao corpo da tabela
    tableBody.appendChild(newRow);
}
//==================================================================================================================================
//BOTÃO DE SAIR
function toggleMenu() {
    const menu = document.getElementById("side-menu");
    if (menu.style.left === "0px") {
        menu.style.left = "-250px";
    } else {
        menu.style.left = "0px";
    }
}
function sair() {
    const confirmacao = confirm("Tem certeza de que deseja sair?");
    if (confirmacao) {
        setTimeout(() => {
            alert("Até logo! Bye!");
            window.close(); //Fecha a aba/janela atual
        }, 1000); //Aguarda 1 segundo antes de fechar a página
    } else {
        alert("Você decidiu ficar! 😄");
    }
}
//Vincula a função ao clique do botão de sair
document.getElementById("btnSair").addEventListener("click", sair);