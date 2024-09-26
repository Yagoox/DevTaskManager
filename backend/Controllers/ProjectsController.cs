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
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody] Project project)
        {
            var createdProject = await _projectService.CreateProjectAsync(project.Name);
            return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject);
        }

        // PUT: api/projects/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] Project updatedProject)
        {
            if (id != updatedProject.Id)
            {
                return BadRequest();
            }

            var result = await _projectService.UpdateProjectAsync(id, updatedProject.Name);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/projects/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var result = await _projectService.DeleteProjectAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/projects/{projectId}/tasks
        [HttpPost("{projectId}/tasks")]
        public async Task<ActionResult<TaskItem>> CreateTask(int projectId, [FromBody] TaskItem task)
        {
            var createdTask = await _projectService.CreateTaskAsync(projectId, task.Name, task.Status);
            if (createdTask == null)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
            return CreatedAtAction(nameof(GetProject), new { id = projectId }, createdTask);
        }

        // PUT: api/projects/{projectId}/tasks/{taskId}
        [HttpPut("{projectId}/tasks/{taskId}")]
        public async Task<IActionResult> UpdateTask(int projectId, int taskId, [FromBody] TaskItem updatedTask)
        {
            var result = await _projectService.UpdateTaskAsync(projectId, taskId, updatedTask.Name, updatedTask.Status);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/projects/{projectId}/tasks/{taskId}
        [HttpDelete("{projectId}/tasks/{taskId}")]
        public async Task<IActionResult> DeleteTask(int projectId, int taskId)
        {
            var result = await _projectService.DeleteTaskAsync(projectId, taskId);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
