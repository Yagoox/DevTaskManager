// backend/Models/TaskItem.cs
namespace DevTaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // Inicializa com string vazia
        public string Status { get; set; } = "A Fazer"; // Inicializa com valor padrão
    }
}
