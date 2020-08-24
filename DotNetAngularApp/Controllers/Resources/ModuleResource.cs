using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class ModuleResource : KeyValuePairResource
    {
        // public int Id { get; set; }
        // public string Name { get; set; }
        public string Code { get; set; }
        public ICollection<LecturerResource> Lecturers { get; set; }

        public ModuleResource()
        {
            Lecturers = new Collection<LecturerResource>();
        }
    }
}