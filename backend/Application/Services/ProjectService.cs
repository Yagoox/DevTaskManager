using System.Collections.Generic;
using System.Linq; // Importante para usar o LINQ
using System.Threading.Tasks;
using DevTaskManager.Models;
using Microsoft.EntityFrameworkCore;
using DevTaskManager.Data;

namespace DevTaskManager.Services
{
    /**
     * Serviço responsável por gerenciar operações relacionadas a projetos.
     * Isso inclui criar, atualizar, excluir e recuperar projetos.
     */
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        /**
         * Construtor do ProjectService.
         * 
         * @param context O contexto do banco de dados utilizado para operações de persistência.
         */
        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        /**
         * Cria um novo projeto com o nome fornecido.
         * 
         * @param name O nome do novo projeto.
         * @return O projeto recém-criado.
         */
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

        /**
         * Recupera todos os projetos, incluindo suas respectivas tarefas.
         * 
         * @return Uma lista de objetos ProjectDto que contêm os projetos e suas tarefas.
         */
        public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
        {
            var projects = await _context.Projects
                .Include(p => p.Tasks)
                .ToListAsync();

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

        /**
         * Recupera um projeto específico pelo seu ID, incluindo suas tarefas.
         * 
         * @param id O ID do projeto.
         * @return Um objeto ProjectDto que representa o projeto e suas tarefas.
         * @throws KeyNotFoundException Se o projeto não for encontrado.
         */
        public async Task<ProjectDto> GetProjectByIdAsync(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                throw new KeyNotFoundException("Projeto não encontrado.");
            }

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

        /**
         * Atualiza o nome de um projeto existente.
         * 
         * @param id O ID do projeto a ser atualizado.
         * @param name O novo nome do projeto.
         * @throws KeyNotFoundException Se o projeto não for encontrado.
         */
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

        /**
         * Exclui um projeto existente.
         * 
         * @param id O ID do projeto a ser excluído.
         * @throws KeyNotFoundException Se o projeto não for encontrado.
         */
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
