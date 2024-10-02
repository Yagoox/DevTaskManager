using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevTaskManager.Models
{
    /**
     * Representa uma tarefa no sistema.
     * Cada TaskItem está associado a um projeto e contém um nome, status e ID.
     */
    public class TaskItem
    {
        /**
         * O ID da tarefa.
         * É a chave primária da tabela e gerada automaticamente pelo banco de dados.
         */
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        /**
         * O nome da tarefa.
         * É obrigatório e tem um comprimento máximo de 200 caracteres.
         */
        [Required]
        [MaxLength(200)]
        public required string Name { get; set; }

        /**
         * O status da tarefa.
         * É obrigatório e tem um valor padrão de "A Fazer", com comprimento máximo de 50 caracteres.
         */
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "A Fazer";

        /**
         * O ID do projeto ao qual a tarefa está associada.
         * É uma chave estrangeira que referencia o projeto.
         */
        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        
        /**
         * O projeto associado à tarefa.
         * Representa a relação muitos-para-um entre TaskItem e Project.
         */
        public virtual Project Project { get; set; } = null!;
    }
}
