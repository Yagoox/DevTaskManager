// backend/Services/TaskService.cs

using System.Collections.Generic;
using System.Threading.Tasks;
using DevTaskManager.Models;
using Microsoft.EntityFrameworkCore;

namespace DevTaskManager.Services
{
    public class TaskService : ITaskService
    {
        private readonly DevTaskManagerContext _context;

        public TaskService(DevTaskManagerContext context)
        {
            _context = context;
        }

        public async Task<TaskItem> CreateTaskAsync(int projectId, string name, string status)
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
                ProjectId = projectId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

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

        public async Task<IEnumerable<TaskItem>> GetTasksAsync(int projectId)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);
            if (!projectExists)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

            return await _context.Tasks.Where(t => t.ProjectId == projectId).ToListAsync();
        }

        public async Task UpdateTaskAsync(int projectId, int taskId, string name, string status)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.ProjectId == projectId && t.Id == taskId);
            if (task == null)
            {
                throw new KeyNotFoundException("Tarefa não encontrada.");
            }

            task.Name = name;
            task.Status = status;

            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

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