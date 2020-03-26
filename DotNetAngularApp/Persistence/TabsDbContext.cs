using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class TabsDbContext : DbContext
    {
        
        public TabsDbContext(DbContextOptions<TabsDbContext> options) : base(options)
        {
            
        }
    }
}