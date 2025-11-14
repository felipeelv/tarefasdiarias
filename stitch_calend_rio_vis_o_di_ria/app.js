// Sistema de Gerenciamento de Tarefas
class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentView = 'calendar';
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.filterCategory = 'all';
    this.init();
  }

  init() {
    this.setupDarkMode();
    this.setupNavigation();
    this.setupEventListeners();
    this.render();
  }

  // LocalStorage
  loadTasks() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      return JSON.parse(stored);
    }
    // Tarefas de exemplo
    return [
      {
        id: '1',
        title: 'Reunião de alinhamento com a equipe',
        description: '',
        date: new Date(2024, 7, 24).toISOString(),
        time: '10:00 - 11:00',
        category: 'Trabalho',
        priority: 'média',
        status: 'todo',
        completed: false
      },
      {
        id: '2',
        title: 'Finalizar relatório mensal',
        description: '',
        date: new Date(2024, 7, 24).toISOString(),
        time: '14:00',
        category: 'Trabalho',
        priority: 'alta',
        status: 'done',
        completed: true
      },
      {
        id: '3',
        title: 'Consulta com dentista',
        description: '',
        date: new Date(2024, 7, 24).toISOString(),
        time: '16:30',
        category: 'Pessoal',
        priority: 'média',
        status: 'todo',
        completed: false
      },
      {
        id: '4',
        title: 'Finalizar protótipo da tela inicial',
        description: 'Adicionar componentes de navegação e rodapé.',
        date: new Date().toISOString(),
        category: 'Trabalho',
        priority: 'alta',
        status: 'todo',
        completed: false
      },
      {
        id: '5',
        title: 'Revisar feedback do cliente',
        description: 'Analisar os pontos levantados na última reunião.',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Trabalho',
        priority: 'média',
        status: 'todo',
        completed: false
      },
      {
        id: '6',
        title: 'Desenvolver a UI da página de login',
        description: '',
        date: new Date().toISOString(),
        category: 'Trabalho',
        priority: 'alta',
        status: 'in-progress',
        completed: false
      },
      {
        id: '7',
        title: 'Configurar o ambiente de desenvolvimento',
        description: '',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Estudos',
        priority: 'baixa',
        status: 'done',
        completed: true
      }
    ];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Gerenciamento de Tarefas
  addTask(task) {
    const newTask = {
      id: Date.now().toString(),
      title: task.title || 'Nova Tarefa',
      description: task.description || '',
      date: task.date || new Date().toISOString(),
      time: task.time || '',
      category: task.category || 'Trabalho',
      priority: task.priority || 'média',
      status: task.status || 'todo',
      completed: false,
      comments: []
    };
    this.tasks.push(newTask);
    this.saveTasks();
    this.render();
    return newTask;
  }

  updateTask(id, updates) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updates };
      this.saveTasks();
      this.render();
      return this.tasks[index];
    }
    return null;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
    this.render();
  }

  toggleTaskComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      if (task.completed) {
        task.status = 'done';
      }
      this.saveTasks();
      this.render();
    }
  }

  // Filtros
  getTasksByDate(date) {
    const dateStr = new Date(date).toDateString();
    return this.tasks.filter(task => {
      const taskDate = new Date(task.date).toDateString();
      return taskDate === dateStr;
    });
  }

  getTasksByCategory(category) {
    if (category === 'all') return this.tasks;
    return this.tasks.filter(task => task.category === category);
  }

  getTasksByStatus(status) {
    return this.tasks.filter(task => task.status === status);
  }

  // Modo Escuro
  setupDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    
    // Atualizar todos os checkboxes de modo escuro na página
    document.querySelectorAll('input[type="checkbox"][data-dark-mode-toggle]').forEach(checkbox => {
      checkbox.checked = isDark;
    });
  }

  // Navegação
  setupNavigation() {
    // Navegação entre páginas
    window.navigateTo = (page) => {
      const currentPath = window.location.pathname;
      let basePath = '';
      
      // Determinar o caminho base
      if (currentPath.includes('calendário/visão_diária')) {
        basePath = '../../';
      } else if (currentPath.includes('painel_de_tarefas')) {
        basePath = '../';
      } else if (currentPath.includes('detalhes_da_tarefa')) {
        basePath = '../';
      } else if (currentPath.includes('configurações_do_aplicativo')) {
        basePath = '../';
      } else {
        basePath = 'stitch_calend_rio_vis_o_di_ria/';
      }
      
      const pages = {
        'calendar': 'calendário/visão_diária/code.html',
        'tasks': 'painel_de_tarefas/code.html',
        'settings': 'configurações_do_aplicativo/code.html',
        'task-detail': 'detalhes_da_tarefa/code.html'
      };
      
      if (pages[page]) {
        window.location.href = basePath + pages[page];
      }
    };

    // Botão voltar
    const backButtons = document.querySelectorAll('[data-back]');
    backButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.navigateTo('calendar');
        }
      });
    });
  }

  // Event Listeners globais
  setupEventListeners() {
    // FAB para criar tarefa
    document.addEventListener('click', (e) => {
      if (e.target.closest('.fab-add-task')) {
        this.showTaskForm();
      }
    });

    // Toggle modo escuro
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-dark-mode-toggle]')) {
        this.toggleDarkMode();
      }
    });
  }

  // Renderização
  render() {
    // Será sobrescrito por cada página específica
  }

  // Formulário de Tarefa
  showTaskForm(task = null) {
    const isEdit = !!task;
    const form = document.createElement('div');
    form.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4';
    form.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          ${isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h2>
        <form id="task-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Título</label>
            <input type="text" name="title" value="${task?.title || ''}" 
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Descrição</label>
            <textarea name="description" rows="3"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white">${task?.description || ''}</textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Data</label>
            <input type="date" name="date" value="${task ? new Date(task.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Hora</label>
            <input type="time" name="time" value="${task?.time?.split(' - ')[0] || ''}"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Categoria</label>
            <select name="category"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="Trabalho" ${task?.category === 'Trabalho' ? 'selected' : ''}>Trabalho</option>
              <option value="Pessoal" ${task?.category === 'Pessoal' ? 'selected' : ''}>Pessoal</option>
              <option value="Estudos" ${task?.category === 'Estudos' ? 'selected' : ''}>Estudos</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Prioridade</label>
            <select name="priority"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="baixa" ${task?.priority === 'baixa' ? 'selected' : ''}>Baixa</option>
              <option value="média" ${task?.priority === 'média' ? 'selected' : ''}>Média</option>
              <option value="alta" ${task?.priority === 'alta' ? 'selected' : ''}>Alta</option>
            </select>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="button" class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onclick="this.closest('.fixed').remove()">
              Cancelar
            </button>
            <button type="submit" class="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90">
              ${isEdit ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(form);

    form.querySelector('#task-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        date: new Date(formData.get('date')).toISOString(),
        time: formData.get('time') || '',
        category: formData.get('category'),
        priority: formData.get('priority')
      };

      if (isEdit) {
        this.updateTask(task.id, taskData);
      } else {
        this.addTask(taskData);
      }
      form.remove();
    });

    // Fechar ao clicar fora
    form.addEventListener('click', (e) => {
      if (e.target === form) {
        form.remove();
      }
    });
  }
}

// Instância global
const taskManager = new TaskManager();
window.taskManager = taskManager;

