document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Função assíncrona para buscar as tarefas do servidor
    const fetchTasks = async () => {
        // Faz uma requisição GET para a rota '/tasks'
        const res = await fetch('/tasks');
        // Converte a resposta para JSON
        const tasks = await res.json();
        // Limpa a lista de tarefas atual
        taskList.innerHTML = '';
        // Itera sobre cada tarefa recebida
        tasks.forEach(task => {
            // Cria um novo elemento de lista para cada tarefa
            const li = document.createElement('li');
            // Define o texto do elemento de lista como o título da tarefa
            li.textContent = task.title;
            // Adiciona o elemento de lista à lista de tarefas
            taskList.appendChild(li);
        });
    };

    // Adiciona um evento de 'submit' ao formulário de tarefas
    taskForm.addEventListener('submit', async (e) => {
        // Previne o comportamento padrão do formulário (recarregar a página)
        e.preventDefault();
        // Obtém o valor do campo de título pelo seu ID
        const title = document.getElementById('title').value;
        // Obtém o valor do campo de descrição pelo seu ID
        const description = document.getElementById('description').value;

        // Faz uma requisição POST para a rota '/tasks' com os dados da nova tarefa
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Converte os dados da nova tarefa para JSON
            body: JSON.stringify({ title, description })
        });

        // Após adicionar a nova tarefa, busca novamente todas as tarefas para atualizar a lista
        fetchTasks();
        // Reseta o formulário de tarefas
        taskForm.reset();
    });

    // Busca as tarefas do servidor quando a página é carregada pela primeira vez
    fetchTasks();
});
