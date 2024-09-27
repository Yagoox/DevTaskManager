// backend/Controllers/ProjectsController.cs

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

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProjectById(int id)
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

        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody] ProjectCreateDto dto)
        {
            var project = await _projectService.CreateProjectAsync(dto.Name);
            return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
        }

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
