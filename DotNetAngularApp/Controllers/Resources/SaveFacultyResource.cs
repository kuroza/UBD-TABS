using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveFacultyResource
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        public string ShortName { get; set; }
    }
}