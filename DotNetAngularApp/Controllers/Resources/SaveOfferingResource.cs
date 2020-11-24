using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveOfferingResource
    {
        public int SemesterId { get; set; }
        public int ModuleId { get; set; }
        public ICollection<int> Lecturers { get; set; }

        public SaveOfferingResource()
        {
            Lecturers = new Collection<int>();
        }
    }
}