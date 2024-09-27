// backend/Services/ProjectService.cs

using System.Collections.Generic;
using System.Threading.Tasks;
using DevTaskManager.Models;
using Microsoft.EntityFrameworkCore;

namespace DevTaskManager.Services
{
    public class ProjectService : IProjectService
    {
        private readonly DevTaskManagerContext _context;

        public ProjectService(DevTaskManagerContext context)
        {
            _context = context;
        }

        public async Task<Project> CreateProjectAsync(string name)
        {
            var project = new Project
            {
                Name = name
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects
                .Include(p => p.Tasks) // Inclui as tarefas relacionadas
                .ToListAsync();
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Tasks) // Inclui as tarefas relacionadas
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

            return project;
        }

        public async Task UpdateProjectAsync(int id, string name)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

            project.Name = name;
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}
