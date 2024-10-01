// backend/Services/ProjectService.cs

using System.Collections.Generic;
using System.Linq; // Importante para usar o LINQ
using System.Threading.Tasks;
using DevTaskManager.Models;
using Microsoft.EntityFrameworkCore;
using DevTaskManager.Data;

namespace DevTaskManager.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
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

        public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
        {
            var projects = await _context.Projects
                .Include(p => p.Tasks)
                .ToListAsync();

            // Mapear os projetos para ProjectDto
            var projectDtos = projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Tasks = p.Tasks.Select(t => new TaskDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Status = t.Status
                }).ToList()
            });

            return projectDtos;
        }

        public async Task<ProjectDto> GetProjectByIdAsync(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

            // Mapear para ProjectDto
            var projectDto = new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Tasks = project.Tasks.Select(t => new TaskDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Status = t.Status
                }).ToList()
            };

            return projectDto;
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
