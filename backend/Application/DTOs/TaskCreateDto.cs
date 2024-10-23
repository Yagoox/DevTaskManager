// backend/Models/TaskCreateDto.cs

using System.ComponentModel.DataAnnotations;

namespace DevTaskManager.Models
{
    public class TaskCreateDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty; // Inicializar com string vazia

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "A Fazer"; // Inicializar com valor padrão

        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;
        // Se necessário, inclua o ProjectId aqui, ou remova se não for usado
    }
}
