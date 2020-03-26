using DotNetAngularApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class TabsDbContext : DbContext
    {
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Room> Rooms { get; set; }

        public TabsDbContext(DbContextOptions<TabsDbContext> options) : base(options)
        {
            
        }
    }
}