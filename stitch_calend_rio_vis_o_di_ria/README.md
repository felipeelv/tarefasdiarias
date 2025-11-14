# Aplicativo de Tarefas Diárias

Aplicativo completo de gerenciamento de tarefas com múltiplas visualizações e funcionalidades interativas.

## Funcionalidades Implementadas

### ✅ Visão Diária do Calendário
- Navegação entre meses (setas anterior/próximo)
- Seleção de datas no calendário
- Visualização de tarefas por data selecionada
- Filtros por categoria (Todas as Listas, Trabalho, Pessoal, Estudos)
- Marcar tarefas como concluídas
- Criar novas tarefas (botão FAB)
- Indicadores visuais de tarefas nos dias do calendário

### ✅ Painel Kanban
- Visualização de tarefas em colunas (A fazer, Em andamento, Concluído)
- Drag and drop para mover tarefas entre colunas
- Contadores de tarefas por coluna
- Criar novas tarefas
- Visualização de prioridades e datas

### ✅ Detalhes da Tarefa
- Edição de título e descrição em tempo real
- Alteração de prioridade (Baixa, Média, Alta)
- Visualização de data de vencimento
- Sistema de comentários
- Exclusão de tarefas

### ✅ Configurações
- Modo escuro/claro (toggle funcional)
- Navegação entre seções
- Botões de ação (Sair, Excluir Conta)

## Como Usar

1. Abra o arquivo `calendário/visão_diária/code.html` no navegador
2. Todas as funcionalidades estão ativas e funcionando
3. Os dados são salvos automaticamente no localStorage do navegador

## Estrutura de Arquivos

```
stitch_calend_rio_vis_o_di_ria/
├── app.js                          # Sistema principal de gerenciamento
├── calendário/
│   └── visão_diária/
│       └── code.html               # Tela principal do calendário
├── painel_de_tarefas/
│   └── code.html                   # Visualização Kanban
├── detalhes_da_tarefa/
│   └── code.html                   # Detalhes e edição de tarefas
└── configurações_do_aplicativo/
    └── code.html                   # Configurações do app
```

## Funcionalidades Técnicas

- **Armazenamento**: localStorage para persistência de dados
- **Navegação**: Sistema de navegação entre telas
- **Estado**: Gerenciamento centralizado de tarefas
- **Modo Escuro**: Persistência da preferência do usuário
- **Responsivo**: Interface adaptável a diferentes tamanhos de tela

## Notas

- Os dados são salvos localmente no navegador
- Para limpar os dados, use o console do navegador: `localStorage.clear()`
- O modo escuro é salvo e aplicado automaticamente em todas as telas


