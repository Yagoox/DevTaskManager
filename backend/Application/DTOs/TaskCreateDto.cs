using System.ComponentModel.DataAnnotations;

namespace DevTaskManager.Models
{
    public class TaskCreateDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty; 

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "A Fazer"; 

        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;
    }
}
