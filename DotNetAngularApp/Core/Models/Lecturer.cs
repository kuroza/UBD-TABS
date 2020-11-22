using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Lecturers")]
    public class Lecturer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Title { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public string Email { get; set; }

        // public Faculty FacultyId { get; set; }

        // public ICollection<LecturerOffering> Offerings { get; set; }

        public Lecturer()
        {
            // Offerings = new Collection<LecturerOffering>();
        }
    }
}