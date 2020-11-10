using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Faculties")]
    public class Faculty
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        
        public string ShortName { get; set; }

        public ICollection<Programme> Programmes { get; set; }

        public Faculty()
        {
            Programmes = new Collection<Programme>(); // to only create a new Course object once here than other places
        }
    }
}