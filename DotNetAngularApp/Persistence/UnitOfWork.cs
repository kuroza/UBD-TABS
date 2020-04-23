using System.Threading.Tasks;
using DotNetAngularApp.Core;

namespace DotNetAngularApp.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TabsDbContext context;
        public UnitOfWork(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}