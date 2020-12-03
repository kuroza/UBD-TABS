using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class OfferingResource
    {
        public int Id { get; set; }
        public int SemesterId { get; set; }
        public string ModuleCodeAndName => $"{Module.Code}: {Module.Name}";
        public ModuleResource Module { get; set; }
        public ICollection<LecturerResource> Lecturers { get; set; }

        public OfferingResource()
        {
            Lecturers = new Collection<LecturerResource>();
        }
    }
}