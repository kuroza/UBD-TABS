using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("ModuleLecturers")]
    public class ModuleLecturer
    {
        public int ModuleId { get; set; }
        public int LecturerId { get; set; }
        public Module Module { get; set; }
        public Lecturer Lecturer { get; set; }
    }
}