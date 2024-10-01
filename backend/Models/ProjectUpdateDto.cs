// backend/Models/ProjectUpdateDto.cs

using System.ComponentModel.DataAnnotations;

namespace DevTaskManager.Models
{
    public class ProjectUpdateDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
    }
}
