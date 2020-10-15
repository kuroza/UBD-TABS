using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveBuildingResource
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        // public ICollection<int> Rooms { get; set; }

        // public SaveBuildingResource()
        // {
        //     Rooms = new Collection<int>();
        // }
    }
}