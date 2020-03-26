using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Models
{
    [Table("Rooms")]
    public class Room
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        // [Display(Name = "Room Name")]
        public string Name { get; set; }

        [Required]
        public int BuildingId { get; set; }

        public int Capacity { get; set; }

        // public bool IsAvailable { get; set; }
    }
}