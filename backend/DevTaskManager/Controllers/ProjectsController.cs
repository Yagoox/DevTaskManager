using Microsoft.AspNetCore.Mvc;
using DevTaskManager.Models;
using System.Collections.Generic;
using System.Linq;

namespace DevTaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private static List<Project> projects = new List<Project>();

        // GET: api/projects
        [HttpGet]
        public ActionResult<IEnumerable<Project>> GetProjects()
        {
            return Ok(projects);
        }

        // POST: api/projects
        [HttpPost]
        public ActionResult<Project> CreateProject(Project project)
        {
            project.Id = projects.Count > 0 ? projects.Max(p => p.Id) + 1 : 1;
            project.Tasks = new List<TaskItem>();
            projects.Add(project);
            return CreatedAtAction(nameof(GetProjects), new { id = project.Id }, project);
        }

        // PUT: api/projects/{id}
        [HttpPut("{id}")]
        public ActionResult<Project> UpdateProject(int id, Project updatedProject)
        {
            var project = projects.FirstOrDefault(p => p.Id == id);
            if (project == null)
                return NotFound();

            project.Name = updatedProject.Name;
            return Ok(project);
        }

        // DELETE: api/projects/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id)
        {
            var project = projects.FirstOrDefault(p => p.Id == id);
            if (project == null)
                return NotFound();

            projects.Remove(project);
            return NoContent();
        }

        // POST: api/projects/{projectId}/tasks
        [HttpPost("{projectId}/tasks")]
        public ActionResult<TaskItem> CreateTask(int projectId, TaskItem task)
        {
            var project = projects.FirstOrDefault(p => p.Id == projectId);
            if (project == null)
                return NotFound();

            task.Id = project.Tasks.Count > 0 ? project.Tasks.Max(t => t.Id) + 1 : 1;
            project.Tasks.Add(task);
            return CreatedAtAction(nameof(GetProjects), new { id = projectId }, task);
        }

        // PUT: api/projects/{projectId}/tasks/{taskId}
        [HttpPut("{projectId}/tasks/{taskId}")]
        public ActionResult<TaskItem> UpdateTask(int projectId, int taskId, TaskItem updatedTask)
        {
            var project = projects.FirstOrDefault(p => p.Id == projectId);
            if (project == null)
                return NotFound();

            var task = project.Tasks.FirstOrDefault(t => t.Id == taskId);
            if (task == null)
                return NotFound();

            task.Name = updatedTask.Name;
            task.Status = updatedTask.Status;
            return Ok(task);
        }

        // DELETE: api/projects/{projectId}/tasks/{taskId}
        [HttpDelete("{projectId}/tasks/{taskId}")]
        public IActionResult DeleteTask(int projectId, int taskId)
        {
            var project = projects.FirstOrDefault(p => p.Id == projectId);
            if (project == null)
                return NotFound();

            var task = project.Tasks.FirstOrDefault(t => t.Id == taskId);
            if (task == null)
                return NotFound();

            project.Tasks.Remove(task);
            return NoContent();
        }
    }
}
