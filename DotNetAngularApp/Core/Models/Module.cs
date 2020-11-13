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
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Code { get; set; }

        public ICollection<ModuleLecturer> Lecturers { get; set; }

        public Major Major { get; set; }

        public int MajorId { get; set; }
        
        public Module()
        {
            Lecturers = new Collection<ModuleLecturer>();
        }
    }
}