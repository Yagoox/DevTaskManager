// backend/Models/ProjectCreateDto.cs

using System.ComponentModel.DataAnnotations;

namespace DevTaskManager.Models
{
    public class ProjectCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
    }
}
