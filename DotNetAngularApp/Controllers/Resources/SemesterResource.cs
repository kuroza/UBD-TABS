using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SemesterResource
    {
        public int Id { get; set; }

        public string Session { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public ICollection<BookingResource> Bookings { get; set; }

        public SemesterResource()
        {
            Bookings = new Collection<BookingResource>();
        }
    }
}