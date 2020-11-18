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
        
        [StringLength(255)]
        public string ShortName { get; set; }

        public ICollection<Major> Majors { get; set; }

        public Faculty()
        {
            Majors = new Collection<Major>(); // to only create a new Course object once here than other places
        }
    }
}