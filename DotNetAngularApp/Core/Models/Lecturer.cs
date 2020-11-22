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

        // public ICollection<ModuleLecturer> Modules { get; set; }

        // public Lecturer()
        // {
        //     Modules = new Collection<ModuleLecturer>();
        // }
    }
}