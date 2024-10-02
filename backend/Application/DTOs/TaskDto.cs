// backend/Models/TaskDto.cs

namespace DevTaskManager.Models
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}