// backend/Models/DevTaskManagerContext.cs

using Microsoft.EntityFrameworkCore;

namespace DevTaskManager.Models
{
    public class DevTaskManagerContext : DbContext
    {
        public DevTaskManagerContext(DbContextOptions<DevTaskManagerContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
    }
}
