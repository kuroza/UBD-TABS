using System;

namespace DotNetAngularApp.Controllers.Resources
{
    public class TimeSlotResource
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}