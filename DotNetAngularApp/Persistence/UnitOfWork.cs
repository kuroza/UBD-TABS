using System.Threading.Tasks;

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
            await context.SaveChangesAsync(); //delegate to this context
        }
    }
}