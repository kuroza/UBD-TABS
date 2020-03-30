using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Rooms")]
    public class Room
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public int Capacity { get; set; }

        public Building Building { get; set; } //navigation property
        
        public int BuildingId { get; set; } //foreign key property.. just call 'room.Building = 1'
    }
}