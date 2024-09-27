// backend/Controllers/TasksController.cs

using DevTaskManager.Models;
using DevTaskManager.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DevTaskManager.Controllers
{
    [ApiController]
    [Route("api/projects/{projectId}/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // POST: api/projects/{projectId}/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(int projectId, [FromBody] TaskCreateDto dto)
        {
            try
            {
                var task = await _taskService.CreateTaskAsync(projectId, dto.Name, dto.Status);
                return CreatedAtAction(nameof(GetTasks), new { projectId = projectId, taskId = task.Id }, task);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }

        // PUT: api/projects/{projectId}/tasks/{taskId}
        [HttpPut("{taskId}")]
        public async Task<IActionResult> UpdateTask(int projectId, int taskId, [FromBody] TaskCreateDto dto)
        {
            try
            {
                await _taskService.UpdateTaskAsync(projectId, taskId, dto.Name, dto.Status);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Tarefa ou Projeto não encontrado." });
            }
        }

        // DELETE: api/projects/{projectId}/tasks/{taskId}
        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTask(int projectId, int taskId)
        {
            try
            {
                await _taskService.DeleteTaskAsync(projectId, taskId);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Tarefa ou Projeto não encontrado." });
            }
        }

        // GET: api/projects/{projectId}/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(int projectId)
        {
            try
            {
                var tasks = await _taskService.GetTasksAsync(projectId);
                return Ok(tasks);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }

        // GET: api/projects/{projectId}/tasks/{taskId}
        [HttpGet("{taskId}")]
        public async Task<ActionResult<TaskItem>> GetTaskById(int projectId, int taskId)
        {
            try
            {
                var task = await _taskService.GetTaskByIdAsync(projectId, taskId);
                return Ok(task);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Tarefa ou Projeto não encontrado." });
            }
        }
    }
}
