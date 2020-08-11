using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Faculties")]
    public class Faculty
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public ICollection<Course> Courses { get; set; }

        public Faculty()
        {
            Courses = new Collection<Course>(); // to only create a new Course object once here than other places
        }
    }
}