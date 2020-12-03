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
        
        public string ModuleCodeAndName => $"{Code}: {Name}";

        public MajorResource Major { get; set; }
    }
} 