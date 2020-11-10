using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Programmes")]
    public class Programme
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string ShortName { get; set; }

        public Faculty Faculty { get; set; }
        
        public int FacultyId { get; set; } // foreign key property, simplify for creating/updating objects

        public ICollection<Module> Modules { get; set; }

        public Programme()
        {
            Modules = new Collection<Module>();
        }
    }
}