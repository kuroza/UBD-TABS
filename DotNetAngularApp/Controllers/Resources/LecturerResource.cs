using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class LecturerResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        // public ICollection<ModuleResource> Modules { get; set; }
        // public LecturerResource()
        // {
        //     Modules = new Collection<ModuleResource>();
        // }
    }
} 