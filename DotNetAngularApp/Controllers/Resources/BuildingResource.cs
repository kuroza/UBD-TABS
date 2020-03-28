using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class BuildingResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<RoomResource> Rooms { get; set; }

        public BuildingResource()
        {
            Rooms = new Collection<RoomResource>();
        }
    }
}