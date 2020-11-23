using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Core.Models
{
    [Table("Modules")]
    public class Module
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; } // Title

        [Required]
        [StringLength(255)]
        public string Code { get; set; }

        [Required]
        public int MajorId { get; set; }
        public Major Major { get; set; }

        // public ICollection<ModuleOffering> Offerings { get; set; } // !

        // public int Level { get; set; }

        // public string Type { get; set; } // Major Core, Breadth
        
        public Module()
        {
            // Offerings = new Collection<ModuleOffering>();
        }
    }
}