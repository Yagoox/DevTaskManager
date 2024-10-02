// backend/Services/IProjectService.cs

using System.Collections.Generic;
using System.Threading.Tasks;
using DevTaskManager.Models;

namespace DevTaskManager.Services
{
    public interface IProjectService
    {
        Task<Project> CreateProjectAsync(string name);
        Task<IEnumerable<ProjectDto>> GetAllProjectsAsync();
        Task<ProjectDto> GetProjectByIdAsync(int id);
        Task UpdateProjectAsync(int id, string name);
        Task DeleteProjectAsync(int id);
    }
}
