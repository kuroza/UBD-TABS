using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class OfferingResource
    {
        public int Id { get; set; }
        public int SemesterId { get; set; }
        public ICollection<ModuleResource> Modules { get; set; }
        public ICollection<LecturerResource> Lecturers { get; set; }

        public OfferingResource()
        {
            Modules = new Collection<ModuleResource>();
            Lecturers = new Collection<LecturerResource>();
        }
    }
}