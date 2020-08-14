using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class FacultyResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CourseResource> Courses { get; set; }

        public FacultyResource()
        {
            Courses = new Collection<CourseResource>();
        }
    }
}