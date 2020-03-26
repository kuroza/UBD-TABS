using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Models
{
    [Table("Buildings")]
    public class Building
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        // [Display(Name = "Building Name")]
        public string Name { get; set; }
    }
}