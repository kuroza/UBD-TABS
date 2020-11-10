using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveProgrammeResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ShortName { get; set; }
        
        public int FacultyId { get; set; }
    }
}