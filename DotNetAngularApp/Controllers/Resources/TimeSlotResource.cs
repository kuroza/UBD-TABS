using System;

namespace DotNetAngularApp.Controllers.Resources
{
    public class TimeSlotResource
    {
        public byte Id { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}