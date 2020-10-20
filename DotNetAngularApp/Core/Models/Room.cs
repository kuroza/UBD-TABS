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
        
        [StringLength(255)]
        public string Code { get; set; }

        public int Capacity { get; set; }
        
        [Required]
        public int BuildingId { get; set; }

        public Building Building { get; set; }
    }
}