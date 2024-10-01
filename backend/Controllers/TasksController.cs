// backend/Controllers/TasksController.cs

using DevTaskManager.Models;
using DevTaskManager.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq; // Adicionado para uso de LINQ

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
        public async Task<ActionResult<TaskDto>> CreateTask(int projectId, [FromBody] TaskCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var task = await _taskService.CreateTaskAsync(projectId, dto.Name, dto.Status);

                var taskDto = new TaskDto
                {
                    Id = task.Id,
                    Name = task.Name,
                    Status = task.Status
                };

                return CreatedAtAction("GetTaskById", new { projectId = projectId, taskId = task.Id }, taskDto);
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks(int projectId)
        {
            try
            {
                var tasks = await _taskService.GetTasksAsync(projectId);
                var taskDtos = tasks.Select(task => new TaskDto
                {
                    Id = task.Id,
                    Name = task.Name,
                    Status = task.Status
                });
                return Ok(taskDtos);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }

        // GET: api/projects/{projectId}/tasks/{taskId}
        [HttpGet("{taskId}", Name = "GetTaskById")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int projectId, int taskId)
        {
            try
            {
                var task = await _taskService.GetTaskByIdAsync(projectId, taskId);
                var taskDto = new TaskDto
                {
                    Id = task.Id,
                    Name = task.Name,
                    Status = task.Status
                };
                return Ok(taskDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Tarefa ou Projeto não encontrado." });
            }
        }
    } // Fecha a classe TasksController
} // Fecha o namespace DevTaskManager.Controllers
