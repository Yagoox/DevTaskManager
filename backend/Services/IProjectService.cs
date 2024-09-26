// backend/Services/IProjectService.cs
using DevTaskManager.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DevTaskManager.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        Task<Project> GetProjectByIdAsync(int id);
        Task<Project> CreateProjectAsync(string name);
        Task<bool> UpdateProjectAsync(int id, string name);
        Task<bool> DeleteProjectAsync(int id);

        Task<TaskItem> CreateTaskAsync(int projectId, string name, string status);
        Task<bool> UpdateTaskAsync(int projectId, int taskId, string name, string status);
        Task<bool> DeleteTaskAsync(int projectId, int taskId);
    }
}
