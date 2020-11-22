using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("SemesterModules")]
    public class SemesterModule
    {
        public int SemesterId { get; set; }
        public Semester Semester { get; set; }
        public int ModuleId { get; set; }
        public Module Module { get; set; }
    }
}