using System.Threading.Tasks;

namespace DotNetAngularApp.Persistence
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}