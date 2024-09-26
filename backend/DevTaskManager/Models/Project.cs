// backend/Models/Project.cs
using System.Collections.Generic;

namespace DevTaskManager.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // Inicializa com string vazia
        public List<TaskItem> Tasks { get; set; } = new List<TaskItem>(); // Inicializa com nova lista
    }
}
