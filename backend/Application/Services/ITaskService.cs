using System.Collections.Generic;
using System.Threading.Tasks;
using DevTaskManager.Models;

namespace DevTaskManager.Services
{
    public interface ITaskService
    {
        Task<TaskItem> CreateTaskAsync(int projectId, string name, string status, string description);
        Task<TaskItem> GetTaskByIdAsync(int projectId, int taskId);
        Task<IEnumerable<TaskItem>> GetTasksAsync(int projectId);
        Task UpdateTaskAsync(int projectId, int taskId, string name, string status, string description);
        Task DeleteTaskAsync(int projectId, int taskId);
    }
}
