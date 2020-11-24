using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class OfferingResource
    {
        public int Id { get; set; }
        public int SemesterId { get; set; } // ! change to session
        public ModuleResource Module { get; set; }
        public ICollection<LecturerResource> Lecturers { get; set; }

        public OfferingResource()
        {
            Lecturers = new Collection<LecturerResource>();
        }
    }
}