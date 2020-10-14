using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveModuleResource
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public ICollection<int> Lecturers { get; set; }

        public SaveModuleResource()
        {
            Lecturers = new Collection<int>();
        }
    }
}