// backend/Models/TaskCreateDto.cs

using System.ComponentModel.DataAnnotations;

namespace DevTaskManager.Models
{
    public class TaskCreateDto
    {
        [Required]
        [MaxLength(200)]
        public required string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "A Fazer";
    }
}
