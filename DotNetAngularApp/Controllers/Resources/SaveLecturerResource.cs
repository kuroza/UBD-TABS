using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveLecturerResource
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Title { get; set; }
    }
}