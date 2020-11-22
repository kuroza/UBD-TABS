using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveOfferingResource
    {
        public int SemesterId { get; set; }
        public ICollection<int> Modules { get; set; }
        public ICollection<int> Lecturers { get; set; }

        public SaveOfferingResource()
        {
            Modules = new Collection<int>();
            Lecturers = new Collection<int>();
        }
    }
}