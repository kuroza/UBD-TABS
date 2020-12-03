using System;

namespace DotNetAngularApp.Controllers.Resources
{
    public class TimeSlotResource
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string StartAndEndTime => StartTime.ToString("hh:mm tt") + " - " + EndTime.ToString("hh:mm tt");
    }
}