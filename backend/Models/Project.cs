// backend/Models/Project.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevTaskManager.Models
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        // Relação um-para-muitos com TaskItem
        public virtual ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
