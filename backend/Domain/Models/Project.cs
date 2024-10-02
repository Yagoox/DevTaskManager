using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevTaskManager.Models
{
    /**
     * Representa um projeto no sistema.
     * Um projeto pode ter várias tarefas associadas a ele.
     */
    public class Project
    {
        /**
         * O ID do projeto.
         * É a chave primária da tabela e gerada automaticamente pelo banco de dados.
         */
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        /**
         * O nome do projeto.
         * É obrigatório e tem um comprimento máximo de 100 caracteres.
         */
        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }

        /**
         * Coleção de tarefas associadas ao projeto.
         * Representa a relação um-para-muitos entre Project e TaskItem.
         */
        public virtual ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
