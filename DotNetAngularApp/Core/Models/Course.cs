using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Courses")]
    public class Course
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public Faculty Faculty { get; set; } // navigation property, association

        // this will not create an extra column
        public int FacultyId { get; set; } // foreign key property, simplify for creating/updating objects

        // public ICollection<Module> Modules { get; set; }

        // public Course()
        // {
        //     Modules = new Collection<Module>();
        // }
    }
}