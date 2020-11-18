using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveRoomResource
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int Capacity { get; set; }

        public string Code { get; set; }

        [Required]
        public int BuildingId { get; set; }
    }
}