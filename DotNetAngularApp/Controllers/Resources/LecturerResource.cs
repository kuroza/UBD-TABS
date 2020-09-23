using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text.Json.Serialization;

namespace DotNetAngularApp.Controllers.Resources
{
    public class LecturerResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }
        // [JsonIgnore]
        public ICollection<ModuleResource> Modules { get; set; }

        public LecturerResource()
        {
            Modules = new Collection<ModuleResource>();
        }
    }
}