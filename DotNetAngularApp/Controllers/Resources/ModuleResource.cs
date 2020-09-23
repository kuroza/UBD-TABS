using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text.Json.Serialization;

namespace DotNetAngularApp.Controllers.Resources
{
    public class ModuleResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        // [JsonIgnore]
        // public ICollection<BookingResource> Bookings { get; set; }

        // [JsonIgnore]
        public ICollection<LecturerResource> Lecturers { get; set; }
        
        public ModuleResource()
        {
            // Bookings = new Collection<BookingResource>();
            Lecturers = new Collection<LecturerResource>();
        }
    }
}