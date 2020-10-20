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

        // public string ShortName { get; set; }

        public Faculty Faculty { get; set; }
        
        public int FacultyId { get; set; } // foreign key property, simplify for creating/updating objects

    }
}