using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class ProgrammeResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public int FacultyId { get; set; }
        // public FacultyResource Faculty { get; set; }
        public ICollection<ModuleResource> Modules { get; set; }

        public ProgrammeResource()
        {
            Modules = new Collection<ModuleResource>();
        }
    }
}