using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Buildings")]
    public class Building
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        
        [StringLength(255)]
        public string OtherName { get; set; }

        public ICollection<Room> Rooms { get; set; }

        public Building()
        {
            Rooms = new Collection<Room>();
        }
    }
}