using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Majors")]
    public class Major
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string ShortName { get; set; }

        public Faculty Faculty { get; set; }
        
        // [Required]
        public int FacultyId { get; set; } // foreign key property, simplify for creating/updating objects

        public ICollection<Module> Modules { get; set; }

        public Major()
        {
            Modules = new Collection<Module>();
        }
    }
}