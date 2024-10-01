// backend/Data/AppDbContext.cs

using DevTaskManager.Models;
using Microsoft.EntityFrameworkCore;

namespace DevTaskManager.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurações adicionais do modelo, se necessário
            base.OnModelCreating(modelBuilder);
        }
    }
}
