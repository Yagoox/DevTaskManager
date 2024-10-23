using System.Collections.Generic;
using System.Threading.Tasks;
using DevTaskManager.Models;
using Microsoft.EntityFrameworkCore;
using DevTaskManager.Data;

namespace DevTaskManager.Services
{
    /**
     * Serviço responsável por gerenciar operações relacionadas a tarefas.
     * Isso inclui criar, atualizar, excluir e recuperar tarefas.
     */
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        /**
         * Construtor do TaskService.
         * 
         * @param context O contexto do banco de dados utilizado para operações de persistência.
         */
        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        /**
         * Cria uma nova tarefa associada a um projeto.
         * 
         * @param projectId O ID do projeto ao qual a tarefa será associada.
         * @param name O nome da tarefa.
         * @param status O status da tarefa.
         * @return A tarefa recém-criada.
         * @throws KeyNotFoundException Se o projeto não for encontrado.
         */
        public async Task<TaskItem> CreateTaskAsync(int projectId, string name, string status, string description)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

            var task = new TaskItem
            {
                Name = name,
                Status = status,
                Description = description,
                ProjectId = projectId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

        /**
         * Recupera uma tarefa específica associada a um projeto.
         * 
         * @param projectId O ID do projeto.
         * @param taskId O ID da tarefa.
         * @return A tarefa correspondente ao ID fornecido.
         * @throws KeyNotFoundException Se a tarefa ou projeto não forem encontrados.
         */
        public async Task<TaskItem> GetTaskByIdAsync(int projectId, int taskId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.ProjectId == projectId && t.Id == taskId);
            if (task == null)
            {
                throw new KeyNotFoundException("Tarefa não encontrada.");
            }
            return task;
        }

        /**
         * Recupera todas as tarefas associadas a um projeto.
         * 
         * @param projectId O ID do projeto.
         * @return Uma lista de tarefas associadas ao projeto.
         * @throws KeyNotFoundException Se o projeto não for encontrado.
         */
        public async Task<IEnumerable<TaskItem>> GetTasksAsync(int projectId)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);
            if (!projectExists)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

            return await _context.Tasks.Where(t => t.ProjectId == projectId).ToListAsync();
        }

        /**
         * Atualiza uma tarefa existente em um projeto.
         * 
         * @param projectId O ID do projeto.
         * @param taskId O ID da tarefa.
         * @param name O novo nome da tarefa.
         * @param status O novo status da tarefa.
         * @throws KeyNotFoundException Se a tarefa ou projeto não forem encontrados.
         */
        public async Task UpdateTaskAsync(int projectId, int taskId, string name, string status, string description)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.ProjectId == projectId && t.Id == taskId);
            if (task == null)
            {
                throw new KeyNotFoundException("Tarefa não encontrada.");
            }

            task.Name = name;
            task.Status = status;
            task.Description = description;

            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        /**
         * Exclui uma tarefa existente de um projeto.
         * 
         * @param projectId O ID do projeto.
         * @param taskId O ID da tarefa.
         * @throws KeyNotFoundException Se a tarefa ou projeto não forem encontrados.
         */
        public async Task DeleteTaskAsync(int projectId, int taskId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.ProjectId == projectId && t.Id == taskId);
            if (task == null)
            {
                throw new KeyNotFoundException("Tarefa não encontrada.");
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}
