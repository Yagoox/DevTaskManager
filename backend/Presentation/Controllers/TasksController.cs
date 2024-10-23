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

        /**
         * Construtor da classe TasksController.
         * 
         * @param taskService O serviço responsável pelas operações relacionadas a tarefas.
         */
        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        /**
         * Cria uma nova tarefa associada a um projeto.
         * 
         * @param projectId O ID do projeto ao qual a tarefa será associada.
         * @param dto O DTO contendo os dados da tarefa a ser criada.
         * @return A tarefa recém-criada com seu ID, ou BadRequest se ocorrer algum erro de validação.
         */
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
                var task = await _taskService.CreateTaskAsync(projectId, dto.Name, dto.Status, dto.Description);

                var taskDto = new TaskDto
                {
                    Id = task.Id,
                    Name = task.Name,
                    Description = task.Description,
                    Status = task.Status
                };

                return CreatedAtAction("GetTaskById", new { projectId = projectId, taskId = task.Id }, taskDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }

        /**
         * Atualiza uma tarefa existente em um projeto.
         * 
         * @param projectId O ID do projeto ao qual a tarefa está associada.
         * @param taskId O ID da tarefa a ser atualizada.
         * @param dto O DTO contendo os dados atualizados da tarefa.
         * @return NoContent se a atualização for bem-sucedida, ou NotFound se o projeto ou tarefa não forem encontrados.
         */
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
                await _taskService.UpdateTaskAsync(projectId, taskId, dto.Name, dto.Status, dto.Description);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Tarefa ou Projeto não encontrado." });
            }
        }

        /**
         * Exclui uma tarefa existente em um projeto.
         * 
         * @param projectId O ID do projeto ao qual a tarefa está associada.
         * @param taskId O ID da tarefa a ser excluída.
         * @return NoContent se a exclusão for bem-sucedida, ou NotFound se o projeto ou tarefa não forem encontrados.
         */
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

        /**
         * Obtém todas as tarefas associadas a um projeto.
         * 
         * @param projectId O ID do projeto ao qual as tarefas estão associadas.
         * @return Uma lista de tarefas no formato DTO, ou NotFound se o projeto não for encontrado.
         */
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
                    Status = task.Status,
                    Description = task.Description
                });
                return Ok(taskDtos);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Projeto não encontrado." });
            }
        }

        /**
         * Obtém uma tarefa específica associada a um projeto.
         * 
         * @param projectId O ID do projeto ao qual a tarefa está associada.
         * @param taskId O ID da tarefa a ser obtida.
         * @return A tarefa correspondente ao ID fornecido, ou NotFound se o projeto ou tarefa não forem encontrados.
         */
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
                    Status = task.Status,
                    Description = task.Description
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
