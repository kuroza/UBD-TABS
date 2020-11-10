using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class ModuleResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public ICollection<LecturerResource> Lecturers { get; set; }

        public ProgrammeResource Programme { get; set; }

        public ModuleResource()
        {
            Lecturers = new Collection<LecturerResource>();
        }
    }
} 