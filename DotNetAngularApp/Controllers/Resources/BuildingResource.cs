using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class BuildingResource : KeyValuePairResource
    {
        public string OtherName { get; set; }

        public ICollection<RoomResource> Rooms { get; set; }

        public BuildingResource()
        {
            Rooms = new Collection<RoomResource>();
        }
    }
}