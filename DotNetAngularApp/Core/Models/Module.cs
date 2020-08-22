using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [Required]
        public ICollection<ModuleLecturer> Lecturers { get; set; }

        public Module()
        {
            Lecturers = new Collection<ModuleLecturer>();
        }
    }
}