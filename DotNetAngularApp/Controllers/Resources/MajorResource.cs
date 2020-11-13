using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class MajorResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public int FacultyId { get; set; }
        // public FacultyResource Faculty { get; set; }
        public ICollection<ModuleResource> Modules { get; set; }

        public MajorResource()
        {
            Modules = new Collection<ModuleResource>();
        }
    }
}