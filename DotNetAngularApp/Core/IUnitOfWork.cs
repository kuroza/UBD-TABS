using System.Threading.Tasks;

namespace DotNetAngularApp.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}