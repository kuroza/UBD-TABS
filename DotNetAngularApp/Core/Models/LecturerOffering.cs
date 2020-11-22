using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("LecturerOfferings")]
    public class LecturerOffering
    {
        public int OfferingId { get; set; }
        public Offering Offering { get; set; }
        public int LecturerId { get; set; }
        public Lecturer Lecturer { get; set; }
    }
}