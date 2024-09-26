// backend/Services/ProjectService.cs
using DevTaskManager.Data;
using DevTaskManager.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevTaskManager.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects.Include(p => p.Tasks).ToListAsync();
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _context.Projects.Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Project> CreateProjectAsync(string name)
        {
            var project = new Project { Name = name };
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<bool> UpdateProjectAsync(int id, string name)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return false;
            }

            project.Name = name;
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return false;
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<TaskItem> CreateTaskAsync(int projectId, string name, string status)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null)
            {
                return null;
            }

            var task = new TaskItem
            {
                Name = name,
                Status = status,
                ProjectId = projectId
            };

            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> UpdateTaskAsync(int projectId, int taskId, string name, string status)
        {
            var task = await _context.TaskItems
                .FirstOrDefaultAsync(t => t.Id == taskId && t.ProjectId == projectId);
            if (task == null)
            {
                return false;
            }

            task.Name = name;
            task.Status = status;

            _context.TaskItems.Update(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int projectId, int taskId)
        {
            var task = await _context.TaskItems
                .FirstOrDefaultAsync(t => t.Id == taskId && t.ProjectId == projectId);
            if (task == null)
            {
                return false;
            }

            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
