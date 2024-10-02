using DevTaskManager.Models;
using DevTaskManager.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DevTaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        /**
         * Construtor da classe ProjectsController.
         * 
         * @param projectService O serviço responsável pelas operações relacionadas a projetos.
         */
        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        /**
         * Obtém a lista de todos os projetos.
         * 
         * @return Uma lista de projetos no formato DTO.
         */
        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        /**
         * Obtém um projeto específico pelo ID.
         * 
         * @param id O ID do projeto a ser obtido.
         * @return O projeto correspondente ao ID fornecido, ou NotFound se o projeto não for encontrado.
         */
        // GET: api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProjectById(int id)
        {
            try
            {
                var project = await _projectService.GetProjectByIdAsync(id);
                return Ok(project);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }

        /**
         * Cria um novo projeto.
         * 
         * @param dto O DTO contendo os dados do novo projeto.
         * @return O projeto recém-criado com seu ID, ou BadRequest se ocorrer algum erro.
         */
        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody] ProjectCreateDto dto)
        {
            var project = await _projectService.CreateProjectAsync(dto.Name);
            return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
        }

        /**
         * Atualiza um projeto existente pelo ID.
         * 
         * @param id O ID do projeto a ser atualizado.
         * @param dto O DTO contendo os dados atualizados do projeto.
         * @return NoContent se a atualização for bem-sucedida, ou NotFound se o projeto não for encontrado.
         */
        // PUT: api/projects/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectUpdateDto dto)
        {
            try
            {
                await _projectService.UpdateProjectAsync(id, dto.Name);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }

        /**
         * Exclui um projeto existente pelo ID.
         * 
         * @param id O ID do projeto a ser excluído.
         * @return NoContent se a exclusão for bem-sucedida, ou NotFound se o projeto não for encontrado.
         */
        // DELETE: api/projects/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                await _projectService.DeleteProjectAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }
    }
}
