using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Offerings")]
    public class Offering
    {
        public int Id { get; set; }

        [Required]
        public int SemesterId { get; set; }
        public Semester Semester { get; set; }

        [Required]
        public int ModuleId { get; set; }
        public Module Module { get; set; }

        [Required]
        public ICollection<LecturerOffering> Lecturers { get; set; }

        public Offering()
        {
            Lecturers = new Collection<LecturerOffering>();
        }
    }
}